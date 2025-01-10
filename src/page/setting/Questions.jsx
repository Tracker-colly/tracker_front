import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import ArcodianMenu from "../../components/ArcodionMenu";
import * as APIS from "../../utils/service"

export default function Questions() {
    const navigate = useNavigate();

    const [faqList, setfaqList] = useState([]);

    const leftBtnClick = () => {
        navigate(-1)
    }

    const loadFAQ = () => {
        APIS.postData("/v1/setting/faq", {}).then((result) => {
            setfaqList(result.data.data)
        })
    }

    useEffect(() => {
        loadFAQ();
    }, [])

    return <Layout
        headerTitle="FAQ"
        leftBtnClick={leftBtnClick}
        isHeader
    >
        <div className="content">
            <div style={{
                display: "flex",
                flexDirection: "column",
            }}>
                {faqList.map((v, i) => {
                    return <ArcodianMenu
                        beforeComponet={<p className="title-18">Q.</p>}
                        title={v.title}
                    >
                        <div style={{
                            background: "#F7F7FB",
                            padding: 20,
                            fontSize: 14,
                            color: "#505050",
                            whiteSpace: "pre-wrap"
                        }} dangerouslySetInnerHTML={{ __html: v.text }}>
                        </div>
                    </ArcodianMenu>
                })}
            </div>
        </div>
    </Layout>
}