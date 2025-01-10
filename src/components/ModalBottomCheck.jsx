import { Children, useEffect, useState } from "react"
import images from "../libs/images"
import Button from "./Button"
import CheckBox from "./CheckBox"

export default function ModalBottomCheck(props) {
    const {
        children,
        title = "추가하기",
        listItem,
        onConfirm,
        open = false,
        setOpen,
        isBackClose = true
    } = props

    const [visible, setVisible] = useState(false)
    const [checkList, setcheckList] = useState([])

    const checkFunc = (i) => {

        setcheckList(privList => {
            let index = privList.indexOf(i);
            if (index >= 0) {
                privList = privList.filter(val => val != i);
            } else {
                privList.push(i)
            }
            console.log("🚀 ~ checkFunc ~ privList:", privList)
            return [...privList]
        })
    }

    useEffect(() => {
        setVisible(open)

        if (open) {
            setcheckList(v => [])
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
                        key={"testasdasdqwewe=" + i}
                        style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                            padding: "24px 18px",
                            borderBottom: (i < listItem.length - 1) && "1px solid #E6E9EB",
                            cursor: "pointer"
                        }}
                        onClick={() => { checkFunc(i) }}>
                        <CheckBox
                            value={checkList.includes(i)}
                            setValue={() => { }}
                        />
                        <p className="m-title1">{v}</p>
                    </div>
                }) : children}
                <div style={{
                    padding: "6px 12px",
                }}>
                    <Button type="red" title="제출 요청" onClick={() => {
                        if (setOpen) setOpen(false);
                        if (onConfirm) onConfirm(checkList);
                    }} disabled={checkList.length < 1} />
                </div>
            </div>
        </div>
    </div>
}