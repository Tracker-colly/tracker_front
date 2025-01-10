import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import moment from "moment";
import LineBox from "../../components/LineBox";
import images from "../../libs/images"
import CheckBox from "../../components/CheckBox";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import { InBoxItem, InBoxTab } from "./InBoxComponents";
import ModalRecommend from "../../components/ModalRecommend";
import ModalInsaConfirm from "../../components/ModalInsaConfirm";
import * as APIS from "../../utils/service"
import { useInbox, useLoading } from "../../zustand/store";
import { inboxMessage } from "../../libs/texts";
import { EmptyCard } from "../track/TrackComponents";
/**
 * 인박스 페이지
 * @returns 
 */
export default function InBox() {

    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const { setLoading } = useLoading();
    const { inboxTabIndex, setInboxTabIndex } = useInbox();

    const [adminList, setAdminList] = useState([]);
    const [basicList, setBasicList] = useState([]);
    const [selectItem, setSelectItem] = useState(null);

    const [recommendData, setRecommendData] = useState({})
    const [recommendModal, setRecommendModal] = useState(false);

    //인사평가 확인
    const [confirmModal, setConfirmModal] = useState(false);
    //추천 확인
    const [confirmModal2, setConfirmModal2] = useState(false);


    const homeBtnClick = () => {
        navigate("/home")
    }

    /**
     * inbox 아이템 클릭
     * @param {"eval"|"evalrecommend"|"submit"| "recommend" | "insa"} type 
     * @param {number} idx 
     */
    const memberItemClick = (type, value) => {
        setSelectItem(value)

        if (type == "1") {
            // ` 최고관리자가 추천서 제출을 요청하였으니 제출을 진행해 주세요.`
            navigate("/submitInfo?idx=" + value.itemId)
        } else if (type == "2") {
            // ` 최고관리자가 인사평가 제출을 요청하였으니 제출을 진행해 주세요.`
            navigate("/submitInfo?idx=" + value.itemId)
        } else if (type == "3") {
            // `님이 추천서 작성을 요청하였으니 작성을 진행해 주세요.`
            setConfirmModal2(true);
        } else if (type == "4") {
            // `님이 추천서 작성을 완료하였으니 확인해 보세요.`
            loadRecommend(value.itemId)
        } else if (type == "5") {
            // ` 최고관리자가 인사평가 작성을 완료하였으니 확인해 보세요.`
            toast.info("인사평가는 담당자만 확인할 수 있습니다.")
            // navigate("/applicantInfo?idx=")
        } else if (type == "6") {
            // `님이 인사평가 작성을 요청하였으니 작성을 진행해 주세요. `
            setConfirmModal(true);
        } else if (type == "7") {
            // `님이 추천서 제출을 완료하였으니 확인해 주세요.`
            navigate("/applicantInfo", {
                state: {
                    idx: value.itemId
                }
            })
        } else if (type == "8") {
            // `님이 인사평가 제출을 완료하였으니 확인해 주세요.`
            navigate("/applicantInfo", {
                state: {
                    idx: value.itemId
                }
            })
        }
        return
    }

    const loadRecommend = (idx) => {
        APIS.postData("/v1/inbox/recommendView", {
            idx: idx
        })
            .then((result) => {
                setRecommendData(result.data.data)
                setRecommendModal(true);
            }).catch(e => {
                toast.error(e.response.data)
            })
    }

    // 추천서 작성 동의
    const recommendStartFunc = () => {
        setConfirmModal2(false)
        navigate("/inboxEvalRecommed", {
            state: {
                itemId: selectItem?.itemId
            }
        })
    }

    // 인사평가 작성 동의
    const insaStartFunc = () => {
        setConfirmModal(false)
        navigate("/inBoxEval", {
            state: {
                itemId: selectItem?.itemId
            }
        })
    }

    /**
     * 리스트 가져오기
     * @param {"admin"|"basic"} type 
     */
    const loadInbox = (type) => {
        setLoading(true)

        if (type == "admin") {
            APIS.postData("/v1/inbox/admin", {})
                .then((result) => {
                    setLoading(false)
                    setAdminList(result.data?.data?.list)
                }).catch(e => {
                    setLoading(false)
                    toast.error(e.response.data)
                })
        } else if (type == "basic") {
            APIS.postData("/v1/inbox/basic", {})
                .then((result) => {
                    setLoading(false)
                    setBasicList(result.data?.data?.list)
                }).catch(e => {
                    setLoading(false)
                    toast.error(e.response.data)
                })
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (inboxTabIndex == 0) {
            loadInbox("admin");
        } else if (inboxTabIndex == 1) {
            loadInbox("basic");
        }
    }, [inboxTabIndex])

    return <Layout
        headerTitle="Inbox"
        searchClick={() => { }}
        bellClick={() => { }}
        homeClick={homeBtnClick}
        isHeader
        isNavi
    >
        <div className="content" style={{ padding: 0, background: "#F7F7FB" }}>
            <div style={{
                background: "#FFF", padding: "16px 15px"
            }}>
                <InBoxTab
                    list={["Administrator", "Applicant / Staff"]}
                    value={inboxTabIndex}
                    setValue={setInboxTabIndex}
                />
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                padding: 16,
                gap: 10
            }}>
                {inboxTabIndex === 0 && <>
                    {adminList.map(v => {
                        return <InBoxItem
                            type={v?.type}
                            title={v?.userName}
                            message={inboxMessage(v?.type, v?.userName)}
                            date={v?.createAt}
                            onClick={() => { memberItemClick(v?.type, v) }}
                        />
                    })}
                    {adminList?.length <= 0 && <EmptyCard title="Inbox 목록이 없습니다." />}
                </>}

                {inboxTabIndex === 1 && <>
                    {basicList.map(v => {
                        return <InBoxItem
                            type={v?.type}
                            title={[1, 2].includes(v?.type) ? v?.companyName : v?.userName}
                            message={inboxMessage(v?.type, [1, 2].includes(v?.type) ? v?.companyName + " " + v?.userName : v?.userName)}
                            date={v?.createAt}
                            onClick={() => { memberItemClick(v?.type, v) }}
                        />
                    })}
                    {basicList?.length <= 0 && <EmptyCard title="Inbox 목록이 없습니다." />}
                </>}
                <div className="mt-80"></div>
            </div>
        </div>

        <ModalRecommend
            open={recommendModal}
            data={recommendData}
            setOpen={setRecommendModal}
        />

        <ModalInsaConfirm
            title="인사평가"
            open={confirmModal}
            setOpen={setConfirmModal}
            isBackClose
            confirm="작성하기"
            onConfirm={insaStartFunc}
        />

        <ModalInsaConfirm
            title="추천서"
            open={confirmModal2}
            setOpen={setConfirmModal2}
            isBackClose
            confirm="작성하기"
            onConfirm={recommendStartFunc}
        />

    </Layout>
} 