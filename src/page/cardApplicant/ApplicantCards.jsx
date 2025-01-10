import react, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Layout from "../../layout/Layout";
import AdminCardItem from "../../components/AdminCardItem";
import ApplicantCardItem from "../../components/ApplicantCardItem";
import * as APIS from "../../utils/service"
import { useLoading } from "../../zustand/store";

export default function ApplicantCards() {
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    const [companyList, setCompanyList] = useState([]);

    const headerBackClick = () => {
        navigate("/home")
    }

    const headerSearchClick = () => {

    }

    const loadCardList = () => {
        setLoading(true)
        APIS.postData("/v1/home/cardList", {
            type: 3,
        }).then((result) => {
            setLoading(false)
            setCompanyList(result.data.data)
        }).catch(e => {
            setLoading(false)
            toast.error(e.response.data)
        })
    }

    useEffect(() => {
        loadCardList()
    }, [])

    return <Layout
        isHeader
        headerTitle="Applicant Card"
        searchClick={headerSearchClick}
        leftBtnClick={headerBackClick}
    >
        <div className="content">
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 16
            }}>
                {companyList.map((v, i) => {
                    return <ApplicantCardItem
                        index={i}
                        img={v.photo1}
                        sendDate={v.sendDate}
                        isView={v.isView}
                        title={v.name}
                        onClick={() => {
                            navigate("/campanyInfo?idx=" + v.idx)
                        }} />
                })}
            </div>
        </div>
    </Layout>
}