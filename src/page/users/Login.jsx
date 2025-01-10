import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import images from "../../libs/images"
import * as APIS from "../../utils/service"

import Layout from "../../layout/Layout";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Selector from "../../components/Selector";
import ServiceInfo from "../Guide/ServiceInfo";
import ModalRegiste from "../../components/ModalRegiste";
import { usePopup } from "../../zustand/store";
import InputPhone from "../../components/InputPhone";

export default function Login() {
    const navigate = useNavigate();
    const token = window.localStorage.getItem("token");
    const { setWelcomOpen } = usePopup();

    const [openCredit, setOpenCredit] = useState(false);
    const [account, setAccount] = useState("");
    const [errorAccount, setErrorAccount] = useState("");
    const [pass, setPass] = useState("");
    const [errorPass, setErrorPass] = useState("");

    const [isInfo, setisInfo] = useState(false);

    const loginClick = () => {
        // 
        setErrorAccount("")
        setErrorPass("")

        if (!account) {
            setErrorAccount("아이디를 입력하세요");
        }

        if (!pass) {
            setErrorPass("비밀번호를 입력하세요");
        }

        if (!pass || !account) {
            return;
        }

        APIS.postData("/v1/user/login", {
            email: account,
            pass: pass
        }).then((result) => {
            window.localStorage.setItem("token", result.data)
            // setisInfo(true); // 서비스 팝업 호출
            // setWelcomOpen(true);
            navigate("/home")
        }).catch(e => {
            toast.error(e.response.data)
        })
        return
    }

    const registeClick = () => {
        navigate("/registe");
    }

    const findPassClick = () => {
        navigate("/findpass");
    }

    useEffect(() => {
        setErrorAccount("")
    }, [account])

    useEffect(() => {
        setErrorPass("")
    }, [pass])

    useEffect(() => {
        console.log("login")
    }, [])

    return <Layout >
        {/* {isInfo && <ServiceInfo onConfirm={() => {
            navigate("/home")
        }} />} */}

        <div className="content" >
            <div className="logo-box mt-60">
                <img src={images.logo_icon} alt="" />
                <img src={images.logo_black} alt="" />
            </div>

            <p className="title1 mt-58">아이디</p>
            <Input className="mt-16"
                value={account}
                setValue={setAccount}
                error={errorAccount}
                placeHolder="이메일 주소 입력" />

            <p className="title1 mt-24">비밀번호</p>
            <Input className="mt-16"
                value={pass}
                inputType="password"
                setValue={setPass}
                error={errorPass}
                placeHolder="비밀번호 입력" />

            <div className="flex-between mt-18">
                <button className="color-sub-text" onClick={findPassClick}>비밀번호 찾기</button>
            </div>

            <Button className="mt-48" type="red" title="로그인" onClick={loginClick} />
            <Button
                className="mt-12"
                type=""
                style={{
                    color: "black",
                    background: "#F8F8F8",
                    border: "1px solid #D3D3D3"
                }}
                title="회원가입"
                onClick={registeClick}
            />
            <div
                style={{
                    color: "#505050"
                }}
                className="al-center mt-12">
                회원가입하고 나의 진짜 가치를 찾아가세요!
            </div>
        </div>

        <ModalRegiste onBtnClick />
    </Layout >
}