import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as APIS from "../utils/service"

import Layout from "../layout/Layout";
import { elapsedTime } from "../utils/utils";
import { useLoading } from "../zustand/store";
import { EmptyCard } from "./track/TrackComponents";

export default function Alarm() {
    const navigate = useNavigate();
    const { setLoading } = useLoading();
    const [alarmList, setAlarmList] = useState([]);

    const leftBtnClick = () => {
        navigate(-1);
    }

    // 타입별 스트링
    const typeToStr = (type, text = "") => {
        let result = {
            type: "공지사항",
            message: "새로운 공지사항이 등록되었습니다."
        }

        if (type == 1) {
            result = {
                type: "공지사항",
                message: "새로운 공지사항이 등록되었습니다."
            }
        }
        else if (type == 2) {
            result = {
                type: "문의내용",
                message: "문의하신 내용에 대한 답글이 달렸습니다."
            }
        }
        else if (type == 3) {
            result = {
                type: "링크수락",
                message: "요청하신 링크가 수락되었습니다."
            }
        }
        else if (type == 4) {
            result = {
                type: "링크거절",
                message: "요청하신 링크가 거절되었습니다."
            }
        }
        else if (type == 5) {
            result = {
                type: "작성요청",
                message: "추천서 제출 요청이 있습니다."
            }
        }
        else if (type == 6) {
            result = {
                type: "제출요청",
                message: "인사평가 및 추천서 제출 요청이 있습니다."
            }
        }
        else if (type == 7) {
            result = {
                type: "링크요청",
                message: text + "님이 링크연결 요청을 하였습니다."
            }
        }

        return result
    }

    const itemClick = (type) => {
        if (type == 1) {
            navigate("/setting")
        }
        else if (type == 2) {
            navigate("/setting")
        }
        else if (type == 3) {
            navigate("/home")
        }
        else if (type == 4) {
            navigate("/home")
        }
        else if (type == 5) {
            navigate("/inbox")
        }
        else if (type == 6) {
            navigate("/inbox")
        }
        else if (type == 7) {
            navigate("/home")
        }
    }

    //알림정보 가져오기
    const loadAlarm = () => {
        setLoading(true)
        APIS.postData("/v1/user/alarm", {})
            .then((result) => {
                setLoading(false)
                setAlarmList(result.data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        loadAlarm();
    }, [])

    return <Layout
        headerTitle={"알림"}
        leftBtnClick={leftBtnClick}
        isHeader
    >
        <div className="content" style={{ padding: 0 }}>
            <div
                className="mt-20"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16
                }}>
                {alarmList.map(v => {
                    return <AlarmItem
                        title={typeToStr(v?.type).type}
                        message={typeToStr(v?.type, v?.userName).message}
                        date={v.createAt}
                        onClick={() => {
                            itemClick(v?.type)
                        }} />
                })}
                {alarmList.length <= 0 && <div style={{ padding: "0px 16px" }}>
                    <EmptyCard style title="알림 목록이 없습니다." />
                </div>}

                {/* <AlarmItem title="작성완료" message="요청하신 인사평가 및 추천서 작성이 완료되었습니다." date={Date.now() - 1260000} onClick={() => {
                    navigate("/track")
                }} />
                <AlarmItem title="문의내용" message="문의하신 내용에 대한 답글이 달렸습니다." date={Date.now() - 7200000} onClick={() => {
                    navigate("/setting")
                }} />
                <AlarmItem title="링크요청" message="트랙커콜리로부터 링크 연결이 완료되었습니다." date={Date.now() - 57200000} onClick={() => {
                    navigate("/home")
                }} />
                <AlarmItem title="링크요청" message="케빗(으)로부터 링크 연결이 완료되었습니다." date={Date.now() - 2057200000} onClick={() => {
                    navigate("/home")
                }} /> */}
            </div>
        </div>
    </Layout>
}

const AlarmItem = (props) => {

    const {
        title = "",
        message = "",
        date = "",
        onClick = () => { }
    } = props;

    return <div
        style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: "10px 16px 26px 16px",
            borderBottom: "1px solid #E6E9EB",
            cursor: "pointer"
        }}
        onClick={onClick}
    >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p className="font-14 color-success bold">{title}</p>
            <p className="font-12 color-gray">{elapsedTime(date)}</p>
        </div>
        <p className="font-14" style={{ lineHeight: 1.55 }}>{message}</p>
    </div>
}