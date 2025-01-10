import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import LineBox from "../../components/LineBox";
import images from "../../libs/images"
import moment from "moment";
import { useEffect, useState } from "react";
import * as APIS from "../../utils/service"
import consts from "../../libs/consts"
import { toast } from "react-toastify";
import { useLoading } from "../../zustand/store";

// 트랙 카드 컴포넌트
const TrackCard = (props) => {
    const {
        className,
        image,
        title = "TITLE",
        startDate,
        endDate,
        onClick
    } = props;
    return <div
        style={{
            width: "100%",
            cursor: "pointer"
        }}
        className={`${className ? className : ""}`}
        onClick={() => {
            if (onClick) onClick();
        }}
    >
        <img
            style={{
                width: "100%",
                aspectRatio: 1.86,
                borderRadius: 10
            }}
            src={image} alt="" />
        <div className="mt-24" style={{
            display: "flex", justifyContent: "space-between",
            padding: ""
        }}>
            <div >
                <p className="title-18" style={{ lineHeight: 1 }}>{title}</p>
                <p className="mt-12" style={{ fontSize: 15, lineHeight: 1 }}>
                    <span className="bold font-15">근무년도</span> {moment(startDate).format("YYYY.MM.DD")} ~ {endDate ? moment(endDate).format("YYYY.MM.DD") : <span style={{ color: "#04B014", fontWeight: 500, fontSize: 15 }}>현재 재직중</span>}
                </p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
                <path d="M1 14L6.68539 8.26603C7.10487 7.84296 7.10487 7.15704 6.68539 6.73397L1 1" stroke="#A7A7A7" stroke-width="1.5" stroke-linecap="round" />
            </svg>
        </div>
    </div>
}

// 트랙 페이지
export default function Track() {
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    const [trackInfo, setTrackInfo] = useState({ currentList: [], beforeList: [] });

    const homeBtnClick = () => {
        navigate("/home")
    }

    const cardClick = (idx) => {
        console.log("🚀 ~ cardClick ~ idx:", idx)
        navigate("/trackInfo?idx=" + idx)
    }

    useEffect(() => {
        setLoading(true)
        APIS.postData("/v1/track/list", {})
            .then((result) => {
                setTrackInfo(result.data.data)
                setLoading(false)
            }).catch(e => {
                setLoading(false)
                toast.error(e.response.data)
            })
    }, [])

    return <Layout
        isHeader
        headerTitle="트랙"
        isNavi
        homeClick={homeBtnClick}
        searchClick={() => { }}
        bellClick={() => { }}
    >
        <div className="content">
            {
                trackInfo?.currentList?.length > 0 && <>
                    <div className="title-18">현재 소속된 조직</div>
                    {trackInfo?.currentList?.map(v => {
                        return <TrackCard
                            className="mt-20"
                            image={consts.s3url + v.image}
                            title={v.name}
                            startDate={v.startTime}
                            // endDate="2024.02.03"
                            onClick={() => {
                                cardClick(v.comId)
                            }}
                        />
                    })}
                    <div className="mt-30" />
                </>
            }

            {trackInfo?.beforeList?.length > 0 && <>
                <LineBox />
                <div className="title-18 mt-35">이전에 소속된 조직</div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 40,
                }}>
                    {trackInfo?.beforeList?.map(v => {
                        return <TrackCard
                            className="mt-20"
                            image={consts.s3url + v.image}
                            title={v.name}
                            startDate={v.startTime}
                            endDate={v.endTime}
                            onClick={() => {
                                cardClick(v.comId)
                            }}
                        />
                    })}
                </div>
            </>}

            {(trackInfo?.currentList?.length == 0 && trackInfo?.beforeList?.length == 0) && <div
                style={{
                    marginTop: 180,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 18.3V13.1312M18 23.7C18 23.7 18.0073 23.7 18.012 23.7M30 18C30 24.6274 24.6274 30 18 30C11.3726 30 6 24.6274 6 18C6 11.3726 11.3726 6 18 6C24.6274 6 30 11.3726 30 18Z" stroke="#B6B6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p className="mt-8 color-light-gray">나의 트랙이</p>
                <p className="mt-4 color-light-gray">생성되지 않았습니다</p>
            </div>}

            <div className="mt-80" />
        </div>
    </Layout>
}