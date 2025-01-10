import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import moment from "moment";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as APIS from "../../utils/service"
import { toast } from "react-toastify";
import { EmptyCard } from "../track/TrackComponents";

// 문의 페이지
export default function MyQuestion() {
    const navigate = useNavigate();

    const [reportList, setReportList] = useState([]);
    const [isAdd, setIsAdd] = useState(false)

    const leftBtnClick = () => {
        navigate(-1)
    }

    const textClick = () => {
        setIsAdd(true)
    }

    const itemClick = (value) => {
        navigate("/myQuestionInfo", {
            state: { info: value }
        });
    }

    // 데이터 불러오기
    const loadReport = () => {
        APIS.postData("/v1/setting/report", {}).then((result) => {
            setReportList(result.data.data)
        })
    }

    // 등록
    const addReportFunc = ({ title, info }) => {
        APIS.postData("/v1/setting/addReport", {
            title,
            info
        }).then((result) => {
            loadReport();
        }).catch(e => {
            toast.error("등록에 실패했습니다.")
        })
    }

    useEffect(() => {
        loadReport()
    }, [])
    return <Layout
        headerTitle="나의 문의"
        leftBtnClick={leftBtnClick}
        text={"문의하기"}
        textClick={textClick}
        isHeader
    >
        <div className="content">
            <div style={{
                display: "flex",
                flexDirection: "column",
            }}>
                {reportList?.map(v => {
                    return <QuestionItem
                        title={v.title}
                        date={v.createAt}
                        complate={v.answer}
                        onClick={() => { itemClick(v) }}
                    />
                })}
                {reportList?.length <= 0 &&
                    <EmptyCard title="문의 내역이 없습니다." />}
            </div>
        </div>

        <QuestionAdd open={isAdd} setOpen={setIsAdd} onConfirm={addReportFunc} />
    </Layout>
}

const QuestionItem = (props) => {
    const {
        title = "",
        date = "",
        complate = false,
        onClick = () => { }
    } = props;
    return <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "22px 0px",
            borderBottom: "1px solid #E6E9EB",
            cursor: "pointer"
        }}
        onClick={onClick}
    >
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 9,
        }}>
            {complate && <p style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.55, color: "#04B014" }}>답변완료 </p>}
            <p style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.55 }}>
                {title}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: "#767676" }}>{moment(date).format("YYYY.MM.DD")}</p>
        </div>
        <div style={{ flexShrink: 0 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M9 18.5L14.6854 13.2071C15.1049 12.8166 15.1049 12.1834 14.6854 11.7929L9 6.5" stroke="#131214" stroke-width="1.5" stroke-linecap="round" />
            </svg>
        </div>
    </div>
}

const QuestionAdd = (props) => {
    const {
        onConfirm = () => { },
        open = false,
        setOpen,
        isBackClose = true
    } = props

    const [visible, setVisible] = useState(false)

    const [title, setTitle] = useState("");
    const [info, setInfo] = useState("");

    const conrimClick = () => {
        if (!title) {
            toast.error("문의 제목을 입력해주세요.")
            return;
        } else if (!info) {
            toast.error("문의 내용을 입력해주세요.")
            return;
        }

        if (setOpen) setOpen(false);
        onConfirm({
            title: title,
            info: info,
        })
    }

    useEffect(() => {
        setVisible(open)

        if (open) {
            setTitle("")
            setInfo("")
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

    }, [open])

    return <div className={`modal-area ${visible ? "" : "hide"}`}>

        {/* <div className="modal-bg" onClick={() => {
        
    }} /> */}
        <div className={`modal-full-contents`}>
            <Header
                title={"문의하기"}
                leftBtnClick={() => {
                    if (setOpen) setOpen(false);
                }}
            />
            <div style={{ padding: "0px 16px" }}>
                <Input
                    className="mt-16"
                    value={title}
                    setValue={setTitle}
                    placeHolder="문의 제목"
                />

                <textarea
                    className="input text-area mt-20"
                    style={{
                        height: 280
                    }}
                    value={info}
                    onChange={(e) => {
                        setInfo(e.target.value)
                    }}
                    maxLength={2000}
                    placeholder="문의 내용을 작성해주세요."
                />
                <div className="mt-14" style={{ textAlign: "end", color: "#6E7375" }}>{info.length}/2000</div>

                <div className="mt-40"></div>
            </div>

            <div className="position-bot">
                <Button
                    title={"완료"}
                    onClick={conrimClick}
                />
            </div>
        </div>
    </div>
}