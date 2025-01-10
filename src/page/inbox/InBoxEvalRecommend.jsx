import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import { ChooCard } from "../track/TrackComponents";
import WriterCard from "../../components/WriterCard";
import LineBox from "../../components/LineBox";
import RadioRating2 from "../../components/RadioRating2";
import RadioRating from "../../components/RadioRating";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import InBoxEvalCheck from "./InBoxEvalCheck";
import HelperBox from "../../components/HelperBox";
import RadioButton from "../../components/RadioButton";
import RadioRatingStar from "../../components/RadioRatingStar";
import * as APIS from "../../utils/service"
import { toast } from "react-toastify";
import { useConfig } from "../../zustand/store";
import { hpHypen } from "../../utils/utils";

export default function InBoxEvalRecommend() {
    const navigate = useNavigate();
    const location = useLocation();

    const { config ,codeToText} = useConfig();

    const [recommendId, setRecommendId] = useState("");
    const [recommendInfo, setRecommendInfo] = useState({});

    const [isCheck, setIsCheck] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [checkModal, setcheckModal] = useState(false);

    const [creatorFile, setCreatorFile] = useState("");
    const [creatorRelation, setCreatorRelation] = useState("");
    const [creatorWorkLevel, setCreatorWorkLevel] = useState("");

    const [pointIntegrity, setpointIntegrity] = useState(0);
    const [pointResponsibility, setpointResponsibility] = useState(0);
    const [pointTeamwork, setpointTeamwork] = useState(0);
    const [pointWork, setpointWork] = useState(0);
    const [pointSkill, setpointSkill] = useState(0);

    const [pointAttitude, setpointAttitude] = useState(false);
    const [pointProblems, setpointProblems] = useState(false);
    const [pointRelationships, setpointRelationships] = useState(false);

    const [pointFinal, setpointFinal] = useState(1);

    const [textStr, setTextStr] = useState("");
    const [textReport, setTextReport] = useState("");

    const leftBtnClick = () => {
        if (isCheck) {
            setIsCheck(false)
        } else {
            navigate(-1);
        }
    }

    const writeStart = (data) => {
        setCreatorFile(data?.file)
        setCreatorRelation(data?.relation)
        setCreatorWorkLevel(data?.workLevel)

        window.scrollTo(0, 0)
        setIsCheck(true)
    }

    // 작성 확인 컨펌
    const makeEvalFunc = () => {
        let sendData = {
            recommendId: recommendId,
            creatorFile: creatorFile,
            creatorRelation: creatorRelation,
            creatorWorkLevel: creatorWorkLevel,
            pointIntegrity: pointIntegrity,
            pointResponsibility: pointResponsibility,
            pointTeamwork: pointTeamwork,
            pointWork: pointWork,
            pointSkill: pointSkill,
            pointAttitude: pointAttitude,
            pointProblems: pointProblems,
            pointRelationships: pointRelationships,
            pointBest: textStr,
            pointWorst: textReport,
            pointFinal: pointFinal
        }
        setcheckModal(false);

        APIS.postData("/v1/inbox/recommendWrite", sendData)
            .then((result) => {
                setConfirmModal(true)
            }).catch(e => {
                toast.error(e.response.data)
            })
    }

    const loadRecommendInfo = (idx) => {
        APIS.postData("/v1/inbox/recommendInfo", {
            itemId: idx
        })
            .then((result) => {
                console.log(result.data?.data)
                setRecommendInfo(result.data?.data)
            }).catch(e => {
                toast.error(e.response.data)
                navigate(-1);
            })

    }

    useEffect(() => {
        if (location.state?.itemId) {
            let recId = location.state?.itemId
            setRecommendId(recId)
            loadRecommendInfo(recId)
        } else {
            navigate(-1);
        }
    }, [])

    return <Layout
        isHeader
        headerTitle="작성하기"
        leftBtnClick={leftBtnClick}
    >
        <div className="content">
            {!isCheck ?
                <InBoxEvalCheck info={recommendInfo} onConfirm={writeStart} /> :
                <>
                    <HelperBox title="추천서" />

                    <WriterCard
                        className={"mt-24"}
                        type="red"
                        title="작성 요청자"
                        infoList={[
                            { title: "이름", value: recommendInfo?.userName },
                            { title: "전화번호", value: hpHypen(recommendInfo?.userHp) },
                        ]}
                        disabled
                    />

                    <WriterCard
                        className={"mt-16"}
                        title="평가 작성자"
                        infoList={[
                            { title: "이름", value: recommendInfo?.creatorName },
                            { title: "전화번호", value: hpHypen(recommendInfo?.creatorHp) },
                        ]}
                        disabled
                    />
                    <LineBox className={"mt-30"} />

                    <p className="title-20 mt-30">
                        추천서 작성을 진행해주세요.
                    </p>

                    <p className="title-18 mt-30">업무 역량 평가</p>
                    <hr className="mt-16" />

                    <div className="flex-between center mt-20">
                        <p className="title2">성실성</p>
                        <RadioRatingStar value={pointIntegrity} setValue={setpointIntegrity} />
                    </div>
                    <p className="info2-1 mt-8">근태, 업무 집중도, 자리 비움 빈도</p>

                    <div className="flex-between center mt-20">
                        <p className="title2">책임감</p>
                        <RadioRatingStar value={pointResponsibility} setValue={setpointResponsibility} />
                    </div>
                    <p className="info2-1">업무 완성도, 일정/품질/업무 관리</p>

                    <div className="flex-between center mt-20">
                        <p className="title2">팀워크</p>
                        <RadioRatingStar value={pointTeamwork} setValue={setpointTeamwork} />
                    </div>
                    <p className="info2-1 mt-8">긍정적 자세, 배려, 솔선수범</p>

                    <div className="flex-between center mt-20">
                        <p className="title2">담당 업무</p>
                        <RadioRatingStar value={pointWork} setValue={setpointWork} />
                    </div>
                    <p className="info2-1 mt-8">전문성/핵심역량 보유</p>

                    <div className="flex-between center mt-20">
                        <p className="title2">업무 스킬</p>
                        <RadioRatingStar value={pointSkill} setValue={setpointSkill} />
                    </div >
                    <p className="info2-1 mt-8">업무 관련 스킬 및 지식 배양</p>

                    <LineBox className="mt-30" />

                    <p className="title2 mt-30">윤리 및 태도</p>
                    <p className="info3 mt-10">불성실한 근태 (잦은 지각, 결근, 연락 두절 등)</p>
                    <RadioButton
                        color="red"
                        className="mt-16"
                        value={pointAttitude ? 1 : 2}
                        setValue={(v) => {
                            setpointAttitude(v == 1 ? true : false)
                        }}
                        count={2}
                        options={[
                            { values: 1, label: "있음" },
                            { values: 2, label: "없음" }
                        ]}
                    />
                    <p className="title2 mt-24">윤리적인 문제</p>
                    <p className="info3 mt-10">금전, 이성, 폭력 등</p>
                    <RadioButton
                        color="red"
                        className="mt-16"
                        value={pointProblems ? 1 : 2}
                        setValue={(v) => {
                            setpointProblems(v == 1 ? true : false)
                        }}
                        count={2}
                        options={[
                            { values: 1, label: "있음" },
                            { values: 2, label: "없음" }
                        ]}
                    />

                    <p className="title2 mt-24">주변인과의 관계</p>
                    <p className="info3 mt-10">불친절한 태도, 감정적 대응 등</p>
                    <RadioButton
                        color="red"
                        className="mt-16"
                        value={pointRelationships ? 1 : 2}
                        setValue={(v) => {
                            setpointRelationships(v == 1 ? true : false)
                        }}
                        count={2}
                        options={[
                            { values: 1, label: "있음" },
                            { values: 2, label: "없음" }
                        ]}
                    />

                    <LineBox className="mt-30" />

                    <p className="title-18 mt-30">{recommendInfo?.userName}님의 강점을 기술해 주세요.</p>
                    <textarea
                        className="input text-area mt-20"
                        style={{
                            height: 280
                        }}
                        value={textStr}
                        onChange={(e) => {
                            setTextStr(e.target.value)
                        }}
                        maxLength={200}
                        placeholder=""
                    />
                    <div className="mt-14" style={{ textAlign: "end", color: "#6E7375" }}>{textStr.length}/200</div>
                    <p className="title-18 mt-30">{recommendInfo?.userName}님의 개선점을 기술해 주세요.</p>
                    <textarea
                        className="input text-area mt-20"
                        style={{
                            height: 280
                        }}
                        value={textReport}
                        onChange={(e) => {
                            setTextReport(e.target.value)
                        }}
                        maxLength={200}
                        placeholder=""
                    />
                    <div className="mt-14" style={{ textAlign: "end", color: "#6E7375" }}>{textReport.length}/200</div>
                    <LineBox className="mt-30" />
                    <p className="title-18 mt-30">당신이 채용 담당자라면 채용하시겠습니까?</p>
                    <RadioRating2
                        className="mt-24"
                        value={pointFinal - 1}
                        setValue={(v) => {
                            setpointFinal(v + 1)
                        }}
                        list={config?.pointFinals?.map(v => v.title)}
                    />
                    <div className="mt-40"></div>

                    <Button
                        className="mt-24"
                        type="red"
                        title="작성완료"
                        disabled={(textStr.length === 0 || textReport.length === 0)}
                        onClick={() => {
                            setcheckModal(true);
                        }}
                    />
                    <div className="mt-20"></div>
                </>}
        </div>

        <Modal
            open={confirmModal}
            setOpen={setConfirmModal}
            title={"추천서 작성을 완료하였습니다"}
            confirm="메인으로"
            onConfirm={() => {
                setConfirmModal(false)
                navigate("/inbox", { replace: true })
            }}
        />

        <Modal
            open={checkModal}
            setOpen={setcheckModal}
            type="info"
            title={"추천서 작성을 완료하시겠습니까?"}
            message="작성을 완료하면 수정이 불가능합니다"
            confirm="확인"
            onConfirm={makeEvalFunc}
            cancel="취소"
            onCancel={() => {
                setcheckModal(false);
            }}
        />
    </Layout>
}