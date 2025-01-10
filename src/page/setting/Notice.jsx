import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import ArcodianMenu from "../../components/ArcodionMenu";
import * as APIS from "../../utils/service"
import ReactQuill from "react-quill";

export default function Notice() {
    const navigate = useNavigate();

    const [noticeList, setNoticeList] = useState([]);

    const leftBtnClick = () => {
        navigate(-1)
    }

    const loadNotice = () => {
        APIS.postData("/v1/setting/notice", {}).then((result) => {
            setNoticeList(result.data.data)
        })
    }

    useEffect(() => {
        loadNotice();
    }, [])

    return <Layout
        headerTitle="공지사항"
        leftBtnClick={leftBtnClick}
        isHeader
    >
        <div className="content">
            <div style={{
                display: "flex",
                flexDirection: "column",
            }}>
                {noticeList.map((v, i) => {
                    return <ArcodianMenu title={v.title} >
                        <ReactQuill
                            className={""}
                            style={{
                                background: "#F7F7FB",
                            }}
                            value={v.text}
                            readOnly
                            theme="snow"

                            modules={{
                                toolbar: false
                            }}
                        />
                    </ArcodianMenu>
                })}
            </div>
        </div>
    </Layout >
}