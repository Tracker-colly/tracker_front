import react, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Layout from "../../layout/Layout";
import StaffCardItem from "../../components/StaffCardItem";
import * as APIS from "../../utils/service"

export default function StaffCards() {
    const navigate = useNavigate();

    const [companyList, setCompanyList] = useState([]);

    const headerBackClick = () => {
        navigate("/home")
    }

    const headerSearchClick = () => { }

    const loadCardList = () => {
        APIS.postData("/v1/home/cardList", {
            type: 2,
        }).then((result) => {
            let companyList = result.data.data
            if (companyList.length <= 0) {
                navigate(-1);
            } else {
                setCompanyList(result.data.data)
            }
        }).catch(e => {
            toast.error(e.response.data)
        })
    }

    useEffect(() => {
        loadCardList();
    }, [])

    return <Layout
        isHeader
        headerTitle="Staff Card"
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
                    return <StaffCardItem
                        index={i}
                        img={v.photo1}
                        title={v.name}
                        rank={v.levelName}
                        onClick={() => {
                            navigate("/campanyInfo?idx=" + v?.idx)
                        }}
                        onOptionClick={(type) => {
                            console.log(type)
                            if (type === "Member") {
                                navigate("/companyMember?idx=" + v?.idx)
                            }
                        }} />
                })}
            </div>
        </div>
    </Layout>
}