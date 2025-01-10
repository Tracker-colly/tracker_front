import { Children, useEffect, useState } from "react"
import images from "../libs/images"
import Button from "./Button"
/**
 * 
 * @param {{
 * type?:"success"|"error"|"info"|"custom"
 * children:any
 * title:string
 * message:string
 * open:boolean
 * setOpen:(open:boolean)=>void
 * confirm:string
 * onConfirm:()=>void
 * cancel:string
 * onCancel:()=>void
 * }} props 
 * @returns 
 */
export default function Modal(props) {
    const {
        type = "success",
        children,
        title = "",
        message = "",
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

        <div className={`modal-contents ${type ? type : "info"}`}>
            {type === "success" && <>
                <div className="img-box success">
                    <div className="success"></div>
                </div>
                <div className="m-title1 mt-16">{title}</div>
                <div className="m-body1 al-center mt-12">{message}</div>
                {children}
            </>}
            {type === "error" && <>
                <img className="img-box" src={images.circle_warning} />
                <div className="m-title1 al-center mt-16">{title}</div>
                <div className="m-body1 al-center mt-12">{message}</div>
            </>}
            {type === "info" && <>
                <div className="m-title1 al-center mt-8">{title}</div>
                <div className="m-body1 al-center mt-12">{message}</div>
            </>}

            {type === "custom" && <>
                {children}
            </>}
            <div className="mt-24" style={{ display: "flex", width: "100%", gap: 14 }}>
                {onCancel && <Button
                    title={cancel}
                    type="gray"
                    onClick={() => {
                        if (setOpen) setOpen(false);
                        if (onCancel) onCancel();
                    }}
                />}
                {onConfirm && <Button title={confirm} type="confirm" onClick={() => {
                    if (onConfirm) onConfirm();
                }} />}
            </div>
        </div>

    </div>
}