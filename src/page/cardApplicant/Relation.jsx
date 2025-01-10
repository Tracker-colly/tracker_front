import react, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import AdminCardItem from "../../components/AdminCardItem";
import ApplicantCardItem from "../../components/ApplicantCardItem";
import RadioButton from "../../components/RadioButton";
import Input from "../../components/Input";
import CheckBox from "../../components/CheckBox";
import RadioList from "../../components/RadioList";
import { toast } from "react-toastify";

export default function Relation() {
    const navigate = useNavigate();
    const location = useLocation();

    const headerBackClick = () => {
        navigate(-1)
    }

    useEffect(() => {
        let data = location.state?.info

        if (data) {
            console.log(data)
        } else {
            toast.info("관계 정보가 없습니다.")
        }
    }, [])

    return <Layout
        isHeader
        headerTitle="관계"
        leftBtnClick={headerBackClick}
    >
        <div className="content">
            <div className="title-18 ">1. 함께 근무했던 회사</div>
            <div className="info3 mt-10">최박사님과 함께 근무했던 회사</div>
            <Input className="mt-16" value="트랙커콜리" disabled />

            <div className="title-18 mt-40">2. 함께 근무한 기간</div>
            <div className="info3 mt-10">최박사님과 함께 근무한 기간</div>
            <div className="mt-16" style={{ display: "flex", gap: 20 }}>
                <Input className="flex-1" value="2020년" disabled />
                <Input className="flex-1" value="5월" disabled />
            </div>
            <div className="mt-10" style={{ display: "flex", gap: 20 }}>
                <Input className="flex-1" value="2022년" disabled />
                <Input className="flex-1" value="5월" disabled />
            </div>

            <div className="mt-16" style={{
                display: "flex", gap: 10,
                fontSize: 15, fontWeight: 500, alignItems: "center"
            }}>
                <CheckBox value={true} disabled />
                현재 근무 중
            </div>


            <div className="title-18 mt-40">3. 근무 유형</div>
            <div className="info3 mt-10">최박사님의 근무 유형</div>
            <RadioButton
                color="red"
                className="mt-16"
                value={1}
                setValue={() => { }}
                count={3}
                options={[
                    { values: "회사", label: "회사" },
                    { values: "알바", label: "알바" },
                    { values: "프리랜서", label: "프리랜서" }
                ]}
                disabled
            />

            <div className="title-18 mt-40">4. 홍길동님의 직책</div>
            <div className="info3 mt-10">최박사님과 근무 당시 홍길동님의 직책</div>
            <RadioButton
                color="red"
                className="mt-16"
                value={4}
                setValue={() => { }}
                count={3}
                options={[
                    { values: 1, label: "대표자" },
                    { values: 2, label: "임원진" },
                    { values: 3, label: "팀장급" },
                    { values: 4, label: "중간관리자" },
                    { values: 5, label: "실무관리자" },
                    { values: 6, label: "인턴" },
                    { values: 7, label: "기타" }
                ]}
                disabled
            />

            <div className="title-18 mt-40">5. 소속 정보 / 관계</div>
            <div className="info3 mt-10">근무 시 홍길동님과의 관계를 알려주세요.</div>
            <RadioList
                className="mt-16"
                value={2}
                options={[
                    { values: 1, label: "홍길동님의 후임" },
                    { values: 2, label: "홍길동님의 선임/상사" },
                    { values: 3, label: "홍길동님의 동기" },
                    { values: 4, label: "홍길동님의 동료" },
                ]}
                disabled
            />

            <div className="title-18 mt-40">6. 최박사님의 직책</div>
            <div className="info3 mt-10">홍길동님과 근무 당시의 직책을 알려주세요.</div>
            <RadioButton
                color="red"
                className="mt-16"
                value={4}
                setValue={() => { }}
                count={3}
                options={[
                    { values: 1, label: "대표자" },
                    { values: 2, label: "임원진" },
                    { values: 3, label: "팀장급" },
                    { values: 4, label: "중간관리자" },
                    { values: 5, label: "실무관리자" },
                    { values: 6, label: "인턴" },
                    { values: 7, label: "기타" }
                ]}
                disabled
            />
        </div>
    </Layout>
}