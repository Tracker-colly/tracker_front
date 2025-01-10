import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import * as APIS from "../../utils/service"
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

export default function Term() {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);

    const [title, settitle] = useState("약관");
    const [termData, setTermData] = useState({})

    const leftBtnClick = () => {
        navigate(-1)
    }

    const loadTermFunc = (type) => {
        APIS.postData("/v1/setting/term", {
            type: type
        }).then((result) => {
            setTermData(result.data.data);
        }).catch(e => {
            toast.error(e.response.data);
            navigate(-1);
        })
    }

    useEffect(() => {
        let idx = params.get("idx")
        if (idx == "1") {
            settitle("개인정보 처리방침")
            loadTermFunc(2)
        } else if (idx == "2") {
            settitle("서비스 이용약관")
            loadTermFunc(1)
        }
    }, [])

    return <Layout
        headerTitle={title}
        leftBtnClick={leftBtnClick}
        isHeader
    >
        <div className="content">
            <ReactQuill
                className={""}
                style={{ whiteSpace: "none" }}
                value={termData?.text}
                readOnly
                theme="snow"
                modules={{
                    toolbar: false,
                    clipboard: {
                        matchVisual: false
                    }
                }}

            />
        </div>
    </Layout>
}
