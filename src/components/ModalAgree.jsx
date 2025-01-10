import { Children, useEffect, useState } from "react"
import images from "../libs/images"
import Button from "./Button"

export default function ModalAgree(props) {
    const {
        onConfirm,
        open = false,
        setOpen,
        isBackClose = true
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

        <div className={`modal-bottom-contents`}>
            {/* <div className="header">
                <p style={{ lineHeight: "24px" }} className="m-title2">{title}</p>
            </div> */}
            <div className="mbc-content">
                <div style={{ padding: 16 }}>
                    <p className="title-18 al-center mt-12">동의</p>
                    <p style={{
                        marginTop: 21,
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: 500,
                        lineHeight: 1.5
                    }}>
                        동의 시 선택한 인사평가 및 추천서가<br />
                        Workplace에 제출됩니다.<br />
                        동의 하시겠습니까?<br />
                    </p>
                    <Button className="mt-32" type="delete" title="네, 동의합니다." onClick={() => {
                        if (onConfirm) onConfirm();
                    }} />
                </div>
            </div>
        </div>
    </div>
}