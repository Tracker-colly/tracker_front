import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import images from "../../libs/images"
import Layout from "../../layout/Layout";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import * as APIS from "../../utils/service"
import consts from "../../libs/consts"
import { defaultProfile } from "../../utils/utils";
import { useLoading } from "../../zustand/store";

const LinkItem = (props) => {
    const {
        name,
        profile,
        okClick,
        noClick,
    } = props

    return <div className="flex-between">
        <div className="member-item-box">
            <img className="thumb" src={consts.s3url + profile} alt="" onError={defaultProfile} />
            <div className="info">
                <div className="title1">{name}</div>
            </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Button type="auth ok" title="수락" onClick={() => {
                if (okClick) okClick();
            }} disabled={false} />
            <Button type="auth no" title="거절" onClick={() => {
                if (noClick) noClick();
            }} disabled={false} />
        </div>
    </div>
}

export default function CompanyLink() {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);

    const { setLoading } = useLoading();

    const [comId, setComId] = useState(null);
    const [linkList, setLinkList] = useState([]);
    const [linkData, setLinkData] = useState(null);

    const [modalInfo, setModalInfo] = useState({
        open: false,
        message: "",
        type: "",
        data: {}
    })

    const headerBackClick = () => {
        navigate(-1);
    }



    // 확인팝업 수락
    const linkConfirmFunc = () => {
        console.log(modalInfo)
        if (modalInfo.type == "link") {
            // 특정회원 링크
            addLinkFunc([linkData.userId])
        } else if (modalInfo.type == "unLink") {
            // 특정회원 거절
            delLinkFunc([linkData.userId])
        } else if (modalInfo.type == "allLink") {
            // 전체 수락
            addLinkFunc(linkList.map(v => v.userId))
        } else if (modalInfo.type == "allUnLink") {
            // 전체 거절
            delLinkFunc(linkList.map(v => v.userId))
        }

        setModalInfo(info => {
            return { ...info, open: false }
        })
    }

    //전체 수락 클릭
    const allOkClick = () => {
        // toast.success("전체 수락 완료")
        setModalInfo(info => {
            return {
                ...info,
                type: "allLink",
                open: true,
                message: <>연결 요청을 전체 수락<br /> 하시겠습니까?</>
            }
        })
    }

    //전체 거절 클릭
    const allNoClick = () => {
        // toast.error("전체 거절 완료")
        setModalInfo(info => {
            return {
                ...info,
                type: "allUnLink",
                open: true,
                message: <>연결 요청을 전체 거절<br /> 하시겠습니까?</>
            }
        })
    }

    const addLinkFunc = (userIds) => {
        if (userIds.length <= 0) {
            toast.error("링크유저 정보가 없습니다.")
            return
        }

        APIS.postData("/v1/company/addLink", {
            comId: comId,
            userIds: userIds
        }).then((result) => {
            loadLinkList(comId);
        }).catch(e => {
            toast.error(e.response.data)
        })
    }

    const delLinkFunc = (userIds) => {
        if (userIds.length <= 0) {
            toast.error("링크유저 정보가 없습니다.")
            return
        }

        APIS.postData("/v1/company/delLink", {
            comId: comId,
            userIds: userIds
        }).then((result) => {
            loadLinkList(comId)
        }).catch(e => {
            toast.error(e.response.data)
        })
    }

    const loadLinkList = (idx) => {
        setLoading(true)
        APIS.postData("/v1/company/linkList", {
            comId: idx,
        }).then((result) => {
            setLoading(false)
            let links = result.data.data.list;
            setLinkList(links)
        }).catch(e => {
            setLoading(false)
            toast.error(e.response.data)
            navigate("/home", { replace: true })
        })
    }

    useEffect(() => {
        let comidx = Number(params.get("idx"))
        if (!isNaN(comidx)) {
            setComId(comidx)
            loadLinkList(comidx)
        } else {
            toast.error("멤버 정보를 확인할 수 없습니다.")
            navigate(-1);
        }
    }, [])

    return <Layout
        isHeader
        headerTitle="링크"
        leftBtnClick={headerBackClick}
    >
        <div className="content">
            <div style={{
                display: "flex",
                gap: 28,
                flexDirection: "column"
            }}>
                {linkList.map((v) => {
                    return <LinkItem
                        name={v?.userName}
                        profile={v?.userProfile}
                        okClick={() => {
                            // toast.success(v + " 수락")
                            setLinkData(v)
                            setModalInfo(info => {
                                return {
                                    ...info,
                                    type: "link",
                                    open: true,
                                    message: v.userName + "님을 연결하시겠습니까?"
                                }
                            })
                        }}
                        noClick={() => {
                            // toast.error(v + " 거절")
                            setLinkData(v)
                            setModalInfo(info => {
                                return {
                                    ...info,
                                    type: "unLink",
                                    open: true,
                                    message: v.userName + "님을 거절하시겠습니까?"
                                }
                            })
                        }} />
                })}
                {linkList.length == 0 && <div className="insa-access-error">
                    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 37 36" fill="none">
                        <path d="M18.5 18.3V13.1312M18.5 23.7C18.5 23.7 18.5073 23.7 18.512 23.7M30.5 18C30.5 24.6274 25.1274 30 18.5 30C11.8726 30 6.5 24.6274 6.5 18C6.5 11.3726 11.8726 6 18.5 6C25.1274 6 30.5 11.3726 30.5 18Z" stroke="#B6B6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p className="font-14 color-gray">요청 목록이 없습니다.</p>
                </div>}
            </div>
        </div>

        <div className="position-bot">
            <Button
                type="green"
                title="전체 수락"
                onClick={allOkClick}
                disabled={linkList.length == 0}
            />
            <Button
                type="gray"
                title="전체 거절"
                onClick={allNoClick}
                disabled={linkList.length == 0}
            />
        </div>

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
            onConfirm={linkConfirmFunc}
            cancel="아니오"
            onCancel={() => {
                setModalInfo(info => {
                    return { ...info, open: false }
                })
            }}
        />
    </Layout >
}