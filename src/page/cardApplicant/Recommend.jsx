import react, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import AdminCardItem from "../../components/AdminCardItem";
import ApplicantCardItem from "../../components/ApplicantCardItem";
import LineBox from "../../components/LineBox";
import RadioRatingStar from "../../components/RadioRatingStar";
import RadioRating2 from "../../components/RadioRating2";
import RadioButton from "../../components/RadioButton";
import WriterCard from "../../components/WriterCard";



export default function Recommend(props) {
    const { onPopupClose } = props;

    const navigate = useNavigate();
    const location = useLocation();

    const [writerView, setWriterView] = useState(false);

    const headerBackClick = () => {
        if (onPopupClose) {
            onPopupClose();
            return;
        }
        console.log("asDasD?AS?DA?Sd??A?asd")
        navigate(-1)
    }


    useEffect(() => {
        if (location.state?.writer) {
            setWriterView(true)
        } else {
            setWriterView(false)
        }
    }, [])

    return <Layout
        isHeader
        headerTitle="추천서"
        leftBtnClick={headerBackClick}
    >
        <div className="content">

            {writerView && <>
                <WriterCard
                    type={"red"}
                    title="추천서 작성자 정보"
                    infoList={[
                        { title: "이름", value: "최박사" },
                        { title: "전화번호", value: "010-1212-5656" },
                        { title: "관계", value: "선임/상사" },
                    ]}
                    onViewClick={() => {
                        navigate("/relation")
                    }}
                    disabled
                />
                <div className="mt-40"></div>
            </>}

            <p className="title-18">업무 역량 평가</p>
            <hr className="mt-16" />

            <div className="flex-between center mt-20">
                <p className="title2">성실성</p>
                <RadioRatingStar value={3} disabled />
            </div>
            <p className="info2-1 mt-8">근태, 업무 집중도, 자리 비움 빈도</p>

            <div className="flex-between center mt-20">
                <p className="title2">책임감</p>
                <RadioRatingStar value={3} disabled />
            </div>
            <p className="info2-1">업무 완성도, 일정/품질/업무 관리</p>

            <div className="flex-between center mt-20">
                <p className="title2">팀워크</p>
                <RadioRatingStar value={2} disabled />
            </div>
            <p className="info2-1 mt-8">긍정적 자세, 배려, 솔선수범</p>

            <div className="flex-between center mt-20">
                <p className="title2">담당 업무</p>
                <RadioRatingStar disabled />
            </div>
            <p className="info2-1 mt-8">전문성/핵심역량 보유</p>

            <div className="flex-between center mt-20">
                <p className="title2">업무 스킬</p>
                <RadioRatingStar disabled />
            </div >
            <p className="info2-1 mt-8">업무 관련 스킬 및 지식 배양</p>

            <LineBox className="mt-30" />

            <p className="title2 mt-30">윤리 및 태도</p>
            <p className="info3 mt-10">불성실한 근태 (잦은 지각, 결근, 연락 두절 등)</p>
            <RadioButton
                color="red"
                className="mt-16"
                value={2}
                setValue={() => { }}
                count={2}
                options={[
                    { values: 1, label: "있음" },
                    { values: 2, label: "없음" }
                ]}
                disabled
            />
            <p className="title2 mt-24">윤리적인 문제</p>
            <p className="info3 mt-10">금전, 이성, 폭력 등</p>
            <RadioButton
                color="red"
                className="mt-16"
                value={2}
                setValue={() => { }}
                count={2}
                options={[
                    { values: 1, label: "있음" },
                    { values: 2, label: "없음" }
                ]}
                disabled
            />

            <p className="title2 mt-24">주변인과의 관계</p>
            <p className="info3 mt-10">불친절한 태도, 감정적 대응 등</p>
            <RadioButton
                color="red"
                className="mt-16"
                value={2}
                setValue={() => { }}
                count={2}
                options={[
                    { values: 1, label: "있음" },
                    { values: 2, label: "없음" }
                ]}
                disabled
            />

            <LineBox className="mt-30" />

            <p className="title-18 mt-30">홍길동님의 강점을 기술해 주세요.</p>
            <textarea
                className="input text-area disabled mt-20"
                style={{
                    height: 280
                }}
                value={"일을 '열심히' 합니다."}
                maxLength={200}
                placeholder=""
                disabled
            />
            <div className="mt-14" style={{ textAlign: "end", color: "#6E7375" }}>{0}/200</div>
            <p className="title-18 mt-30">홍길동님의 개선점을 기술해 주세요.</p>
            <textarea
                className="input text-area disabled mt-20"
                style={{
                    height: 280
                }}
                value={"일을 '잘' 해야합니다."}
                maxLength={200}
                placeholder=""
                disabled
            />
            <div className="mt-14" style={{ textAlign: "end", color: "#6E7375" }}>{0}/200</div>
            <LineBox className="mt-30" />
            <p className="title-18 mt-30">당신이 채용 담당자라면 채용하시겠습니까?</p>
            <RadioRating2
                className="mt-24"
                value={0}
                list={[
                    "채용 결정에 고민을 하겠습니다.",
                    "타 지원자와 동등한 조건이라면 채용하겠습니다.",
                    "우수하므로 채용하겠습니다.",
                    "어떤 상황이라도 반드시 채용하겠습니다.",
                    "채용하지 않겠습니다.",
                ]}
                disabled
            />
            <div className="mt-40"></div>
        </div >
    </Layout >
}