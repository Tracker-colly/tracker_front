import { Children, useEffect, useState } from "react"
import RadioRating2 from "./RadioRating2"
import LineBox from "./LineBox"
import Header from "./Header"
import RadioRating from "./RadioRating"

export default function ModalDocView(props) {
    const {
        open = false,
        docList = [],
        setOpen,
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

        {/* <div className="modal-bg" onClick={() => {
            
        }} /> */}
        <div className={`modal-full-contents`}>
            <Header
                title={"인사평가 양식"}
                leftBtnClick={() => {
                    if (setOpen) setOpen(false);
                }}
            />
            <div style={{ padding: "0px 16px" }}>
                {docList.map((doc, index) => {
                    return <>
                        {index > 0 && <LineBox className="mt-40" />}
                        <div className="title-18 mt-40">
                            {doc?.title}
                            {/* <span className="sub-title-15">({doc?.title})</span> */}
                        </div>
                        <hr className="mt-16" />
                        {doc.child?.map((v, i) => {
                            return <>
                                <p className="title2 mt-50">{v?.title}</p>
                                <p className="info2-1 mt-8">{v?.message}</p>
                                <RadioRating className="mt-24" value={0} disabled />
                            </>
                        })}
                    </>
                })}

                <LineBox className="mt-40" />
                <div className="title-18 mt-40">
                    종합 평가 <span className="sub-title-15">(Overall Evaluation)</span>
                </div>
                <hr className="mt-16" />
                <p className="title-16 mt-16">평가 결과에 따라 직원의 전반적인 성과를 어떻게
                    평가하시겠습니까?</p>
                <RadioRating2 className="mt-24" value={9} disabled />

                <textarea
                    className="input text-area disabled mt-20"
                    style={{
                        height: 280
                    }}
                    value={""}
                    maxLength={200}
                    placeholder="해당 직원에 대한 의견을 자유롭게 적어주세요."
                    disabled
                />
                <div className="mt-14" style={{ textAlign: "end", color: "#6E7375" }}>{0}/200</div>
                <div className="mt-50"></div>
            </div>
        </div>
    </div>
}