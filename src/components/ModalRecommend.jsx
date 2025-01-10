import { Children, useEffect, useState } from "react"
import images from "../libs/images"
import Button from "./Button"
import RadioRating2 from "./RadioRating2"
import LineBox from "./LineBox"
import RadioRatingStar from "./RadioRatingStar"
import RadioButton from "./RadioButton"
import Header from "./Header"
import { useConfig } from "../zustand/store"

export default function ModalRecommend(props) {
    const {
        onConfirm,
        data,
        open = false,
        setOpen,
        isBackClose = true
    } = props

    const { config } = useConfig()
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
                title={"추천서"}
                leftBtnClick={() => {
                    if (setOpen) setOpen(false);
                }}
            />
            <div style={{ padding: "0px 16px" }}>
                <p className="title-18">업무 역량 평가</p>
                <hr className="mt-16" />

                <div className="flex-between center mt-20">
                    <p className="title2">성실성</p>
                    <RadioRatingStar
                        value={data?.pointIntegrity}
                        disabled />
                </div>
                <p className="info2-1 mt-8">근태, 업무 집중도, 자리 비움 빈도</p>

                <div className="flex-between center mt-20">
                    <p className="title2">책임감</p>
                    <RadioRatingStar
                        value={data?.pointIntegrity}
                        disabled />
                </div>
                <p className="info2-1">업무 완성도, 일정/품질/업무 관리</p>

                <div className="flex-between center mt-20">
                    <p className="title2">팀워크</p>
                    <RadioRatingStar
                        value={data?.pointTeamwork}
                        disabled />
                </div>
                <p className="info2-1 mt-8">긍정적 자세, 배려, 솔선수범</p>

                <div className="flex-between center mt-20">
                    <p className="title2">담당 업무</p>
                    <RadioRatingStar
                        value={data?.pointWork}
                        disabled />
                </div>
                <p className="info2-1 mt-8">전문성/핵심역량 보유</p>

                <div className="flex-between center mt-20">
                    <p className="title2">업무 스킬</p>
                    <RadioRatingStar
                        value={data?.pointSkill}
                        disabled />
                </div >
                <p className="info2-1 mt-8">업무 관련 스킬 및 지식 배양</p>

                <LineBox className="mt-30" />

                <p className="title2 mt-30">윤리 및 태도</p>
                <p className="info3 mt-10">불성실한 근태 (잦은 지각, 결근, 연락 두절 등)</p>
                <RadioButton
                    color="red"
                    className="mt-16"
                    value={data?.pointAttitude}
                    setValue={() => { }}
                    count={2}
                    options={[
                        { values: 1, label: "있음" },
                        { values: 0, label: "없음" }
                    ]}
                    disabled
                />
                <p className="title2 mt-24">윤리적인 문제</p>
                <p className="info3 mt-10">금전, 이성, 폭력 등</p>
                <RadioButton
                    color="red"
                    className="mt-16"
                    value={data?.pointProblems}
                    setValue={() => { }}
                    count={2}
                    options={[
                        { values: 1, label: "있음" },
                        { values: 0, label: "없음" }
                    ]}
                    disabled
                />

                <p className="title2 mt-24">주변인과의 관계</p>
                <p className="info3 mt-10">불친절한 태도, 감정적 대응 등</p>
                <RadioButton
                    color="red"
                    className="mt-16"
                    value={data?.pointRelationships}
                    setValue={() => { }}
                    count={2}
                    options={[
                        { values: 1, label: "있음" },
                        { values: 0, label: "없음" }
                    ]}
                    disabled
                />

                <LineBox className="mt-30" />

                <p className="title-18 mt-30">{data?.userName}님의 강점을 기술해 주세요.</p>
                <textarea
                    className="input text-area disabled mt-20"
                    style={{
                        height: 280
                    }}
                    value={data?.pointBest}
                    maxLength={200}
                    placeholder=""
                    disabled
                />
                <div className="mt-14" style={{ textAlign: "end", color: "#6E7375" }}>{data?.pointBest?.length}/200</div>
                <p className="title-18 mt-30">{data?.userName}님의 개선점을 기술해 주세요.</p>
                <textarea
                    className="input text-area disabled mt-20"
                    style={{
                        height: 280
                    }}
                    value={data?.pointWorst}
                    maxLength={200}
                    placeholder=""
                    disabled
                />
                <div className="mt-14" style={{ textAlign: "end", color: "#6E7375" }}>{data?.pointWorst?.length}/200</div>
                <LineBox className="mt-30" />
                <p className="title-18 mt-30">당신이 채용 담당자라면 채용하시겠습니까?</p>
                <RadioRating2
                    className="mt-24"
                    value={Number(data?.pointFinal) - 1}
                    list={config?.pointFinals?.map(v => v.title)}
                    disabled
                />
                <div className="mt-40"></div>
            </div>
        </div>
    </div>
}