import { Children, useEffect, useState } from "react"
import images from "../libs/images"
import Button from "./Button"
import { usePopup } from "../zustand/store"
import { useNavigate } from "react-router-dom"

export default function ModalRegiste(props) {
    const navigate = useNavigate();
    const { regiOpen, setRegiOpen } = usePopup();

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(regiOpen)
        if (regiOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [regiOpen])

    return <div className={`modal-area ${visible ? "" : "hide"}`}>

        <div className="modal-bg" onClick={() => {
            setRegiOpen(false);
        }} />

        <div className={`modal-bottom-contents`}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "34px 20px 20px 20px"
            }}>
                <img
                    style={{
                        width: "100%",
                        aspectRatio: 1.7
                    }}
                    src={images.registe_img} alt="" />
                <p className="font-24 bold mt-20">트랙커콜리와 함께 나의 진짜</p>
                <p className="font-24 bold mt-8">가치를 찾아가세요!</p>

                <Button className="mt-24" type="red" title="회원가입하기" onClick={() => {
                    setRegiOpen(false);
                    navigate("/registe")
                }} />

                <p className="mt-20 color-sub-text">가입하면 트랙커콜리의 <span className="color-error bold">이용약관, 개인정보 처리방침</span></p>
                <p className="mt-4 color-sub-text"><span className="color-error bold">쿠키 사용</span>에 동의하게 됩니다.</p>
            </div>

        </div>
    </div>
}