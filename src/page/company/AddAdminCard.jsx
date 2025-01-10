import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import InputPhone from "../../components/InputPhone";

export default function AddAdminCard(props) {
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [isNext, setIsNext] = useState(false);

    const [companyName, setCompanyName] = useState("")
    const [companyInfo, setCompanyInfo] = useState("")
    const [companyURL, setCompanyURL] = useState("")
    const [phone, setPhone] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [sido, setSido] = useState("")
    const [files, setFiles] = useState([])

    const [pubCheck, setPubCheck] = useState(true)
    const [connectCheck, setConnectCheck] = useState(false)
    const [modalOpen, setmodalOpen] = useState(false);

    const [makeInfo, setMakeInfo] = useState({});
    const headerBackClick = () => {
        navigate("/home")
    }

    // 라디오 설정으로 넘어가기
    const nextClick = () => {
        setStep(1);
    }

    // 최종등록
    const nextClick2 = () => {
        let sendData = {
            name: companyName,
            info: companyInfo,
            url: companyURL,
            tel: phone,
            sido: sido,
            addr1: address1,
            addr2: address2,
            share: pubCheck,
            link: connectCheck
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
        // console.log(sendData)
        // return
        APIS.postData("/v1/home/createCard", sendData).then((result) => {
            setMakeInfo(result.data.data)
            setmodalOpen(true)
        }).catch(e => {
            toast.error(e.response.data)
        })
    }

    const modalConfirm = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (
            companyName &&
            companyInfo &&
            companyURL &&
            phone &&
            address1 &&
            address2 &&
            sido &&
            files.length >= 1
        ) setIsNext(true);
        else setIsNext(false);

    }, [companyName, companyInfo, companyURL, phone, address1, address2, sido, files])

    return <Layout
        headerTitle={"Admin Card 추가"}
        leftBtnClick={headerBackClick}
        isHeader
    >
        {step === 0 && <div className="content">
            <p className="info1 mt-22">
                추가하실 Admin 카드의 정보를<br />
                입력해 주세요.
            </p>

            <p className={"title1 bold " + ("mt-40")}>회사명</p>
            <Input
                className="mt-20"
                value={companyName}
                setValue={setCompanyName}
                placeHolder="회사명을 입력해 주세요."
            />

            <p className="title1 bold mt-20 require ">회사 소개</p>
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

            <p className="title1 bold mt-20">URL 입력</p>
            <Input
                className="mt-20"
                value={companyURL}
                setValue={setCompanyURL}
                placeHolder="링크 주소를 입력해 주세요."
            />

            <p className="title1 bold mt-20">휴대폰번호</p>
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

            <p className="title1 bold mt-20">기본 주소</p>
            <AddrButton
                address={address1}
                onAddress={setAddress1}
                onSido={setSido}
            />

            <p className="title1 bold mt-20">상세 주소</p>
            <Input
                className="mt-20"
                value={address2}
                setValue={setAddress2}
                placeHolder="상세 주소를 입력해 주세요."
            />

            <p className="title1 bold mt-20">사진</p>
            <div className="mt-20" style={{ display: "flex" }}>
                <InputImageMulti
                    photoList={files}
                    onChange={setFiles}
                />
            </div>
            <Button className="mt-40" title={"다음"} onClick={nextClick} disabled={!isNext} />
        </div>}

        {step === 1 && <div className="content">
            <div>
                <div className="mt-24" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div className="title2">공개 설정</div>
                        <CheckBoxIOS value={pubCheck} setValue={setPubCheck} />
                    </div>
                    <div className="info2">
                        Workplace Card를 공개할지의 여부를
                        설정하는 기능입니다.
                    </div>

                </div>
                <div className="mt-24" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div className="title2">연결 요청 설정</div>
                        <CheckBoxIOS value={connectCheck} setValue={setConnectCheck} />
                    </div>
                    <div className="info2">
                        멤버 연결 요청을 받을지의 여부를 설정
                        해주는 기능입니다.
                    </div>
                </div>
            </div>
            <Button style={{
                position: "absolute",
                width: "calc(100% - 32px)",
                bottom: 20,
            }} className="mt-40" title={"완료"} onClick={nextClick2} disabled={false} />
        </div>}

        <Modal
            open={modalOpen}
            setOpen={setmodalOpen}
            title={"카드 등록을 완료하였습니다"}
            message={<>
                회사 코드: {makeInfo?.serial}<br />
                <div className="mt-10" style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#416BFF", fontSize: 16, cursor: "pointer"
                }}
                    onClick={() => {
                        let copyText = (makeInfo?.serial?.replace("#", ""))
                        window.navigator.clipboard.writeText(copyText);
                        toast.success("클립보드에 저장됨")
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M7.09086 14.9H7C5.61929 14.9 4.5 13.7807 4.5 12.4V7C4.5 5.61929 5.61929 4.5 7 4.5H12.4C13.7807 4.5 14.9 5.61929 14.9 7V7.06184M12.6 20.5H18C19.3807 20.5 20.5 19.3807 20.5 18V12.6C20.5 11.2193 19.3807 10.1 18 10.1H12.6C11.2193 10.1 10.1 11.2193 10.1 12.6V18C10.1 19.3807 11.2193 20.5 12.6 20.5Z" stroke="#416BFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    복사하기
                </div>
            </>}
            confirm="홈으로"
            onConfirm={modalConfirm}
        />
    </Layout >
}