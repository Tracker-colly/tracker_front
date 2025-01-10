import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import images from "../libs/images"
import consts from "../libs/consts"
import * as APIS from "../utils/service"

import Layout from "../layout/Layout";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Selector from "../components/Selector";
import { toast, ToastContainer } from "react-toastify";
import ModalBottom from "../components/ModalBottom";
import IdCardItem from "../components/IdCardItem";
import { Footer } from "../components/Footer";
import { useConfig, useFooter, useLoading, usePopup, useUser } from "../zustand/store";
import { defaultProfile, isMobile } from "../utils/utils";
import { Tooltip } from "react-tooltip";
import ModalWelcom from "../components/ModalWelcom";
import ServiceInfo from "./Guide/ServiceInfo";

export default function IdCard() {
    const navigate = useNavigate();
    const { userInfo } = useUser();
    const { setLoading, isLoading } = useLoading();
    const { welcomOpen, serviceOpen, setWelcomOpen, setServiceOpen } = usePopup();

    const toolRef1 = useRef();
    const toolRef2 = useRef();
    const toolRef3 = useRef();

    const [mainInfo, setMainInfo] = useState(null);
    const [cardList, setCardList] = useState([])

    const [addModal, setAddModal] = useState(false);
    const [focusIndex, setFocusIndex] = useState(2)
    const [isInfo, setisInfo] = useState(true);

    const [activeIndex, setActiveIndex] = useState(9)

    const searchFunc = () => {
        console.log("search")
        // window.localStorage.setItem("token", "")
        // navigate("/")
    }
    const bellFunc = () => {
        console.log("bell")
    }

    const myInfoClick = () => {
        navigate("/myInfo")
    }

    const addClick = () => {
        setAddModal(true);
    };

    const addItemClick = (index) => {
        if (index === 0) {
            // 추가하기
            navigate("/addAdminCard");
        }
    }

    const cardItemClick = (type) => {
        let itemList = ["admin", "staff", "applicant"]

        if (type === "admin") {
            navigate("/adminCards")
        } else if (type === "staff") {
            navigate("/staffCard")
        } else if (type === "applicant") {
            navigate("/applicantCards")
        }
    }

    const loadMainInfo = () => {
        setLoading(true)
        APIS.postData("/v1/home/mainList").then((result) => {
            let mainData = result.data.data;
            let data = []
            if (mainData?.adminCard?.count) {
                data.push({
                    type: "admin",
                    count: mainData?.adminCard?.count,
                    profiles: mainData?.adminCard?.profiles
                })
            }
            if (mainData?.staffCard?.count) {
                data.push({
                    type: "staff",
                    count: mainData?.staffCard?.count,
                    profiles: mainData?.staffCard?.profiles
                })
            }
            if (mainData?.applicantCard?.count) {
                data.push({
                    type: "applicant",
                    count: mainData?.applicantCard?.count,
                    profiles: mainData?.applicantCard?.profiles
                })
            }

            setMainInfo(mainData)
            setCardList(data)
            setFocusIndex(data.length - 1)
            setTimeout(() => {
                setLoading(false);
            }, 10)
        }).catch(e => {
            setLoading(false)
        })
    }

    const tooltipEvent = () => {
        toolRef1.current?.open()
        toolRef2.current?.open()
        toolRef3.current?.open()

        setTimeout(() => {
            toolRef1.current?.close()
            toolRef2.current?.close()
            toolRef3.current?.close()
        }, 2000)
    }

    useEffect(() => {
        if (!isInfo) {
            window.scrollTo(0, 0)
        }
    }, [isInfo])

    useEffect(() => {
        loadMainInfo();
        // if (isMobile) {
        //     tooltipEvent();
        // } else {
        //     tooltipEvent();
        // }
    }, [])

    return <Layout
        headerTitle={"ID Card"}
        // leftBtnClick={() => { console.log("logo") }}
        searchClick={searchFunc}
        bellClick={bellFunc}
        addClick={addClick}
        isHeader
        isNavi
    >

        <div className="content" >
            <div
                className="my-info-card"
                onClick={myInfoClick}
            >
                <img className="profile" src={consts.s3url + userInfo?.profile} alt="" onError={defaultProfile} />
                <div className="info">
                    <div style={{ display: "flex", gap: 6 }}>
                        <p className="title2">{userInfo?.name}</p>
                        <p className="title2-1">{userInfo?.serial}</p>
                    </div>
                    <p className="info2">{userInfo?.email}</p>
                </div>
                <img style={{
                    position: "absolute",
                    width: 30,
                    height: 30,
                    top: "calc(50% - 15px)",
                    right: "12px",
                }} src={images.left_icon} alt="" />
            </div>

            <div className="workplace-box mt-20">
                {/* {["admin", "staff", "applicant"].map((v, i) => {
                    //top 을 순서대로 +100 씩 해줘야함
                    let top = [0, 99, 198]
                    let zindex = [1, 2, 3]

                    if (focusIndex == 0) {
                        top = [198, 0, 99]
                        zindex = [3, 1, 2]
                    } else if (focusIndex == 1) {
                        top = [0, 198, 99]
                        zindex = [1, 3, 2]
                    }

                    return <IdCardItem
                        style={{ top: top[i] }}
                        type={v}
                        onClick={() => {
                            if (focusIndex == i) {
                                cardItemClick(v);
                            } else {
                                setFocusIndex(i)
                            }
                        }}
                        memberList={[1, 2, 3, 4, 5, 6, 7]}
                        focusIndex={zindex[i]}
                    />
                })} */}
                {cardList.map((v, i) => {
                    //top 을 순서대로 +100 씩 해줘야함
                    let top = [0, 99, 198]
                    let animClass = [
                        "idcard-item-anim1",
                        "idcard-item-anim2",
                        "idcard-item-anim3",
                    ]
                    // let zindex = [1, 2, 3]

                    // if (cardList.length == 3) {
                    //     if (focusIndex == 0) {
                    //         top = [198, 0, 99]
                    //         zindex = [3, 1, 2]
                    //     } else if (focusIndex == 1) {
                    //         top = [0, 198, 99]
                    //         zindex = [1, 3, 2]
                    //     }
                    // } else if (cardList.length == 2) {
                    //     top = [0, 99]
                    //     zindex = [1, 2]

                    //     if (focusIndex == 0) {
                    //         top = [99, 0]
                    //         zindex = [2, 1]
                    //     } else if (focusIndex == 1) {
                    //         top = [0, 99]
                    //         zindex = [1, 2]
                    //     }
                    // }

                    return <IdCardItem
                        style={{ top: top[i] }}
                        animClass={animClass[i]}
                        type={v.type}
                        count={v.count}
                        onClick={() => {
                            setActiveIndex(i)
                            setTimeout(() => {
                                cardItemClick(v.type);
                            }, 700)
                            return;
                            if (focusIndex == i) {
                                cardItemClick(v.type);
                            } else {
                                setFocusIndex(i)
                            }
                        }}
                        // memberList={v.type == "applicant" ? v.profiles : []}
                        memberList={v.profiles}
                        active={i == activeIndex}
                        disabled={(i != activeIndex && activeIndex != 9)}
                    />
                })}
                {(cardList.length == 0 && !isLoading) && <div
                    style={{
                        marginTop: 180,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 19.0001L11.9875 23.9939C13.2544 24.6273 14.7456 24.6273 16.0125 23.9939L26 19.0001M2 13.0001L11.9875 17.9939C13.2544 18.6273 14.7456 18.6273 16.0125 17.9939L26 13.0001M2 7.0001L11.9875 2.00633C13.2544 1.37289 14.7456 1.37289 16.0125 2.00633L26 7.0001L16.0125 11.9939C14.7456 12.6273 13.2544 12.6273 11.9875 11.9939L2 7.0001Z" stroke="#B6B6B6" stroke-width="2.07692" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <p className="mt-8 color-light-gray">Workplace 카드를</p>
                    <p className="mt-4 color-light-gray">추가해 주세요</p>
                </div>}
            </div>

            <Footer />
        </div>

        <ModalWelcom name={userInfo?.name}
            onConfirm={() => {
                setServiceOpen(true)
            }}
            onCancle={() => {
                toolRef1.current?.open();
            }}
        />

        {serviceOpen && <ServiceInfo onConfirm={() => {
            setServiceOpen(false)
            window.scrollTo(0, 0);
            toolRef1.current?.open();
        }} />}

        <ModalBottom
            title={"카드 추가하기"}
            open={addModal}
            setOpen={setAddModal}
            listItem={["Administrator Card 추가"]}
            onListClick={addItemClick}
        />


        <Tooltip
            ref={toolRef1}
            id="search-tooltip"
            style={{
                zIndex: 10,
                borderRadius: 100,
                background: "#3A474E",
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "8px 8px"
            }}
            place="bottom-end"
            openEvents={["click"]}
            closeEvents={["mouseup"]}
            delayHide={20000}
            clickable={true}
        >
            <p className="font-13 bold color-white"><span className=" font-13 color-tooltip bold">지원자 혹은 회사를</span> 검색해 보세요</p>
            <img style={{ width: 15, height: 15 }} src={images.x_w} onClick={() => {
                toolRef1.current?.close();
                toolRef2.current?.open();
            }} />
        </Tooltip>

        <Tooltip
            ref={toolRef2}
            id="home-tooltip"
            style={{
                zIndex: 10,
                borderRadius: 100,
                background: "#3A474E",
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "8px 8px"
            }}
            place="top-start"
            openEvents={["click"]}
            closeEvents={["mouseup"]}
            delayHide={20000}
            clickable={true}
        >
            <p className="font-13 bold color-white"><span className=" font-13 color-tooltip bold">카드를</span> 추가해 보세요</p>
            <img style={{ width: 15, height: 15 }} src={images.x_w} onClick={() => {
                toolRef2.current?.close();
                toolRef3.current?.open();
            }} />
        </Tooltip>

        <Tooltip
            ref={toolRef3}
            id="guide-tooltip"
            style={{
                zIndex: 10,
                borderRadius: 100,
                backgroundColor: "#3A474EFF",
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "8px 10px"
            }}
            place="top-end"
            openEvents={["click"]}
            closeEvents={["mouseup"]}
            delayHide={20000}
            clickable={true}
        >
            <div>
                <p className="font-13 bold color-white">자세한 내용은 <span className=" font-13 color-tooltip bold">가이드</span>에서</p>
                <p className="font-13 bold color-white">확인할 수 있어요!</p>
            </div>
            <img style={{ width: 15, height: 15 }} src={images.x_w} onClick={() => {
                toolRef3.current?.close();
            }} />
        </Tooltip>
    </Layout>
}