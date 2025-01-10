import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import images from "../libs/images"
import * as APIS from "../utils/service"
import consts from "../libs/consts"

import Layout from "../layout/Layout";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Selector from "../components/Selector";
import Profile from "../components/Profile";
import ModalBottom from "../components/ModalBottom";
import CompanyCardItem from "../components/CompanyCardItem";
import { toast } from "react-toastify";

export default function SearchResultCompany() {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectCom, setSelectCom] = useState({});
    const [companyList, setCompanyList] = useState([]);
    const [confirmModal, setConfirmModal] = useState(false);

    const leftBtnClick = () => {
        navigate(-1)
    }

    // 링크 요청하기
    const linkFunc = () => {
        // console.log("🚀 ~ linkFunc ~ comId:", selectCom)
        APIS.postData("/v1/company/reqLink", {
            comId: selectCom.idx,
        }).then((result) => {
            toast.success("연결을 요청하였습니다.")
        }).catch(e => {
            toast.error(e.response.data)
        })

    }

    useEffect(() => {
        // console.log("search", location.state)
        if (location.state?.companyList) {
            setCompanyList(location.state?.companyList)
        } else {
            navigate(-1)
        }
    }, [])

    return <Layout
        headerTitle={"검색 결과"}
        leftBtnClick={leftBtnClick}
        isHeader
    >
        <div className="content" >
            <div className="flex-column gap-20">
                {companyList.map((v, i) => {
                    return <CompanyCardItem
                        index={i}
                        title={v?.name}
                        image={consts.s3url + v?.photo}
                        rank=""
                        onClick={() => {
                            // navigate("/campanyInfo?idx=11")
                            navigate("/submitInfo?idx=" + v?.idx)
                        }}
                        onOptionClick={(type) => {
                            if (type == "Submit") {
                                navigate("/submitInfo?idx=" + v?.idx)
                            } else if (type == "Link") {
                                setSelectCom(v)
                                setConfirmModal(true)
                            }
                        }}
                    />
                })}
            </div>
        </div>

        <Modal
            open={confirmModal}
            setOpen={setConfirmModal}
            type="error"
            title="링크를 요청하시겠습니까?"
            message={<>요청할 회사: <span style={{ fontSize: 16, fontWeight: 600, color: "#288CFF" }}>{selectCom?.name}</span></>}
            confirm="확인"
            onConfirm={() => {
                setConfirmModal(false)
                linkFunc();
            }}
            cancel="취소"
            onCancel={() => {
                setConfirmModal(false)
            }}
        />
    </Layout>
}