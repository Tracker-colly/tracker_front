import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { toast } from "react-toastify";
import * as APIS from "../../utils/service"
import _ from "lodash";

import Layout from "../../layout/Layout";
import images from "../../libs/images";
import Button from "../../components/Button";
import LineBox from "../../components/LineBox";
import ArcodianMenu from "../../components/ArcodionMenu";
import { ChooCard, InsaCard } from "../track/TrackComponents";
import InsaCheckCard from "../../components/InsaCheckCard";
import ModalBottom from "../../components/ModalBottom";
import ModalAgree from "../../components/ModalAgree";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import ModalRecommend from "../../components/ModalRecommend";
import moment from "moment";
import { useLoading } from "../../zustand/store";

const NoneCard = (props) => {
    const { name } = props
    return <div className="insa-access-error">
        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 37 36" fill="none">
            <path d="M18.5 18.3V13.1312M18.5 23.7C18.5 23.7 18.5073 23.7 18.512 23.7M30.5 18C30.5 24.6274 25.1274 30 18.5 30C11.8726 30 6.5 24.6274 6.5 18C6.5 11.3726 11.8726 6 18.5 6C25.1274 6 30.5 11.3726 30.5 18Z" stroke="#B6B6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p className="font-14 color-gray">{name} 목록이 없습니다.</p>
    </div>
}

export default function SumitSelect() {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const { setLoading } = useLoading();

    const [comId, setComId] = useState("");
    const [insaList, setInsaList] = useState([])
    const [recomObj, setRecomObj] = useState({})

    const [step, setStep] = useState(0);
    const [insa, setInsa] = useState("");
    const [recommends, setRecommends] = useState([]);
    const [next, setNext] = useState(false);

    const [agreeModal, setAgreeModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false)

    const [recommendView, setRecommendView] = useState();
    const [recommendModal, setRecommendModal] = useState(false);

    const headerBackClick = () => {
        navigate(-1);
    }

    const setRecItem = (check, value) => {
        setRecommends(v => {
            if (check) {
                v.push(value)
            } else {
                let delIndex = v.indexOf({ idx: value.idx });
                if (delIndex >= 0) v.splice(delIndex, 1);
            }
            return [...v]
        })
    }

    const loadFormList = () => [
        APIS.postData("/v1/search/formList", {})
            .then((result) => {
                let formData = result.data.data;
                setInsaList(formData.insaList);
                setRecomObj(_.groupBy(formData.recommendList, "companyId"));
            }).catch(e => {
                toast.error(e.response.data)
            })
    ]

    // 제출 확인하기로 넘어기기
    const moveConfirmPage = () => {
        if (insa != "" && recommends.length > 0 && recommends.length < 4) {
            console.log(recommends)
            setStep(1)
        }
    }

    // 제출 하기 동의
    const sendDocFunc = () => {
        let sendData = {
            comId: comId,
            insaId: insa.idx,
            recommendIds: recommends.map(v => v?.idx)
        }
        setAgreeModal(false);
        setLoading(true)
        APIS.postData("/v1/search/sendDoc", sendData)
            .then((result) => {
                setLoading(false)
                setConfirmModal(true);
            }).catch(e => {
                setLoading(false)
                toast.error(e.response.data)
            })

    }

    useEffect(() => {
        let comId = Number(params.get("idx"))
        if (comId) {
            setComId(comId)
            loadFormList()
        } else {
            toast.error("잘못된 요청입니다.")
            navigate(-1)
        }

    }, [])

    useEffect(() => {
        if (insa != "" && recommends.length > 0 && recommends.length < 4) {
            setNext(true);
        } else {
            setNext(false);
        }
        console.log(insa, recommends.length)
    }, [insa, recommends])

    return <Layout
        headerTitle={step == 0 ? "인사평가 및 추천서 선택" : "제출"}
        leftBtnClick={headerBackClick}
        text={step == 1 && <Button type="auth" title="다시선택" onClick={() => {
            console.log("??")
            setInsa("")
            setRecommends([])
            setStep(0)
        }} />}
        textClick={() => { }}
        isHeader
    >
        <div className="content">
            {step == 0 && <>
                <p className="title-18 mt-40">인사 평가서를 선택해 주세요.</p>
                <p className="font-15 color-gray mt-12">인사 평가서의 경우 복수 선택이 불가합니다.</p>
                <div className="mt-24" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {insaList.map(v => {
                        return <InsaCheckCard
                            companyName={v?.companyName}
                            name={v?.creatorName}
                            lank={v?.creatorLevelName}
                            date={v?.date}
                            check={insa?.idx == v?.idx}
                            setCheck={() => { setInsa(v) }}
                        />
                    })}
                    {insaList.length <= 0 && <NoneCard name="평가서" />}
                </div>
                <LineBox className="mt-40" />
                <p className="title-18 mt-40">추천서를 선택해 주세요.</p>
                <p className="info2-1 mt-12">추천서의 경우 최대 3개까지 선택 가능합니다.</p>
                <p className="mt-16" />

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {Object.keys(recomObj).map((v, i) => {
                        return <ArcodianMenu title={recomObj[v][0].companyName} >
                            <div style={{
                                display: "flex", flexDirection: "column",
                                gap: 20, padding: "20px 0px"
                            }}>
                                {recomObj[v].map(reValue => {
                                    return <ChooCard
                                        name={reValue?.creatorName}
                                        lank={reValue?.creatorRelation}
                                        isCheck
                                        onCheck={check => {
                                            setRecItem(check, reValue)
                                        }}
                                        onClick={() => {
                                            setRecommendView(reValue)
                                            setRecommendModal(true)
                                        }} />
                                })}
                            </div>
                        </ArcodianMenu>
                    })}
                    {/* {["케빗", "보더콜리", "퍼스트스퀘어", "트랙커콜리"].map((v, i) => {
                        return <ArcodianMenu title={v} >
                            <div style={{
                                display: "flex", flexDirection: "column",
                                gap: 20, padding: "20px 0px"
                            }}>
                                <ChooCard
                                    name="홍길동" lank="실무담당자"
                                    isCheck
                                    onCheck={v => {
                                        setRecItem(v, `${i}-1`)
                                    }}
                                    onClick={() => {
                                        setRecommendModal(true)
                                    }} />
                                <ChooCard
                                    name="홍길동" lank="실무담당자"
                                    isCheck
                                    onCheck={v => {
                                        setRecItem(v, `${i}-2`)
                                    }}
                                    onClick={() => {
                                        setRecommendModal(true)
                                    }} />
                            </div>
                        </ArcodianMenu>
                    })} */}
                    {Object.keys(recomObj).length <= 0 && <NoneCard name="추천서" />}
                </div>
            </>}

            {step == 1 && <>
                <p className="title-18 mt-40">인사 평가</p>
                <p className="info2-1 mt-12">인사 평가는 인사 담당자만 확인이 가능합니다.</p>
                <div className="mt-20" />
                <InsaCard
                    companyName={insa?.companyName}
                    name={insa?.creatorName}
                    lank={insa?.creatorLevelName}
                    date={insa?.date}
                />
                <p className="title-18 mt-40">추천서</p>
                <div className="mt-20" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {recommends.map(v => {
                        return <ChooCard
                            name={v?.creatorName}
                            lank={v?.creatorRelation}
                            onClick={() => {
                                setRecommendView(v)
                                setRecommendModal(true)
                            }} />
                    })}
                </div>
            </>}

        </div >

        <div className="position-bot">
            {step == 0 &&
                <Button
                    type="red"
                    title={"다음"}
                    onClick={moveConfirmPage}
                    disabled={!next}
                />
            }
            {step == 1 && <Button
                type="red"
                title={"제출하기"}
                onClick={() => {
                    setAgreeModal(true)
                }}
            />}
        </div>

        <ModalAgree
            open={agreeModal}
            setOpen={setAgreeModal}
            onConfirm={sendDocFunc}
        />

        <Modal
            open={confirmModal}
            title="제출을 완료하였습니다."
            message="Applicant 카드가 생성되었습니다."
            confirm="메인으로"
            onConfirm={() => {
                navigate("/home", { replace: true })
            }}
        />

        <ModalRecommend
            open={recommendModal}
            data={recommendView}
            setOpen={setRecommendModal}
        />
    </Layout >


}