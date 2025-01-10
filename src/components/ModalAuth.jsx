import { Children, useEffect, useRef, useState } from "react"
import images from "../libs/images"
import Button from "./Button"
import RadioButton from "./RadioButton"
import Radio from "./Radio"
import { useConfig } from "../zustand/store"
import { Tooltip } from "react-tooltip"

export default function ModalAuth(props) {
    const {
        title = "설정",
        open = false,
        setOpen,
        isBackClose = true,
        initValue = { code: 1, level: 2 },
        onCancel,
        onConfirm
    } = props

    const tooltipRef = useRef();
    const [toolOpen, setToolOpen] = useState(false);

    const { config } = useConfig();
    const [visible, setVisible] = useState(false)

    const [code, setCode] = useState("");
    const [level, setLevel] = useState("");

    useEffect(() => {
        setVisible(open)

        if (open) {
            if (initValue) {
                setCode(initValue.code);
                setLevel(initValue.level);
            }
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
            <div className="auto-content">
                <p className="title1 mt-24 bold">직책</p>
                <RadioButton
                    color="red"
                    className="mt-16"
                    value={code}
                    setValue={setCode}
                    count={3}
                    options={config?.codes?.map(v => {
                        return { values: v?.id, label: v?.value }
                    })}
                // options={[
                //     { values: 1, label: "대표자" },
                //     { values: 2, label: "이사" },
                //     { values: 3, label: "부장" },
                // ]}
                />
                <div className="mt-24" style={{ display: "flex", alignItems: "center", height: 19 }}>
                    <p className="title1 bold">권한</p>
                    <img
                        data-tooltip-id="auth-tooltip-id"
                        style={{ padding: "6px 0px" }}
                        src={images.helper_icon} onClick={() => {
                            if (toolOpen) {
                                setToolOpen(false)
                                tooltipRef.current?.close();
                            } else {
                                setToolOpen(true)
                                tooltipRef.current?.open();
                            }
                        }} />
                </div>
                <Radio
                    className="mt-18"
                    value={level}
                    setValue={setLevel}
                    options={[
                        { values: 3, label: "Administrator" },
                        { values: 2, label: "Staff" },
                    ]} />

                <div className="mt-28" style={{ display: "flex", width: "100%", gap: 14 }}>
                    {onCancel && <Button
                        title={"취소"}
                        type="gray"
                        onClick={() => {
                            if (onCancel) onCancel();
                        }}
                    />}
                    {onConfirm && <Button
                        title={"확인"}
                        type="delete"
                        onClick={() => {
                            initValue.code = code
                            initValue.codeName = config?.codes?.find(v => v.id == code)?.value
                            initValue.level = level

                            if (onConfirm) onConfirm({ ...initValue });
                        }}
                    />}
                </div>

                <Tooltip
                    ref={tooltipRef}
                    id={"auth-tooltip-id"}
                    style={{
                        zIndex: 10,
                        borderRadius: 4,
                        background: "#3A474E",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "8px 8px"
                    }}
                    place="left-start"
                    openEvents={["click"]}
                    afterShow={() => { }}
                    clickable={true}
                >
                    <p className="font-13 bold color-white" onClick={() => {
                        tooltipRef.current?.close()
                    }}>
                        <span className=" font-13 color-tooltip bold">Administrator</span> : 인사평가 작성을 <br />
                        할 수 있는 권한입니다.<br />
                        <span className=" font-13 color-tooltip bold">Staff</span> : 링크 연결된 멤버의 기본<br />
                        권한입니다.
                    </p>
                </Tooltip>
            </div>
        </div>
    </div>
}