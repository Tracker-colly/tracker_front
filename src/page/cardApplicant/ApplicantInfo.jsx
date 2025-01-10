import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import TabMenu from "../../components/TabMenu"
import RadioRating from "../../components/RadioRating";
import RadioRating2 from "../../components/RadioRating2";
import WriterCard from "../../components/WriterCard";
import LineBox from "../../components/LineBox";
import * as APIS from "../../utils/service"
import { toast } from "react-toastify";
import { useConfig } from "../../zustand/store";
import ModalRecommend from "../../components/ModalRecommend";
import { hpHypen } from "../../utils/utils";
import ModalRelation from "../../components/ModalRelation";

export default function ApplicantInfo() {
    const params = new URLSearchParams(window.location.search);
    const navigate = useNavigate()
    const location = useLocation();
    const { config, codeToText } = useConfig();

    const [viewId, setViewId] = useState("")
    const [viewData, setViewData] = useState({})

    const [tabIndex, setTabIndex] = useState(0)
    const [textInfo, setTextInfo] = useState("다른 사람들의 댓글도 읽어보니 저만큼 많은 사람들이 공감하고 있다는 게 느껴져요. 다른 사람들의 댓글도 읽어보니 저만큼 많은 사람들이 공감하고 있다는 게 느껴져요. 다른 사람들의 댓글도 읽어보니 저만큼 많은 사람들이 공감하고 있다는 게 느껴져요. 다른 사람들의 댓글도 읽어보니 저만큼 많은 사람들이 공감하고 있다는 게 느껴져요.");

    const [recommendView, setRecommendView] = useState({})
    const [recommendModal, setRecommendModal] = useState(false)

    const [relationView, setRelationView] = useState({})
    const [relationModal, setRelationModal] = useState(false)

    const leftBtnClick = () => {
        navigate(-1)
    }

    const loadInsaView = (idx) => {
        APIS.postData("/v1/inbox/insaView", {
            idx: idx
        })
            .then((result) => {
                console.log("::::\n", result.data.data)
                setViewData(result.data.data)
            }).catch(e => {
                navigate(-1)
                toast.error(e.response.data)
            })
    }

    useEffect(() => {
        if (location.state?.idx) {
            setViewId(location.state?.idx)
            loadInsaView(location.state?.idx)
        } else {
            navigate(-1)
        }
    }, [])

    return <Layout
        isHeader
        headerTitle="제출한 지원서"
        leftBtnClick={leftBtnClick}
    >
        <div className="content" style={{ padding: 0 }}>
            <TabMenu
                menuList={["인사평가", "추천서"]}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
            />
            {tabIndex == 0 && <div className="info" style={{ padding: 16 }}>
                {viewData?.insaList?.map(v => {
                    return <WriterCard
                        className={"mt-30"}
                        title="인사평가 작성자 정보"
                        infoList={[
                            { title: "이름", value: v?.creatorName },
                            { title: "전화번호", value: hpHypen(v?.creatorHp) },
                            { title: "직급", value: codeToText(v?.creatorWorkLevel) },
                            { title: "관계", value: v?.creatorRelation },
                        ]}
                        // onClick={() => { }}
                        onViewClick={() => {
                            setRelationView(v);
                            setRelationModal(true)
                            // navigate("/relation", { state: { info: v } })
                        }}
                    />
                })}
                {viewData?.insaList?.length > 0 ? <>
                    {viewData?.insaList[0]?.evalData?.map((v, i) => {
                        return <>
                            {i > 0 && <LineBox className="mt-40" />}

                            <div className={`title-18 ${i == 0 ? "mt-40" : "mt-20"}`}>
                                {v?.title}
                            </div>
                            <hr className="mt-16" />
                            {v?.child?.map((cv, ci) => {
                                return <>
                                    <p className={`title2 ${ci == 0 ? "mt-30" : "mt-50"}`}>{cv?.title}</p>
                                    <p className="info2-1 mt-8">{cv?.message}</p>
                                    <RadioRating
                                        className="mt-24"
                                        value={cv?.point}
                                        setValue={(v) => {
                                            cv.point = v
                                            console.log(v)
                                        }}
                                        disabled
                                    />
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
                    <RadioRating2
                        className="mt-24"
                        value={viewData?.insaList[0]?.pointFinal - 1}
                        disabled />

                    <textarea
                        className="input text-area disabled mt-20"
                        style={{
                            height: 280
                        }}
                        value={viewData?.insaList[0]?.comment}
                        maxLength={200}
                        placeholder=""
                        disabled
                    />
                    <div className="mt-14" style={{ textAlign: "end", color: "#6E7375" }}>{viewData?.insaList[0]?.comment?.length}/200</div>
                    <div className="mt-20"></div>
                </> : <>
                    <div className="insa-access-error mt-16">
                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 37 36" fill="none">
                            <path d="M18.5 18.3V13.1312M18.5 23.7C18.5 23.7 18.5073 23.7 18.512 23.7M30.5 18C30.5 24.6274 25.1274 30 18.5 30C11.8726 30 6.5 24.6274 6.5 18C6.5 11.3726 11.8726 6 18.5 6C25.1274 6 30.5 11.3726 30.5 18Z" stroke="#B6B6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p className="font-14 color-gray">인사 평가는 인사 담당자만</p>
                        <p className="font-14 color-gray">확인이 가능합니다.</p>
                    </div>
                </>}

            </div>}

            {tabIndex == 1 && <div className="info" style={{ padding: 16 }}>
                <div className="mt-30" style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20
                }} >
                    {viewData?.recommendList?.map((v, i) => {
                        return <WriterCard
                            type={"red"}
                            title="추천서 작성자 정보"
                            infoList={[
                                { title: "이름", value: v?.creatorName },
                                { title: "전화번호", value: hpHypen(v?.creatorHp) },
                                { title: "관계", value: v?.creatorRelation },
                            ]}
                            onClick={() => {
                                setRecommendView(v)
                                setRecommendModal(true)
                            }}
                            onViewClick={() => {
                                setRelationView(v);
                                setRelationModal(true)
                                // navigate("/relation", { state: { info: v } })
                            }}
                        />
                    })}

                    {/* <WriterCard
                        type={"red"}
                        title="추천서 작성자 정보"
                        infoList={[
                            { title: "이름", value: "이몽룡" },
                            { title: "전화번호", value: "010-6565-3232" },
                            { title: "관계", value: "동기" },
                        ]}
                        onClick={() => {
                            navigate("/recommend")
                        }}
                        onViewClick={() => {
                            navigate("/relation")
                        }}
                    />

                    <WriterCard
                        type={"red"}
                        title="추천서 작성자 정보"
                        infoList={[
                            { title: "이름", value: "방자" },
                            { title: "전화번호", value: "010-6565-3232" },
                            { title: "관계", value: "동료" },
                        ]}
                        onClick={() => {
                            navigate("/recommend")
                        }}
                        onViewClick={() => {
                            navigate("/relation")
                        }}
                    /> */}
                </div>
            </div>}

        </div>

        <ModalRelation
            open={relationModal}
            data={relationView}
            setOpen={setRelationModal}
        />

        <ModalRecommend
            open={recommendModal}
            data={recommendView}
            setOpen={setRecommendModal}
        />
    </Layout>;
}