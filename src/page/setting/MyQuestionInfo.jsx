import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import moment from "moment";
import { toast } from "react-toastify";
import { EmptyCard } from "../track/TrackComponents";

export default function MyQuestionInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(window.location.search);

    const [info, setInfo] = useState({});
    const [complate, setcomplate] = useState(false);

    const leftBtnClick = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (location.state?.info) {
            setInfo(location.state?.info)
            if (location.state?.info?.answer) {
                setcomplate(true);
            } else {
                setcomplate(false);
            }
        } else {
            toast.error("문의정보를 확인할 수 없습니다.")
            navigate(-1)
        }
    }, [])

    return <Layout
        headerTitle="문의"
        leftBtnClick={leftBtnClick}
        isHeader
    >
        <div className="content">
            <p className="font-16 bold-500 mt-22">{info?.title}</p>
            <p className="font-14 color-gray mt-6">{moment(info?.createAt).format("YYYY.MM.DD")}</p>
            <div className="font-14 mt-20" style={{ lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                {info?.text}
            </div>
            {complate ? <>
                <hr className="mt-30" />
                <p className="font-16 bold-500 color-success mt-30">답변완료</p>
                <p className="font-16 bold mt-12">{info?.answer?.substring(0, 10) + "..."}</p>
                <p className="font-14 color-gray mt-6">{moment(info?.answerAt).format("YYYY.MM.DD")}</p>
                <div className="font-14 mt-20" style={{ lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                    {info?.answer}
                </div>
            </> : <>
                <hr className="mt-30" />
                <EmptyCard className="mt-16" title="답변이 없습니다." />
            </>}

        </div>
    </Layout>
}
