import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { toast } from "react-toastify";

import Layout from "../../layout/Layout";
import images from "../../libs/images";
import Button from "../../components/Button";
import * as APIS from "../../utils/service"
import consts from "../../libs/consts"
import { useLoading } from "../../zustand/store";
import { hpHypen } from "../../utils/utils";

export default function CompanyInfo() {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const { setLoading } = useLoading();

    const [companyInfo, setCompanyInfo] = useState({});
    const [docInfo, setDocInfo] = useState({});

    const [level, setLevel] = useState(3);

    const [imgIndex, setImgIndex] = useState(0);
    const [more, setMore] = useState();


    const headerBackClick = () => {
        navigate(-1);
    }
    const editBtnClick = () => {
        navigate("/campanyEdit", {
            state: {
                companyInfo: companyInfo
            }
        })
    }

    const loadCompany = (idx) => {
        setLoading(true)
        APIS.postData("/v1/company/info", {
            comId: idx,
        }).then((result) => {
            setCompanyInfo(result.data.data)
            let comData = result.data.data;
            if (comData?.isAdmin) {
                setLevel(1)

            } else if (comData?.isStaff) {
                setLevel(2)
            } else {
                setLevel(3)
                checkDockFunc(idx);
            }
            setLoading(false)
        }).catch(e => {
            setLoading(false)
            navigate(-1)
            toast.error(e.response.data)
        })
    }

    const checkDockFunc = (idx) => {
        APIS.postData("/v1/company/myDocCheck", {
            comId: idx,
        }).then((result) => {
            console.log(result.data.data)
            setDocInfo(result.data.data)
        })
    }

    useEffect(() => {
        let companyIdx = Number(params.get("idx"))
        if (companyIdx) {
            loadCompany(companyIdx)
        } else {
            toast.error("회사정보를 가져올 수 없습니다.")
            navigate(-1);
        }

        // if (!isNaN(demoIndex)) {
        //     if (demoIndex < 10) {
        //         setLevel(1)
        //     } else if (demoIndex >= 10 && demoIndex < 20) {
        //         setLevel(2)
        //     } else {
        //         setLevel(3)
        //     }
        // } else {
        //     alert("잘못된 요청!")
        //     navigate(-1);
        // }
    }, [])

    return <Layout
        headerTitle="회사정보"
        leftBtnClick={headerBackClick}
        text={level == 1 ? "수정" : undefined}
        textClick={editBtnClick}
        isHeader
    >
        <div className="content" style={{ padding: 0 }}>
            <Swiper
                style={{
                    width: "100%",
                    aspectRatio: 1.6,
                }}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={(swiper) => {
                    setImgIndex(swiper.activeIndex)
                }}
                resistanceRatio={0}
            >
                {companyInfo?.photo1 && <SwiperSlide className="info-slide-item">
                    <img className="bg-img" src={consts.s3url + companyInfo?.photo1} alt="" />
                </SwiperSlide>}
                {companyInfo?.photo2 && <SwiperSlide className="info-slide-item">
                    <img className="bg-img" src={consts.s3url + companyInfo?.photo2} alt="" />
                </SwiperSlide>}
                {companyInfo?.photo3 && <SwiperSlide className="info-slide-item">
                    <img className="bg-img" src={consts.s3url + companyInfo?.photo3} alt="" />
                </SwiperSlide>}

                <div style={{
                    position: "absolute",
                    zIndex: 1,
                    width: "100%",
                    bottom: 0,
                    height: 68,
                    background: "linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.00) 100%)"
                }}></div>
                <div style={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    zIndex: 1,
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: 1,
                    color: "white",
                    padding: "6px 10px",
                    background: "#2C2C2CCC",
                    borderRadius: 8
                }}>{imgIndex + 1}/{Object.keys(companyInfo).filter(key => {
                    if (key.indexOf("photo") < 0) return false;
                    return companyInfo[key] != null
                }).length}</div>
            </Swiper>



            <div className="com-info-box">
                <p className="title-22">{companyInfo?.name}</p>

                <p className={"info-text mt-14" + (more ? " full" : "")} style={{ whiteSpace: "pre-wrap" }}>{companyInfo?.info}</p>

                <button className="mt-14" style={{ display: "flex", gap: 4 }} onClick={() => {
                    setMore(v => !v)
                }} >
                    <p className="info2">{more ? "숨기기" : "더보기"}</p>
                    <svg style={{
                        transform: more ? "rotate(180deg)" : "",
                    }} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 6.75L8.46967 11.014C8.76256 11.3287 9.23744 11.3287 9.53033 11.014L13.5 6.75" stroke="#767676" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                </button>
            </div>
            <div style={{ width: "100%", height: 12, background: "#F4F6F7" }} />
            <div className="com-info-box">
                <p className="title4 mt-8">Info</p>
                <div className="profile-info-box mt-22">
                    <div className="info-item slim">
                        <div className="t-box">
                            <img src={images.tag} alt="" />
                            <p className="info4">{companyInfo?.serial}</p>
                        </div>
                        <Button title="복사" type="smal gray" onClick={() => {
                            // window.navigator.clipboard.writeText(companyInfo?.serial);
                            let copyText = (companyInfo?.serial?.replace("#", ""))
                            window.navigator.clipboard.writeText(copyText);
                            toast.success("클립보드에 저장됨")
                        }} />
                    </div>
                    <div className="info-item slim">
                        <div className="t-box">
                            <img src={images.phone} alt="" />
                            <p className="info4">{hpHypen(companyInfo?.tel)}</p>
                        </div>
                    </div>

                    <div className="info-item slim">
                        <div className="t-box">
                            <img src={images.web} alt="" />
                            <p
                                className="info4 hand color-linkblue"
                                onClick={() => {
                                    window.open(companyInfo?.url)
                                }}
                            >
                                {companyInfo?.url}
                            </p>
                        </div>
                    </div>

                    <div className="info-item slim">
                        <div className="t-box" style={{
                            alignItems: "self-start",
                        }}>
                            <img src={images.marker_pin} alt="" />
                            <p className="info4">
                                {companyInfo?.address1} <br />
                                {companyInfo?.address2}
                            </p>
                        </div>
                    </div>

                </div>
                {(level === 3 || level === 1) && <div className="mt-64"></div>}
            </div>
        </div>

        {level === 1 && <div className="position-bot">
            <Button type="" title={"인사평가 양식보기"} onClick={() => {
                // navigate("/applicantInfo?idx=" + params.get("idx"))
                navigate("/document", { state: { comId: companyInfo?.idx } })
            }} />
        </div>}

        {level === 3 && <div className="position-bot">
            <Button type="red" title={"제출한 지원서 보기"} onClick={() => {
                // navigate("/applicantInfo?idx=" + params.get("idx"))
                navigate("/applicantInfo", {
                    state: {
                        idx: docInfo.idx
                    }
                })
            }} />
        </div>}
    </Layout>
}