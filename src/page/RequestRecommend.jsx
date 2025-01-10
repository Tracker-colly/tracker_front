import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../layout/Layout";
import Selector from "../components/Selector";
import LineBox from "../components/LineBox";
import Button from "../components/Button";
import RadioButton from "../components/RadioButton";
import { hpHypen, monthList, yearList } from "../utils/utils";
import CheckBox from "../components/CheckBox";
import Modal from "../components/Modal";
import ModalReqConfirm from "../components/ModalReqConfirm";
import Input from "../components/Input";
import FindCompany from "./search/FindCompany";
import DotTextBox from "../components/DotTextBox";
import { useConfig } from "../zustand/store";
import { toast } from "react-toastify";
import * as APIS from "../utils/service"

export default function RequestRecommend() {
    const navigate = useNavigate();
    const location = useLocation();
    const { config } = useConfig();

    const [creator, setCreator] = useState(null);
    const [isSearch, setIsSearch] = useState(false);
    const [company, setCompany] = useState("")

    const [startYear, setStartYear] = useState("")
    const [startMonth, setStartMonth] = useState("")
    const [endYear, setEndYear] = useState("")
    const [endMonth, setEndMonth] = useState("")
    const [check, setCheck] = useState(false)

    const [workType, setWorkType] = useState("")
    const [rank, setRank] = useState("")
    const [writerRank, setWriterRank] = useState("")

    const [checkModal, setCheckModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false)

    const [isNext, setIsNext] = useState(false)

    const leftBtnClick = () => {
        navigate(-1);
    }

    const searchClick = () => {
        setIsSearch(true)
    }

    const onNextClick = () => {
        setCheckModal(true)
    }

    const sendRecommendFunc = () => {
        console.log("🚀 ~ sendRecommendFunc ~ sendData.company:", company)
        let sendData = {
            comId: company?.idx,
            userId: creator?.idx,
            companyName: company?.name,
            startYear: startYear,
            startMonth: startMonth,
            endYear: endYear,
            endMonth: endMonth,
            workType: workType,
            workLevel: rank,
            creatorWorkLevel: writerRank
        };

        // console.log("🚀 ~ sendRecommendFunc ~ sendData:", sendData)
        setCheckModal(false)
        APIS.postData("/v1/search/reqRecommend", sendData)
            .then((result) => {
                setConfirmModal(true)
            }).catch(e => {
                toast.error(e.response.data)
            })
    }

    // 입력값 체크
    useEffect(() => {
        let confirm = true;
        if (company == "") confirm = false;
        if (startYear == "") confirm = false;
        if (startMonth == "") confirm = false;
        if (!check && endYear == "") confirm = false;
        if (!check && endMonth == "") confirm = false;

        if (workType == "") confirm = false;
        if (rank == "") confirm = false;
        if (writerRank == "") confirm = false;

        setIsNext(confirm);
    }, [startYear, startMonth, endYear, endMonth, check, workType, rank, writerRank])

    useEffect(() => {
        if (location.state?.userInfo) {
            console.log("🚀 ~ useEffect ~ location.state?.userInfo:", location.state?.userInfo)
            setCreator(location.state?.userInfo)
        } else {
            toast.error("작성자 정보를 확인할 수 없습니다.")
        }
    }, [])
    return <Layout
        leftBtnClick={leftBtnClick}
        headerTitle="추천서 작성 요청"
        isHeader
    >
        <div className="content">
            <p className="title-18">함께 근무했던 회사</p>
            <p className="title-15 mt-8 color-gray">작성자님과 함께 근무했던 회사는 어디인가요?</p>

            <Input
                className="mt-16"
                value={company?.name}
                placeHolder="회사/소속명 검색"
                disabled
            />

            <Button
                className="mt-18"
                title="검색"
                onClick={searchClick} />

            <DotTextBox
                className="mt-18"
                title="사업자등록증 및 네이버 검색 기준으로 정확한 명칭을 검색해 주세요."
                color="#2E81FF"
                size={15}
            />
            <div className="mt-30"></div>
            {company && <>
                <LineBox />

                <p className="title-18 mt-30">함께 근무한 기간</p>
                <p className="info3 mt-10">작성자님과 언제까지 함께 근무하셨나요?</p>
                <div className="flex-between mt-12" style={{ gap: 10 }}>
                    <Selector
                        options={yearList().reverse().map((v) => {
                            return { value: String(v), label: v + "년" }
                        })}
                        value={startYear}
                        setValue={(v) => {
                            if (endYear && Number(endYear) < Number(v)) {
                                setEndYear("")
                            }
                            setStartYear(v)
                        }}
                        placeholder="시작년도"
                    />
                    <Selector
                        options={monthList().map((v) => {
                            return { value: String(v), label: v + "월" }
                        })}
                        value={startMonth}
                        setValue={setStartMonth}
                        placeholder="월"
                    />
                </div>
                <div className="flex-between mt-10" style={{ gap: 10 }}>
                    <Selector
                        options={yearList(startYear).reverse().map((v) => {
                            return { value: String(v), label: v + "년" }
                        })}
                        value={endYear}
                        setValue={setEndYear}
                        placeholder="종료연도"
                        disabled={check}
                    />
                    <Selector
                        options={monthList().map((v) => {
                            return { value: String(v), label: v + "월" }
                        })}
                        value={endMonth}
                        setValue={setEndMonth}
                        placeholder="월"
                        disabled={check}
                    />
                </div>

                <div className="mt-16" style={{
                    display: "flex", gap: 10,
                    fontSize: 15, fontWeight: 500, alignItems: "center"
                }}>
                    <CheckBox value={check} setValue={(v) => {
                        setEndYear("");
                        setEndMonth("");
                        setCheck(v);
                    }} />
                    현재 근무 중
                </div>

                <LineBox className="mt-30" />

                <p className="title-18 mt-30">근무 유형</p>
                <p className="info3 mt-10">근무 당시 회사/소속의 근무 유형을 알려주세요.</p>
                <RadioButton
                    color="red"
                    className="mt-16"
                    value={workType}
                    setValue={setWorkType}
                    count={3}
                    options={[
                        { values: "회사", label: "회사" },
                        { values: "알바", label: "알바" },
                        { values: "프리랜서", label: "프리랜서" }
                    ]}
                />

                <LineBox className="mt-30" />

                <p className="title-18 mt-30">나의 직책</p>
                <p className="info3 mt-10">작성자님과 함께 근무할 당시 나의 직책을 선택해 주세요.</p>
                <RadioButton
                    color="red"
                    className="mt-16"
                    value={rank}
                    setValue={setRank}
                    count={3}
                    options={config?.codes?.map(v => {
                        return { values: v?.id, label: v?.value }
                    })}
                />

                <LineBox className="mt-30" />

                <div className="border-box red bg-red mt-30 padding-20-16">
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M11 11.1837V8.02497M11 14.4837C11 14.4837 11.0044 14.4837 11.0073 14.4837M18.3333 11.0003C18.3333 15.0504 15.05 18.3337 11 18.3337C6.94987 18.3337 3.66663 15.0504 3.66663 11.0003C3.66663 6.95024 6.94987 3.66699 11 3.66699C15.05 3.66699 18.3333 6.95024 18.3333 11.0003Z" stroke="#131214" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p className="title2-1 bold">참고해 주세요!</p>
                    </div>

                    <div className="flex mt-12">
                        <div style={{ width: 3, height: 3, background: "black", borderRadius: 3, flexShrink: 0, margin: 8 }} />
                        <p className="font-15">평판작성을 요청하기 전 작성자님께 해당 레퍼런스 요청에 대한 사전 안내를 진행해 주세요.</p>
                    </div>
                </div>

                <p className="title-18 mt-30">작성자님의 직책</p>
                <p className="info3 mt-10">작성자님과 함께 근무했을때 작성자님의 직책을<br /> 선택해 주세요.</p>
                <RadioButton
                    color="red"
                    className="mt-16"
                    value={writerRank}
                    setValue={setWriterRank}
                    count={3}
                    options={config?.codes?.map(v => {
                        return { values: v?.id, label: v?.value }
                    })}
                />

                <Button
                    className="mt-30"
                    type="red"
                    title="요청하기"
                    disabled={!isNext}
                    onClick={onNextClick}
                />
            </>}
        </div >

        {isSearch && <FindCompany
            backClick={() => { setIsSearch(false) }}
            onCompanyData={(data) => {
                setCompany(data);
            }}
        />}

        <Modal
            open={confirmModal}
            setOpen={setConfirmModal}
            type="success"
            title="추천서 요청이 완료되었습니다!"
            message="등록이 완료되면 알림으로 알려드릴게요"
            confirm="메인으로"
            onConfirm={() => {
                setConfirmModal(false)
                navigate("/home", { replace: true });
            }}
        />

        <ModalReqConfirm
            open={checkModal}
            userData={{
                name: creator?.name,
                // hp: hpHypen(creator?.hp),
                company: company?.name
            }}
            confirm="요청하기"
            onConfirm={sendRecommendFunc}
            cancel="정보 수정"
            onCancel={() => {
                setCheckModal(false)
            }}
        />
    </Layout >
}