import { Children, useEffect, useState } from "react"
import images from "../libs/images"
import Button from "./Button"
import ModalRegiste from "./ModalRegiste"

export default function ModalBottom(props) {
    const {
        children,
        title = "추가하기",
        listItem,
        onListClick,
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
            <div className="header">
                <p style={{ lineHeight: "24px" }} className="m-title2">{title}</p>
                <button
                    style={{
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 26,
                        height: 26,
                        right: 17
                    }}
                    onClick={() => { if (setOpen) setOpen(false); }}
                ><img className="logo" src={images.x} /></button>
            </div>
            <div className="mbc-content">
                {listItem ? listItem.map((v, i) => {
                    return <div
                        style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                            padding: "24px 18px",
                            borderBottom: "1px solid #E6E9EB",
                            cursor: "pointer"
                        }}
                        onClick={() => {
                            if (onListClick) onListClick(i)
                            if (setOpen) setOpen(false);
                        }}>
                        <img src={images.plus} alt="" />
                        <p className="m-title1">{v}</p>
                    </div>
                }) : children}
            </div>
        </div>
    </div>
}