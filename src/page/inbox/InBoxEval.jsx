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
import HelperBox from "../../components/HelperBox";
import * as APIS from "../../utils/service"
import { toast } from "react-toastify";
import { useConfig } from "../../zustand/store";
import { hpHypen } from "../../utils/utils";

export default function InBoxEval() {
    const navigate = useNavigate();
    const location = useLocation();
    const { config, codeToText } = useConfig();

    const [insaIdx, setInsaIdx] = useState("");
    const [insaInfo, setInsaInfo] = useState([])

    const [sendDoc, setSendDoc] = useState([])
    const [pointFinal, setpointFinal] = useState(1);
    const [textInfo, setTextInfo] = useState("");

    const [confirmModal, setConfirmModal] = useState(false);
    const [checkModal, setcheckModal] = useState(false);

    const leftBtnClick = () => {
        navigate(-1);
    }

    // 작성완료
    const makeEvalFunc = () => {
        console.log("sendDoc", sendDoc)
        let sendData = {
            insaId: insaIdx,
            data: sendDoc,
            pointFinal: pointFinal,
            comment: textInfo
        }
        // console.log("🚀 ~ makeEvalFunc ~ sendData:", sendData)
        setcheckModal(false);
        APIS.postData("/v1/inbox/insaWrite", sendData)
            .then((result) => {
                setConfirmModal(true)
            }).catch(e => {
                toast.error(e.response.data)
            })
    }

    const loadInsaFunc = (idx) => {
        APIS.postData("/v1/inbox/insaInfo", {
            itemId: idx
        })
            .then((result) => {
                console.log(result.data?.data)
                setInsaInfo(result.data?.data)
                let editDocData = result.data?.data?.docInfo?.map(v => {
                    for (let i in v?.child) {
                        v.child[i].point = 3;
                    }
                    return v
                })
                setSendDoc(editDocData)
            }).catch(e => {
                toast.error(e.response.data)
                navigate(-1);
            })
    }

    useEffect(() => {
        if (location.state?.itemId) {
            let insaId = location.state?.itemId
            setInsaIdx(insaId)
            loadInsaFunc(insaId)
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
            <HelperBox title="인사평가" />
            <WriterCard
                className={"mt-24"}
                type="red"
                title="작성 요청자"
                infoList={[
                    { title: "이름", value: insaInfo?.user?.name },
                    // { title: "전화번호", value: hpHypen(insaInfo?.user?.hp) },
                    { title: "직책", value: codeToText(insaInfo?.user?.workLevel) },
                ]}
                disabled
            />

            <WriterCard
                className={"mt-16"}
                title="평가 작성자"
                infoList={[
                    { title: "이름", value: insaInfo?.creator?.name },
                    // { title: "전화번호", value: hpHypen(insaInfo?.creator?.hp) },
                    { title: "직책", value: codeToText(insaInfo?.creator?.workLevel) },
                ]}
                disabled
            />
            <LineBox className={"mt-30"} />

            <p className="title-20 mt-30">인사평가</p>

            {sendDoc.map((v, i) => {
                return <>
                    {i > 0 && <LineBox className="mt-40" />}
                    <div className="title-18 mt-20">
                        {v?.title}
                    </div>
                    <hr className="mt-16" />
                    {v?.child?.map((cv, ci) => {
                        return <>
                            <p className="title2 mt-50">{cv?.title}</p>
                            <p className="info2-1 mt-8">{cv?.message}</p>
                            <RadioRating
                                className="mt-24"
                                value={cv?.point}
                                setValue={(v) => {
                                    cv.point = v
                                    console.log(v)
                                }}
                            />
                        </>
                    })}
                </>
            })}
            {/* 
            <div className="title-18 mt-20">
                태도 및 윤리 의식 <span className="sub-title-15">(Behavior and Attitude)</span>
            </div>
            <hr className="mt-16" />
            <p className="title2 mt-50">1. 근무태도</p>
            <p className="info2-1 mt-8">올바른 인성을 갖추고 조직의 구성원으로서의 기본 적인 태도를 유지하고 있나요?(인사성, 사교성, 긍정성, 도덕성)</p>
            <RadioRating className="mt-24" value={3} />
            <p className="title2 mt-50">2. 성실성</p>
            <p className="info2-1 mt-8">성실한 자세로 업무에 임하고 있나요?(지각, 조퇴, 결근의 빈도)</p>
            <RadioRating className="mt-24" value={3} />
            <p className="title2 mt-50">3. 책임감</p>
            <p className="info2-1 mt-8">맡은 일을 책임감있게 수행하고 그 결과에 대해 책임지는 태도는 어떠한가요?</p>
            <RadioRating className="mt-24" value={3} />
            <p className="title2 mt-50">4. 협동심</p>
            <p className="info2-1 mt-8">상사의 지시 사항을 잘 수행하고, 팀원과의 팀워크를 형성하는데 적극적인가요?</p>
            <RadioRating className="mt-24" value={3} />

            <LineBox className="mt-40" />
            <div className="title-18 mt-40">
                능력 <span className="sub-title-15">(Competencies)</span>
            </div>
            <hr className="mt-16" />
            <p className="title2 mt-50">1. 업무지식</p>
            <p className="info2-1 mt-8">담당 직무에 대한 지식과 관련 업무 분야에 대한 지식의 정도는 어떠한가요?</p>
            <RadioRating className="mt-24" value={3} />
            <p className="title2 mt-50">2. 생산성</p>
            <p className="info2-1 mt-8">주어진 시간 안에 맡은 일의 우선순위를 정하여 효율적으로 완료하는 능력은 어떠한가요?</p>
            <RadioRating className="mt-24" value={3} />
            <p className="title2 mt-50">3. 분석판단력</p>
            <p className="info2-1 mt-8">계획 지시된 업무의 문제점을 적극적으로 파악하고 분석하며 건설적 해결책과 대책을 강구하는 능력은 어떠한가요?</p>
            <RadioRating className="mt-24" value={3} />
            <p className="title2 mt-50">4. 의사소통능력</p>
            <p className="info2-1 mt-8">상사 및 팀원들, 이해관계자들과의 원활한 소통으로 유대관계를 유지하는 능력은 어떠한가요?</p>
            <RadioRating className="mt-24" value={3} />
            <p className="title2 mt-50">5. 리더쉽</p>
            <p className="info2-1 mt-8">적극적인 자세로 팀의 목표 설정 및 수립을 위해 의견을 제시하거나 수렴하고 팀을 잘 끌고 나가나요?</p>
            <RadioRating className="mt-24" value={3} />
            <p className="title2 mt-50">6. 자기계발</p>
            <p className="info2-1 mt-8">업무에 필요한 새로운 기술이나 지식을 배우는 노력은 어떠한가요?</p>
            <RadioRating className="mt-24" value={3} />

            <LineBox className="mt-40" />
            <div className="title-18 mt-40">
                업무 실적 <span className="sub-title-15">(Job Performance)</span>
            </div>
            <hr className="mt-16" />
            <p className="title2 mt-50">업무 달성</p>
            <p className="info2-1 mt-8">계획, 지시에 의해 부과된 업무의 달성 여부, 타 직원과의 업무량 수준 및 기간 내 달성 여부는 어떠한가요?</p>
            <RadioRating className="mt-24" value={3} />
            <p className="title2 mt-50">업무의 질</p>
            <p className="info2-1 mt-8">착오, 누락, 오류의 발생 빈도를 최소화 하고 업무 속도가 빠르면서 완성도를 높이는 능력은 어떠한가요?</p>
            <RadioRating className="mt-24" value={3} />
            <p className="title2 mt-50">업무 개선</p>
            <p className="info2-1 mt-8">업무 성과 향상을 위한 혁신적인 방법 (프로세스 개선, 새로운 아이디어 도입, 제도 변화 등) 모색 및 실행의 기여도는 어떠한가요?</p>
            <RadioRating className="mt-24" value={3} />
            <p className="title2 mt-50">업무 처리</p>
            <p className="info2-1 mt-8">업무 수행 시 기준이나 절차를 준수하며 조직의 핵심 가치(고객 중심 등)를 구현하는 능력은 어떠한가요?</p>
            <RadioRating className="mt-24" value={3} />
            <p className="title2 mt-50">업무 평가</p>
            <p className="info2-1 mt-8">업무 수행에 대한 상사, 동료, 고객으로부터의 평가는 어떠한가요?</p>
            <RadioRating className="mt-24" value={3} />
            */}

            <LineBox className="mt-40" />
            <div className="title-18 mt-40">
                종합 평가 <span className="sub-title-15">(Overall Evaluation)</span>
            </div>
            <hr className="mt-16" />
            <p className="title-16 mt-16">평가 결과에 따라 직원의 전반적인 성과를 어떻게
                평가하시겠습니까?</p>
            <RadioRating2
                className="mt-24"
                value={pointFinal - 1}
                setValue={v => setpointFinal(v + 1)}
                list={config?.pointInsaFinals.map(v => v.title)}
            />

            <textarea
                className="input text-area mt-20"
                style={{
                    height: 280
                }}
                value={textInfo}
                onChange={(e) => {
                    setTextInfo(e.target.value)
                }}
                maxLength={200}
                placeholder="해당 직원에 대한 의견을 자유롭게 적어주세요."
            />

            <div className="mt-14" style={{ textAlign: "end", color: "#6E7375" }}>{textInfo.length}/200</div>

            <Button
                className="mt-24"
                type="red"
                title="작성완료"
                disabled={textInfo.length === 0}
                onClick={() => {
                    setcheckModal(true);
                }}
            />

            <div className="mt-20"></div>
        </div>

        <Modal
            open={confirmModal}
            setOpen={setConfirmModal}
            title={"인사평가 작성을 완료하였습니다"}
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
            title={"인사평가 작성을 완료하시겠습니까?"}
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