import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import images from "../../libs/images"
import * as APIS from "../../utils/service"

import Layout from "../../layout/Layout";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Selector from "../../components/Selector";
import { toast, ToastContainer } from "react-toastify";
import AddrButton from "../../components/AddrButton";
import InputImage from "../../components/InputImage";
import InputImageMulti from "../../components/InputImageMulti";
import CheckBoxIOS from "../../components/CheckBoxIOS";
import consts from "../../libs/consts"
import InputPhone from "../../components/InputPhone";

export default function CompanyEdit(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const [step, setStep] = useState(0);

    const [comIdx, setComIdx] = useState(null)
    const [companyName, setCompanyName] = useState("")
    const [companyInfo, setCompanyInfo] = useState("")
    const [companyURL, setCompanyURL] = useState("")
    const [phone, setPhone] = useState("")
    const [sido, setSido] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [files, setFiles] = useState([])

    const [pubCheck, setPubCheck] = useState(true)
    const [connectCheck, setConnectCheck] = useState(false)
    const [modalOpen, setmodalOpen] = useState(false);

    const headerBackClick = () => {
        navigate(-1)
    }

    const nextClick = () => {
        // setmodalOpen(true)
        let sendData = {
            comId: comIdx,
            name: companyName,
            info: companyInfo,
            url: companyURL,
            tel: phone,
            sido: sido,
            addr1: address1,
            addr2: address2,
        }
        for (let i of [0, 1, 2]) {
            if (i == 0) {
                if (files[i]) {
                    sendData.photo1 = files[i]
                }
            } else if (i == 1) {
                if (files[i]) {
                    sendData.photo2 = files[i]
                }
            } else if (i == 2) {
                if (files[i]) {
                    sendData.photo3 = files[i]
                }
            }
        }
        console.log(sendData)
        // return
        APIS.postData("/v1/company/edit", sendData).then((result) => {
            setmodalOpen(true)
        }).catch(e => {
            toast.error(e.response.data)
        })
    }

    const modalConfirm = () => {
        navigate(-1)
    }

    const setCompanyData = (comData) => {
        setComIdx(comData.idx)
        setCompanyName(comData.name)
        setCompanyInfo(comData.info)
        setCompanyURL(comData.url)
        setPhone(comData.tel)
        setSido(comData.sido)
        setAddress1(comData.address1)
        setAddress2(comData.address2)
        let fileList = []
        for (let key in comData) {
            if (key.indexOf("photo") >= 0) {
                if (comData[key]) fileList.push(consts.s3url + comData[key])
            }
        }
        setFiles(fileList)
    }
    useEffect(() => {
        console.log("edit id card")
        if (location.state?.companyInfo) {
            setCompanyData(location.state.companyInfo)
        } else {
            toast.error("회사 정보를 가져올 수 없습니다.")
            navigate(-1)
        }
    }, [])

    return <Layout
        headerTitle={"회사정보 수정"}
        leftBtnClick={headerBackClick}
        isHeader
    >
        <div className="content">

            <p className={"title1 mt-24"}>회사명</p>
            <Input
                className="mt-20"
                value={companyName}
                setValue={setCompanyName}
                placeHolder="회사명을 입력해 주세요."
            />

            <p className="title1 mt-20 require ">회사소개</p>
            <textarea
                className="input mt-20"
                style={{
                    height: 144
                }}
                value={companyInfo}
                maxLength={2000}
                onChange={(e) => {
                    let value = e.target.value
                    setCompanyInfo(value)
                }}
                placeholder="등록할 회사에 대한 소개글을 작성해 주세요."
            />
            <div className="mt-14" style={{ textAlign: "end", color: "#6E7375" }}>{companyInfo.length}/2000</div>

            <p className="title1 mt-20">URL 입력</p>
            <Input
                className="mt-20"
                value={companyURL}
                setValue={setCompanyURL}
                placeHolder="링크 주소를 입력해 주세요."
            />

            <p className="title1 mt-20">휴대폰번호</p>
            {/* <Input
                className="mt-20"
                value={phone}
                setValue={setPhone}
                placeHolder="휴대폰 번호를 입력해 주세요."
            /> */}
            <InputPhone
                className="mt-20"
                value={phone}
                setValue={setPhone}
                placeHolder="휴대폰 번호를 입력해 주세요."
            />

            <p className="title1 mt-20">기본 주소</p>
            <AddrButton
                address={address1}
                onAddress={setAddress1}
                onSido={setSido}
            />

            <p className="title1 mt-20">상세 주소</p>
            <Input
                className="mt-20"
                value={address2}
                setValue={setAddress2}
                placeHolder="상세 주소를 입력해 주세요."
            />

            <p className="title1 mt-20">사진</p>
            <div className="mt-20" style={{ display: "flex" }}>
                <InputImageMulti
                    photoList={files}
                    onChange={setFiles}
                />
            </div>
            <Button className="mt-40" title={"완료"} onClick={nextClick} disabled={false} />
        </div>

        <Modal
            open={modalOpen}
            setOpen={setmodalOpen}
            title={"정보수정을 완료했습니다."}
            confirm="확인"
            onConfirm={modalConfirm}
        />
    </Layout >
}