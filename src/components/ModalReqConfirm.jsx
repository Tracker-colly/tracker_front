import { Children, useEffect, useState } from "react"
import images from "../libs/images"
import Button from "./Button"
import WriterCard from "./WriterCard"
import { hpHypen } from "../utils/utils"

const helperStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: 13,
    color: "#6E7375",
    lineHeight: 1.5,
    gap: 8
}
const dotSVG = <svg xmlns="http://www.w3.org/2000/svg" width="8" height="22" viewBox="0 0 8 22" fill="none">
    <circle cx="3.5" cy="11" r="1.5" fill="#6E7375" />
</svg>

export default function ModalReqConfirm(props) {
    const {
        type = "success",
        children,
        title = "",
        message = "",
        userData = {
            name: "",
            hp: "",
            email: "",
            company: ""
        },
        open = false,
        setOpen,
        confirm = "확인",
        onConfirm,
        cancel = "닫기",
        onCancel,
        isBackClose = false
    } = props

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(open)

        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

    }, [open])

    return <div className={`modal-area ${visible ? "" : "hide"}`}>

        <div className="modal-bg" onClick={() => {
            if (isBackClose) {
                if (setOpen) setOpen(false);
            }
        }} />

        <div className={`modal-contents`} style={{ alignItems: "start" }}>
            <p className="title-18 bold-700">요청 정보 확인</p>
            <p className="info3 info mt-8">입력하신 정보가 맞는지 다시 한번 확인해 주세요.</p>

            <WriterCard
                className={"mt-10"}
                type="red"
                title="작성자 정보"
                infoList={userData?.email ? [
                    {
                        title: <span style={{ fontSize: 14, color: "#4F4C52" }}>이름</span>,
                        value: <span style={{ fontSize: 14, fontWeight: 500 }}>{userData?.name}</span>
                    },
                    {
                        title: <span style={{ fontSize: 14, color: "#4F4C52" }}>{"이메일"}</span>,
                        value: <span style={{ fontSize: 14, fontWeight: 500 }}>{userData?.email}</span>
                    },
                    {
                        title: <span style={{ fontSize: 14, color: "#4F4C52" }}>근무정보</span>,
                        value: <span style={{ fontSize: 14, fontWeight: 500 }}>{userData?.company}</span>
                    }
                ] : [
                    {
                        title: <span style={{ fontSize: 14, color: "#4F4C52" }}>이름</span>,
                        value: <span style={{ fontSize: 14, fontWeight: 500 }}>{userData?.name}</span>
                    },
                    // {
                    //     title: <span style={{ fontSize: 14, color: "#4F4C52" }}>{userData?.hp ? "전화번호" : "이메일"}</span>,
                    //     value: <span style={{ fontSize: 14, fontWeight: 500 }}>{userData?.hp ? hpHypen(userData?.hp) : userData?.email}</span>
                    // },
                    {
                        title: <span style={{ fontSize: 14, color: "#4F4C52" }}>근무정보</span>,
                        value: <span style={{ fontSize: 14, fontWeight: 500 }}>{userData?.company}</span>
                    }
                ]}
                disabled
            />

            <div className="mt-10" style={helperStyle}>
                {dotSVG}
                작성 요청은 이메일을 통해 발송됩니다.
            </div>
            <div style={helperStyle}>
                {dotSVG}
                메일 발송 후 정보 변경 및 취소는 불가합니다.
            </div>
            {/* <div style={helperStyle}>
                {dotSVG}
                평판이 등록되면 카카오 알림이 발송됩니다.
            </div> */}

            <div className="mt-24" style={{ display: "flex", width: "100%", gap: 14 }}>
                <Button
                    title={cancel}
                    type="red-line"
                    onClick={() => {
                        if (setOpen) setOpen(false);
                        if (onCancel) onCancel();
                    }}
                />
                <Button title={confirm} type="red" onClick={() => {
                    if (onConfirm) onConfirm();
                }} />
            </div>
        </div>

    </div>
}