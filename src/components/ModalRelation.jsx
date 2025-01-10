import { Children, useEffect, useRef, useState } from "react"
import RadioButton from "./RadioButton"
import Header from "./Header"
import { useConfig } from "../zustand/store"
import Input from "./Input"
import CheckBox from "./CheckBox"
import RadioList from "./RadioList"

export default function ModalRelation(props) {
    const {
        data,
        open = false,
        setOpen,
    } = props

    const { config, codeToText } = useConfig()

    const contentRef = useRef();
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(open)
        if (open) {
            console.log(data?.creatorName)
            console.log(data?.userName)
            console.log(data?.companyName)
            console.log(data?.startYear)
            console.log(data?.startMonth)
            console.log(data?.endYear)
            console.log(data?.endMonth)
            console.log(data?.workType)
            console.log(data?.workLevel)
            console.log(data?.creatorRelation)
            console.log(data?.creatorWorkLevel)
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [open])

    return <div className={`modal-area ${visible ? "" : "hide"}`}>

        {/* <div className="modal-bg" onClick={() => {
            
        }} /> */}
        <div ref={contentRef} className={`modal-full-contents`}>
            <Header
                title={"관계"}
                leftBtnClick={() => {
                    if (setOpen) setOpen(false);
                }}
            />
            <div style={{ padding: "0px 16px" }}>
                <div className="title-18 mt-20">1. 함께 근무했던 회사</div>
                <div className="info3 mt-10">{data?.userName}님과 함께 근무했던 회사</div>
                <Input className="mt-16" value={data?.companyName} disabled />

                <div className="title-18 mt-40">2. 함께 근무한 기간</div>
                <div className="info3 mt-10">{data?.userName}님과 함께 근무한 기간</div>
                <div className="mt-16" style={{ display: "flex", gap: 20 }}>
                    <Input
                        className="flex-1"
                        value={data?.startYear + "년"}
                        disabled />
                    <Input
                        className="flex-1"
                        value={data?.startMonth + "월"}
                        disabled />
                </div>
                <div className="mt-10" style={{ display: "flex", gap: 20 }}>
                    <Input
                        className="flex-1"
                        value={data?.endYear ? data?.endYear + "년" : ""}
                        placeHolder="종료연도"
                        disabled />
                    <Input
                        className="flex-1"
                        value={data?.endMonth ? data?.endMonth + "월" : ""}
                        placeHolder="월"
                        disabled />
                </div>

                <div className="mt-16" style={{
                    display: "flex", gap: 10,
                    fontSize: 15, fontWeight: 500, alignItems: "center"
                }}>
                    <CheckBox value={!data?.endYear} disabled />
                    현재 근무 중
                </div>


                <div className="title-18 mt-40">3. 근무 유형</div>
                <div className="info3 mt-10">{data?.userName}님의 근무 유형</div>
                <RadioButton
                    color="red"
                    className="mt-16"
                    value={data?.workType}
                    count={3}
                    options={[
                        { values: "회사", label: "회사" },
                        { values: "알바", label: "알바" },
                        { values: "프리랜서", label: "프리랜서" }
                    ]}
                    disabled
                />

                <div className="title-18 mt-40">4. {data?.userName}님의 직책</div>
                <div className="info3 mt-10">{data?.creatorName}님과 근무 당시 {data?.userName}님의 직책</div>
                <RadioButton
                    color="red"
                    className="mt-16"
                    value={data?.workLevel}
                    setValue={() => { }}
                    count={3}
                    options={config?.codes?.map(v => {
                        return { values: v?.id, label: v?.value }
                    })}
                    disabled
                />

                <div className="title-18 mt-40">5. 소속 정보 / 관계</div>
                <div className="info3 mt-10">근무 시 {data?.userName}님과의 관계를 알려주세요.</div>
                <RadioList
                    className="mt-16"
                    value={data?.creatorRelation}
                    options={config?.relations?.map(v => {
                        return { values: v, label: data?.userName + "님의 " + v }
                    })}
                    disabled
                />

                <div className="title-18 mt-40">6. {data?.creatorName}님의 직책</div>
                <div className="info3 mt-10">{data?.userName}님과 근무 당시의 직책을 알려주세요.</div>
                <RadioButton
                    color="red"
                    className="mt-16"
                    value={data?.creatorWorkLevel}
                    count={3}
                    options={config?.codes?.map(v => {
                        return { values: v?.id, label: v?.value }
                    })}
                    disabled
                />
                <div className="mt-50"></div>
            </div>
        </div>
    </div>
}