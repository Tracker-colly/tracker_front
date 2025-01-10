import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import images from "../../libs/images"
import * as APIS from "../../utils/service"

import Layout from "../../layout/Layout";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Selector from "../../components/Selector";
import { elapsedTime } from "../../utils/utils";
import CheckBoxIOS from "../../components/CheckBoxIOS";
import { useLoading, useUser } from "../../zustand/store";

export default function Setting() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userInfo } = useUser();
    const { setLoading } = useLoading();

    useEffect(() => {
        console.log("setting")
    }, [])

    const [hash, setHash] = useState("");

    const [push, setpush] = useState(true);
    const [link, setlink] = useState(true);

    const headerTitle = (curStep) => {
        if (hash == "#user") {
            return "계정관리"
        } else if (hash == "#setuser") {
            return "계정설정"
        } else {
            return "Setting"
        }
    }

    const menuClick = (index) => {
        if (index == 1) {
            //비번 변경
            navigate("/changePass");
        } else if (index == 2) {
            //계정 삭제
            navigate("/delAccount");
        } else if (index == 3) {
            //공지
            navigate("/notice");
        } else if (index == 4) {
            //faq
            navigate("/faq");
        } else if (index == 5) {
            //나의 문의
            navigate("/myQuestions");
        } else if (index == 6) {
            //개인정보 처리방침
            navigate("/term?idx=1");
        } else if (index == 7) {
            //서비스 이용 약관
            navigate("/term?idx=2");
        } else if (index == 99) {
            window.localStorage.setItem("token", "")
            navigate("/")
        }
    }

    //link , push
    const setRadioFunc = (type, value) => {
        if (type == "link") {
            setLoading(true)
            APIS.postData("/v1/setting/radio", {
                link: value
            }).then(() => {
                setLoading(false)
                setlink(value)
            }).catch(e => setLoading(false))
        } else if (type == "push") {
            setLoading(true)
            APIS.postData("/v1/setting/radio", {
                link: value
            }).then(() => {
                setLoading(false)
                setpush(value)
            }).catch(e => setLoading(false))
        }
    }

    useEffect(() => {
        setHash(location.hash)
    }, [location.hash])

    useEffect(() => {
        if (userInfo) {
            setpush(userInfo?.push)
            setlink(userInfo?.link)
        }
    }, [])


    return <Layout
        headerTitle={headerTitle(hash)}
        isHeader
        searchClick={!hash ? () => { } : undefined}
        bellClick={!hash ? () => { } : undefined}
        leftBtnClick={hash ? () => {
            navigate(-1)
        } : undefined}
        isNavi
        homeClick={() => { navigate("/home") }}
    >
        <div className="content">
            {!hash && <>
                <p className="title-20 mt-20">계정</p>
                <div className="mt-10" />
                <SetMenuItem title="계정관리" onClick={() => { window.location.href = "#user" }} />
                <hr />

                <p className="title-20 mt-30">알림</p>
                <div className="mt-20" />
                <SetMenuCheck style={{ height: 46 }} title="푸쉬" value={push} setValue={(v) => {
                    setRadioFunc("push", v)
                }} />
                <SetMenuCheck style={{ height: 46 }} title="링크" value={link} setValue={(v) => {
                    setRadioFunc("link", v)
                }} />
                <hr className="mt-10" />

                <p className="title-20 mt-30">서비스</p>
                <div className="mt-10" />
                <SetMenuItem title="공지사항" onClick={() => { menuClick(3) }} />
                <SetMenuItem title="FAQ" onClick={() => { menuClick(4) }} />
                <SetMenuItem title="나의 문의" onClick={() => { menuClick(5) }} />
                {/* <SetMenuItem title="개인정보 처리방침" onClick={() => { menuClick(6) }} />
                <SetMenuItem title="서비스 이용약관" onClick={() => { menuClick(7) }} /> */}
                <SetMenuItem title="로그아웃" type="red" onClick={() => { menuClick(99) }} />
            </>}
            {hash == "#user" && <>
                <SetMenuItem title="개인정보 처리방침" onClick={() => { menuClick(6) }} />
                <SetMenuItem title="서비스 이용약관" onClick={() => { menuClick(7) }} />
                <SetMenuItem title="계정설정" onClick={() => { window.location.href = "#setuser" }} />
            </>}

            {hash == "#setuser" && <>
                <SetMenuItem title="비밀번호 변경" onClick={() => { menuClick(1) }} />
                <SetMenuItem type="red" title="계정 삭제" onClick={() => { menuClick(2) }} />
            </>}
            <div className="mt-80"></div>
        </div>
    </Layout>
}

const SetMenuItem = (props) => {
    const {
        type = "",
        className,
        title = "",
        onClick = () => { }
    } = props;

    return <div
        className={className}
        style={{
            display: "flex",
            height: 64,
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
        }}
        onClick={onClick}
    >
        <p className={`font-16${type === "red" ? " color-error" : ""}`}>{title}</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L14.6854 12.7071C15.1049 12.3166 15.1049 11.6834 14.6854 11.2929L9 6" stroke="#131214" stroke-width="1.5" stroke-linecap="round" />
        </svg>
    </div>
}

const SetMenuCheck = (props) => {
    const {
        style = {},
        className,
        title = "",
        value = false,
        setValue = () => { }
    } = props;

    return <div
        className={className}
        style={{
            display: "flex",
            height: 64,
            alignItems: "center",
            justifyContent: "space-between",
            ...style
        }}
    >
        <p className="font-16">{title}</p>
        <CheckBoxIOS value={value} setValue={setValue} />
    </div>
}
