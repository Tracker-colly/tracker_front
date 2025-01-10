import { Children, useEffect, useState } from "react"

/**
 * 커스텀 모달
 * @param {{
 * className:string;
 * children?:any;
 * open?:boolean;
 * setOpen?:()=>void;
 * }} props 
 * @returns 
 */
export default function CustomModal(props) {
    const {
        style = {},
        className = "",
        children,
        open = false,
        setOpen
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

    return <div className={`modal-area${className ? " " + className : ""} ${visible ? "" : "hide"}`}>

        <div className="modal-bg" onClick={() => {
            setVisible(false);
            if (setOpen) setOpen(false);
        }} />

        <div style={{ ...style }} className="modal-cus-contents">
            {children}
        </div>

    </div>
}