import react, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Layout from "../../layout/Layout";
import AdminCardItem from "../../components/AdminCardItem";
import * as APIS from "../../utils/service"

export default function AdminCards() {
    const navigate = useNavigate();

    const [companyList, setCompanyList] = useState([]);

    const headerBackClick = () => {
        navigate("/home")
    }

    const headerSearchClick = () => { }

    const loadCardList = () => {
        APIS.postData("/v1/home/cardList", {
            type: 1,
        }).then((result) => {
            setCompanyList(result.data.data)
        }).catch(e => {
            toast.error(e.response.data)
        })
    }

    useEffect(() => {
        loadCardList();
    }, [])

    return <Layout
        isHeader
        headerTitle="Admin card"
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
                    return <AdminCardItem
                        index={i}
                        img={v.photo1}
                        title={v.name}
                        rank={v.levelName}
                        onClick={() => {
                            navigate("/campanyInfo?idx=" + v.idx)
                        }}
                        onOptionClick={(type) => {
                            console.log(type)
                            if (type === "Link") {
                                navigate("/companyLink?idx=" + v.idx)
                            } else if (type === "Member") {
                                navigate("/companyMember?idx=" + v.idx)
                            } else if (type === "Setting") {
                                navigate("/companySetting?idx=" + v.idx)
                            }
                        }} />
                })}
            </div>
        </div>
    </Layout>
}