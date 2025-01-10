import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

import images from "../libs/images"
import consts from "../libs/consts"
import * as APIS from "../utils/service"

import Layout from "../layout/Layout";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Selector from "../components/Selector";
import Profile from "../components/Profile";
import ModalBottom from "../components/ModalBottom";
import ModalBottomCheck from "../components/ModalBottomCheck";
import { toast } from "react-toastify";

export default function SearchResult() {
    const navigate = useNavigate();
    const location = useLocation();

    const [userInfo, setUserInfo] = useState({})

    const [requestModal, setrequestModal] = useState(false);
    const [errorModal, seterrorModal] = useState(false);

    const [evalRequest, setevalRequest] = useState(false);

    const [confirmModal, setConfirmModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        open: false,
        message: "",
        data: {}
    })

    const [insaCheck, setInsaCheck] = useState(false);
    const [recomCheck, setRecomCheck] = useState(false);

    const leftBtnClick = () => {
        navigate(-1)
    }

    // 인사평가자 체크
    const checkInsaFunc = () => {
        let sendData = {
            userId: userInfo.idx
        }

        APIS.postData("/v1/search/chekInsa", sendData)
            .then((result) => {
                let creatorInfo = result.data.data?.userInfo
                let comList = result.data.data?.companyList
                navigate("/requestInsa", {
                    state: {
                        userInfo: creatorInfo,
                        companyList: comList
                    }
                })
            }).catch(e => {
                showErrorModal();
            })
    }

    // 추천서 요청으로 이동
    const reqRecommendFunc = () => {
        navigate("/requestRecommend", {
            state: {
                userInfo: userInfo,
            }
        })
    }

    // 권한 에러 모달
    const showErrorModal = () => {
        seterrorModal(true)
    }

    // 서류 제출 요청 클릭
    const reqSubmit = (indexList) => {
        let message = ""
        if (indexList.length === 1) {
            if (indexList.includes(0)) {
                message = "인사평가 제출을 요청하시겠습니까?"
                setInsaCheck(true)
                setRecomCheck(false)
            }
            else {
                message = "추천서 제출을 요청하시겠습니까?"
                setInsaCheck(false)
                setRecomCheck(true)
            }
        } else {
            message = <>추천서 및 인사평가 제출을<br />요청하시겠습니까?</>
            setInsaCheck(true)
            setRecomCheck(true)
        }

        setModalInfo(info => {
            return {
                ...info,
                open: true,
                message: message,
            }
        })
    }

    // 서류 제출 요청 확인
    const reqSubmitFunc = () => {
        setModalInfo(info => {
            return { ...info, open: false }
        })

        let sendData = {
            userId: userInfo.idx,
            isInsa: insaCheck,
            isRecommend: recomCheck
        }
        // console.log("🚀 ~ reqSubmitFunc ~ sendData:", sendData)
        // return;
        APIS.postData("/v1/search/reqSubmit", sendData)
            .then((result) => {
                setConfirmModal(true);
            }).catch(e => {
                toast.error(e.response.data)
            })
    }

    useEffect(() => {
        if (location.state?.userInfo) {
            console.log("🚀 ~ useEffect ~ location.state?.userInfo:", location.state?.userInfo)
            setUserInfo(location.state?.userInfo)
        } else {
            navigate(-1)
        }
    }, [])

    return <Layout
        headerTitle={"검색 결과"}
        leftBtnClick={leftBtnClick}
        isHeader
    >
        <div className="content" >
            <div className="my-profile-box mt-35">
                <Profile value={consts.s3url + userInfo?.profile} disabled />
                <div className="info">
                    <p className="title3 al-center">{userInfo?.name}</p>
                    <p className="info3 al-center">({moment(userInfo?.birth).format("YYYY.MM.DD")} / {userInfo?.sex == 1 ? "남성" : "여성"})</p>
                </div>
            </div>

            <p className="title4 mt-48">Info</p>
            <div className="profile-info-box mt-16">
                <div className="info-item slim">
                    <div className="t-box">
                        <img src={images.mail} alt="" />
                        <p className="info4">{userInfo?.email}</p>
                    </div>
                </div>
                <div className="info-item slim">
                    <div className="t-box">
                        <img src={images.tag} alt="" />
                        <p className="info4">{userInfo?.serial}</p>
                    </div>
                </div>
            </div>

            <div
                style={{
                    flexGrow: 10,
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                    gap: 14
                }}
            >
                <Button type="blue" title="평가 작성 요청" onClick={() => {
                    setrequestModal(true)
                }} />
                <Button type="delete" title="평가 제출 요청" onClick={() => {
                    setevalRequest(true)
                }} />
            </div>
        </div>

        <Modal
            open={errorModal}
            setOpen={seterrorModal}
            type="error"
            title={<div className="al-center title-18">해당 멤버는 인사평가를 작성할<br />권한이 없습니다.</div>}
            cancel="닫기"
            onCancel={() => { seterrorModal(false) }}
        />

        <ModalBottom
            title={"작성 요청"}
            open={requestModal}
            setOpen={setrequestModal}
            listItem={[
                "인사평가 작성 요청",
                "추천서 작성 요청",
            ]}
            onListClick={(index) => {
                console.log("request item click", index)
                if (index === 0) {
                    checkInsaFunc()
                } else if (index === 1) {
                    reqRecommendFunc()
                }
            }}
        />

        <ModalBottomCheck
            title={"제출 요청"}
            open={evalRequest}
            setOpen={setevalRequest}
            listItem={[
                "인사평가 제출 요청",
                "추천서 제출 요청",
            ]}
            onConfirm={reqSubmit}
        />

        <Modal
            open={confirmModal}
            setOpen={setConfirmModal}
            type="success"
            title="제출 요청이 완료되었습니다!"
            message="제출이 완료되면 알림으로 알려드릴게요"
            confirm="메인으로"
            onConfirm={() => {
                setConfirmModal(false)
                navigate("/home", { replace: true });
            }}
        />

        <Modal
            open={modalInfo.open}
            type="info"
            setOpen={(v) => {
                setModalInfo(info => {
                    return { ...info, open: v }
                })
            }}
            title={modalInfo.message}
            confirm="네"
            onConfirm={reqSubmitFunc}
            cancel="아니오"
            onCancel={() => {
                setInsaCheck(false)
                setRecomCheck(false)
                setModalInfo(info => {
                    return { ...info, open: false }
                })
            }}
        />
    </Layout>
}