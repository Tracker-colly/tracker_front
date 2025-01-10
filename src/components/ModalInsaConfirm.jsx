import { Children, useEffect, useState } from "react"
import images from "../libs/images"
import Button from "./Button"
import CheckBox from "./CheckBox"

export default function ModalInsaConfirm(props) {
    const {
        open = false,
        title = "인사평가",
        setOpen,
        confirm = "확인",
        onConfirm,
        isBackClose = false
    } = props

    const [visible, setVisible] = useState(false)
    const [check, setCheck] = useState(false)

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

        <div className={`modal-contents`} style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px 16px"
        }}>
            <div style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <p className="title-18">{title} 작성을 시작하겠습니다.</p>
                <button onClick={() => {
                    if (setOpen) setOpen(false);
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6.5L12 12.5M12 12.5L18 18.5M12 12.5L18 6.5M12 12.5L6 18.5" stroke="#131214" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                </button>
            </div>

            <div style={{
                display: "flex",
                gap: 10,
                flexDirection: "column",
                width: "100%",
                padding: "16px 10px",
                borderRadius: 8,
                border: "1px solid #E6E9EB",
                marginTop: 12
            }}>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <svg style={{ flexShrink: 0 }} width="8" height="22" viewBox="0 0 8 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3.5" cy="11" r="1.5" fill="#6E7375" />
                    </svg>
                    <p className="font-14 bold" style={{ lineHeight: 1.4 }}>
                        해당 {title}에 대한 모든 답변 내용은
                        <span className="font-14 color-success bold">면접관이 볼 수 있으며 평가 자료로 활용됩니다.</span>
                    </p>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <svg style={{ flexShrink: 0 }} width="8" height="22" viewBox="0 0 8 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3.5" cy="11" r="1.5" fill="#6E7375" />
                    </svg>
                    <p className="font-14 bold" style={{ lineHeight: 1.4 }}>
                        솔직하게 작성해주신 정보는 <span className="font-14 color-success bold">요청자님이 추구하는 가치와 업무환경 그리고 핏-한 회사를</span> 만나는데
                        큰 도움이 되니 성심성의껏 작성해 주시길 바랍니다.
                    </p>
                </div>
            </div>

            <div className="mt-20"
                style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <CheckBox
                    style={{ flexShrink: 0 }}
                    value={check}
                    setValue={setCheck}
                />
                <p className={"font-14 bold" + (!check ? " color-gray" : "")}>
                    공정한 채용을 위해 진솔하고 성실한 {title}를 작성할 것을 약속합니다.
                </p>
            </div>

            <div className="mt-24" style={{ display: "flex", width: "100%", gap: 14 }}>
                {onConfirm && <Button title={confirm} type="red" onClick={() => {
                    if (onConfirm) onConfirm();
                }} disabled={!check} />}
            </div>
        </div>

    </div>
}