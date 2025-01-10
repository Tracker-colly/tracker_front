import { Children, useEffect, useState } from "react"
import images from "../libs/images"
import Button from "./Button"
import { usePopup } from "../zustand/store";

// 웰컴 모달
export default function ModalWelcom(props) {
    const {
        name = "",
        onConfirm = () => { },
        onCancle = () => { },
    } = props
    const { welcomOpen, setWelcomOpen } = usePopup();
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(welcomOpen)

        if (welcomOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

    }, [welcomOpen])

    return <div className={`modal-area ${visible ? "" : "hide"}`}>

        <div className="modal-bg" onClick={() => {
            // setWelcomOpen(false);
        }} />

        <div className={`modal-contents info`}>
            <div style={{
                display: "flex",
                width: 64,
                height: 64,
                alignItems: "center",
                justifyContent: "center",
                background: "#F4F4F4",
                borderRadius: 100,
            }}>
                <img style={{
                    width: 32,
                    height: 32,
                }} src={images.welcome_hand} alt="" />
            </div>

            <p className="font-20 bold mt-16">환영합니다, {name}님!</p>
            <p className="font-15 color-sub-text mt-8">트래커콜리 서비스 소개를 살펴볼까요?</p>
            <div className="mt-24" style={{ display: "flex", width: "100%", gap: 14 }}>
                <Button title="나중에 하기" type="gray" onClick={() => {
                    setWelcomOpen(false);
                    onCancle();
                }} />
                <Button title="보기" type="red" onClick={() => {
                    setWelcomOpen(false);
                    onConfirm();
                }} />
            </div>
        </div>

    </div >
}