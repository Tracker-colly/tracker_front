import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

import Layout from "../../layout/Layout";
import Profile from "../../components/Profile";
import images from "../../libs/images"
import Button from "../../components/Button";
import { useLoading, usePopup, useUser } from "../../zustand/store";
import consts from "../../libs/consts"
import * as APIS from "../../utils/service"
import { hpHypen } from "../../utils/utils";
import ModalProfile from "../../components/ModalProfile";

// 내정보 페이지
export default function MyInfo() {
    const navigate = useNavigate();
    const { userInfo, loadUser } = useUser();
    const { profileOpen, setProfileOpen } = usePopup();
    const { setLoading } = useLoading();

    const [phOpen, setphOpen] = useState(false);
    const labelRef = useRef();

    const backBtnClick = () => {
        // navigate("/home");
        navigate(-1);
    }

    const copyTagClick = (data) => {
        // window.navigator.clipboard.writeText(data)
        let copyText = (data.replace("#", ""))
        window.navigator.clipboard.writeText(copyText);
        toast.success("클립보드에 저장됨")
    }

    const changePhoneClick = () => {
        navigate("/changePhone")
    }

    const changeAddressClick = () => {
        navigate("/changeAddress")
    }

    const editProfileFunc = (data) => {
        console.log(data);
        setLoading(true);
        APIS.postData("/v1/user/editProfile", {
            profile: data
        }).then((result) => {
            setLoading(false);
            loadUser();
        }).catch(e => {
            setLoading(false);
            loadUser();
            toast.error(e.response.data)
        })
    }

    useEffect(() => {
        console.log("myInfo Render")
    }, [])

    return <Layout
        isHeader
        headerTitle="내 정보"
        leftBtnClick={backBtnClick}
    >
        <ModalProfile
            open={phOpen}
            setOpen={(v) => {
                if (!v) {
                    setProfileOpen(false)
                }
                setphOpen(v)
            }}
            onConfirm={() => {
                labelRef.current?.click();
            }}
        />

        <div className="content">
            <div className="my-profile-box mt-35">
                <div style={{ position: "relative" }}>
                    <Profile
                        labelRef={labelRef}
                        value={consts.s3url + userInfo?.profile}
                        onChange={editProfileFunc}
                    />
                    <div style={{
                        position: "absolute",
                        top: 0,
                        width: "100%",
                        height: "100%",
                        cursor: "pointer"
                    }} onClick={() => { setphOpen(true) }}>
                    </div>
                    {/* {setProfileOpen && <div style={{
                        position: "absolute",
                        top: 0,
                        width: "100%",
                        height: "100%",
                        cursor: "pointer"
                    }} onClick={() => { setphOpen(true) }}>
                    </div>} */}
                </div>
                <div className="info">
                    <p className="title3 al-center">{userInfo?.name}</p>
                    {/* <p className="info3 al-center">(1989.05.27 / 여성)</p> */}
                    <p className="info3 al-center">({moment(userInfo?.birth).format("YYYY.MM.DD")} / {userInfo?.sex == 1 ? "남성" : "여성"})</p>
                </div>
            </div>

            <p className="title4 mt-48">Info</p>
            <div className="profile-info-box mt-16">
                <div className="info-item">
                    <div className="t-box">
                        <img src={images.mail} alt="" />
                        <p className="info4">{userInfo?.email}</p>
                    </div>
                </div>
                <hr />
                <div className="info-item">
                    <div className="t-box">
                        <img src={images.tag} alt="" />
                        <p className="info4">{userInfo?.serial}</p>
                    </div>
                    {/* <p className="under-line info3 hand" onClick={() => { copyTagClick("#123456789") }}>태그 복사</p> */}
                    <Button title="복사" type="smal gray" onClick={() => { copyTagClick(userInfo?.serial) }} />
                </div>
                <hr />
                <div className="info-item">
                    <div className="t-box">
                        <img src={images.phone} alt="" />
                        <p className="info4">{hpHypen(userInfo?.hp)}</p>
                    </div>
                    {/* <p className="under-line info3 hand" onClick={changePhoneClick}>변경</p> */}
                    <Button title="변경" type="smal green" onClick={changePhoneClick} />
                </div>
                <hr />
                <div className="info-item">
                    <div className="t-box" style={{
                        alignItems: "self-start",
                    }}>
                        <img src={images.marker_pin} alt="" />
                        <p className="info4">
                            {userInfo?.address1}<br />
                            {userInfo?.address2}
                        </p>
                    </div>
                    {/* <p className="under-line info3 hand" onClick={changeAddressClick}>수정</p> */}
                    <Button title="변경" type="smal green" onClick={changeAddressClick} />
                </div>

                {/* <hr /> */}
                {/* TODO: 유저정보에서 관리자 정보를 표기하는게 맞는가? 여러 회사의 관리자일수도 있나? */}
                {/* <div className="info-item">
                    <div className="t-box">
                        <img src={images.team} alt="" />
                        <p className="info4">{userInfo?.level}</p>
                    </div>
                </div> */}
            </div>
        </div>
    </Layout>
}