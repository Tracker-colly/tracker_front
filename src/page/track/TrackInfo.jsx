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
import { ChooCard, EmptyCard, InsaCard, ProfileCard } from "./TrackComponents";
import * as APIS from "../../utils/service"
import consts from "../../libs/consts"
import _ from "lodash";
import ModalRecommend from "../../components/ModalRecommend";
import { useLoading } from "../../zustand/store";

/**
 * 트랙 상세정보 페이지
 * @returns 
 */
export default function TrackInfo() {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const { setLoading } = useLoading();

    const [comId, setComId] = useState("")
    const [trackInfo, setTrackInfo] = useState({});
    const [isChooEdit, setIsChooEdit] = useState(false);

    const [isMember, setIsMember] = useState(false);

    const [delList, setDelList] = useState([]);
    const [delModal, setdelModal] = useState(false);

    const [recommendView, setRecommendView] = useState();
    const [recommendModal, setRecommendModal] = useState(false);

    const leftBtnClick = () => {
        navigate(-1);
    }

    //더보기 클릭
    const moreMemberClick = () => {
        console.log("moreMemberClick");
        navigate("/companyMember?idx=" + comId, { state: { isView: true } });
    }

    // 추천서 편집 클릭
    const editClick = () => {
        if (isChooEdit) {
            setIsChooEdit(false);
        } else {
            setIsChooEdit(true);
            setDelList([]);
        }
    }

    // 추천서 편집 체크박스 클릭
    const editCheck = (idx, checked) => {
        setDelList(v => {
            if (checked) {
                v.push(idx)
            } else {
                let idIndex = v.indexOf(idx)
                v.splice(idIndex, 1);
            }
            return [...v]
        })
    }
    // 추천서 삭제 확인
    const delModalConfirm = () => {
        setdelModal(false)
        setIsChooEdit(false);
        setLoading(true)
        APIS.postData("/v1/track/delRecommend", { recommendIds: delList })
            .then((result) => {
                loadTrackInfo(comId)
                toast.success("추천서 삭제가 완료되었습니다.")
                setLoading(false)
            }).catch(e => {
                loadTrackInfo(comId)
                toast.error(e.response.data)
                setLoading(false)
            })
    }

    //추천서 보기
    const viewClick = (value) => {
        setRecommendView(value)
        setRecommendModal(true)
    }

    // 내프로필 앞으로 옴기기
    const moveMyProfile = (array) => {
        return array.filter((x) => x.isMy).concat(array.filter((x) => !x.isMy));
    }

    const loadTrackInfo = (idx) => {
        setLoading(true)
        APIS.postData("/v1/track/info", { comId: idx })
            .then((result) => {
                let trackData = result.data.data
                if (trackData?.members?.length > 0) {
                    setIsMember(true);
                    trackData.members = moveMyProfile(trackData?.members)
                }
                setTrackInfo(trackData)
                setLoading(false)
            }).catch(e => {
                setLoading(false)
                toast.error(e.response.data)
                navigate("/track", { replace: true })
            })
    }

    useEffect(() => {
        let idx = params.get("idx")
        if (idx) {
            setComId(idx)
            loadTrackInfo(idx)
        } else {
            toast.error("잘못된 요청입니다.")
            navigate("/track", { replace: true })
        }
    }, [])

    return <Layout
        headerTitle="상세정보"
        leftBtnClick={leftBtnClick}
        isHeader
    >
        <div className="content">
            <div className="mt-16">
                <p className="title-18">{trackInfo?.info?.companyName}</p>
                <p className="mt-12" style={{ fontSize: 15 }}>
                    <span className="bold font-15">근무년도</span> {moment(trackInfo?.info?.startTime).format("YYYY.MM.DD")} ~ {trackInfo?.info?.endTime ?
                        moment(trackInfo?.info?.endTime).format("YYYY.MM.DD") :
                        <span style={{ color: "#04B014", fontWeight: 500, fontSize: 15 }}>현재 재직중</span>}
                </p>
                <p className="mt-12" style={{ fontSize: 15 }}>
                    <span className="bold font-15">직급</span> : {trackInfo?.info?.codeName}
                </p>
            </div>
            <LineBox className="mt-26" />

            {isMember ? <>
                <div
                    className="mt-26"
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                    <p className="title-20">멤버</p>
                    <button
                        style={{ width: 42, height: 24, color: "#37383C9C" }}
                        onClick={moreMemberClick}
                    >더보기</button>
                </div>

                <div
                    className="mt-20"
                    style={{ display: "flex", gap: 20, overflow: "auto" }}>
                    {trackInfo?.members?.map(v => {
                        return <ProfileCard img={consts.s3url + v.userProfile} name={v.isMy ? "나" : v.userName} />
                    })}
                </div>
            </> : <p className="title-18 mt-26">멤버 확인 권한이 없습니다</p>}

            <LineBox className="mt-26" />

            <div className="title-18 mt-26">나의 인사평가</div>
            <div className="info2-1 mt-12">인사평가는 인사 담당자만 확인이 가능합니다.</div>
            <div className="mt-20"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20
                }}
            >
                {trackInfo?.insa?.map(v => {
                    return <InsaCard
                        companyName={v.companyName} name={v.creatorName} lank={v.creatorLevelName} date={v.date}
                        onClick={() => { }}
                    />
                })}
                {trackInfo?.insa?.length <= 0 && <EmptyCard title="받은 인사평가가 없습니다" />}
            </div>

            <LineBox className="mt-26" />

            <div className="title-18 mt-26" style={{ display: "flex", justifyContent: "space-between" }}>
                받은 추천서
                {trackInfo?.recommends?.length > 0 && <>
                    {!isChooEdit ?
                        <button className="under-line font-16" onClick={editClick}>{"편집"}</button> :
                        <button className="under-line font-16 color-error" onClick={editClick}>{"취소"}</button>
                    }
                </>}
            </div>
            <div className="mt-20" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {trackInfo?.recommends?.map(v => {
                    return <ChooCard name={v.creatorName} lank={v.creatorRelation} isCheck={isChooEdit}
                        onCheck={check => { editCheck(v?.idx, check) }}
                        onClick={() => { viewClick(v) }}
                    />
                })}
                {trackInfo?.recommends?.length <= 0 && <EmptyCard title="받은 추천서가 없습니다." />}
            </div>

            <div className="mt-80" />
        </div>
        {isChooEdit && <div className="position-bot">
            <Button className="mt-28" type="red" title="삭제" disabled={delList.length === 0}
                onClick={() => { setdelModal(true) }}
            />
        </div>}

        <Modal
            open={delModal}
            setOpen={setdelModal}
            type="error"
            title={<div className="al-center title-18">삭제 시 복구 할 수 없습니다.<br /> 정말 삭제하시겠습니까?</div>}
            confirm="확인"
            onConfirm={delModalConfirm}
            cancel="아니오"
            onCancel={() => { setdelModal(false) }}
        />

        <ModalRecommend
            open={recommendModal}
            data={recommendView}
            setOpen={setRecommendModal}
        />
    </Layout>
}