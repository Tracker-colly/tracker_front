import react, { useEffect, useState } from "react"
import moment from "moment"
import CheckBox from "../../components/CheckBox"
import { defaultProfile } from "../../utils/utils"

/**
 * 빈 카드
 * @param {*} param0 
 * @returns 
 */
export const EmptyCard = ({ className = "", title }) => {
    return <div className={className} style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: 126,
        padding: "0px 17px",
        alignItems: "center",
        gap: 2,
        borderRadius: 10,
        background: "#F3F3F3"
    }}>
        <p className="font-14 color-sub-text2">{title}</p>
    </div>
}

/**
 * 프로필 사진
 * @param {*} props 
 * @returns 
 */
export const ProfileCard = (props) => {
    const { img, name } = props
    return <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8
    }}>
        <img style={{
            width: 64,
            height: 64,
            borderRadius: 100,
            border: "2px solid #0038FF",
            padding: 2
        }} src={img} alt="" onError={defaultProfile} />
        <p style={{ fontSize: 12, fontWeight: 500 }}>{name}</p>
    </div>
}

/**
 * 인사평가 컴포넌트
 * @param {*} props 
 * @returns 
 */
export const InsaCard = (props) => {

    const {
        companyName = "",
        name = "",
        lank = "",
        date = "",
        onClick
    } = props;

    return <div
        className=""
        style={{
            display: "flex",
            flexDirection: "column",
            padding: 16,
            borderRadius: 8,
            border: "1px solid #0A69FA",
            background: "rgba(10, 105, 250, 0.05)"
        }}
        onClick={() => {
            if (onClick) onClick();
        }}
    >
        <div className="title-16">{companyName} 인사평가</div>
        <div className="font-14 color mt-10">{name} | {lank}</div>
        <div className="font-14 color mt-32">평가 완료일: {moment(date).format("YYYY.MM.DD")}</div>
    </div>
}

/**
 * 추천서 컴포넌트
 * @param {*} props 
 * @returns 
 */
export const ChooCard = (props) => {
    const {
        companyName = "",
        name = "",
        lank = "",
        date = "",
        onClick,
        autoCheck = false,
        isCheck = false,
        onCheck,
    } = props;

    const [check, setCheck] = useState(autoCheck)

    useEffect(() => {
        if (!isCheck) {
            setCheck(false)
        }
    }, [isCheck])

    return <div
        className=""
        style={{
            display: "flex",
            flexDirection: "column",
            padding: 16,
            borderRadius: 8,
            border: "1px solid " + (check ? "#7A7A7A" : "#E6E9EB"),
        }}
    >
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 24
        }}>
            <p className="title-16">{name} 추천서</p>
            {isCheck && <CheckBox value={check} setValue={(v) => {
                onCheck(v)
                setCheck(v)
            }} />}
        </div>
        <div className="font-14 color mt-10">관계: {lank}</div>
        <hr className="mt-16" />
        <div className="mt-16">
            <button
                style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#0A69FA",
                }}
                className="under-line"
                onClick={() => {
                    if (onClick) onClick();
                }}
            >추천서 보기</button>
        </div>
    </div>
}