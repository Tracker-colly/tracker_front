import { Children, useEffect, useState } from "react"
import images from "../libs/images"
import Button from "./Button"
import { usePopup } from "../zustand/store";

// 웰컴 모달
export default function ModalProfile(props) {
    const {
        name = "",
        open = false,
        setOpen = (v) => { },
        onConfirm = () => { },
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
            // setOpen(false);
        }} />

        <div className={`modal-contents info`}>
            <p className="font-20 bold">프로필 사진 가이드</p>
            <div className="mt-20" style={{
                display: "flex",
                justifyContent: "center",
                gap: 12,
            }}>
                <img style={{ width: 140 }} src={images.profile_ok} alt="" />
                <img style={{ width: 140 }} src={images.profile_no} alt="" />
            </div>

            <div style={{
                padding: 16,
                display: "flex",
                width: "100%",
                flexDirection: "column",
                justifyContent: "start",
                gap: 2,
                background: "#F9F9F9",
                borderRadius: 8
            }}>
                <p className="font-14">1. 밝고 선명한 얼굴 사진</p>
                <p className="font-14">2. 얼굴이 정면을 향한 깔끔한 사진</p>
                <p className="font-14">3. 배경이 잘 정돈 된 사진</p>
                <p className="font-14">4. 얼굴이 잘 보이는 고화질 사진</p>
            </div>

            <div className="mt-24" style={{ display: "flex", width: "100%", gap: 14 }}>
                <Button title="닫기" type="gray" onClick={() => {
                    setOpen(false)
                }} />
                <Button title="사진 추가" type="" onClick={() => {
                    setOpen(false)
                    onConfirm();
                }} />
            </div>
        </div>
    </div >
}