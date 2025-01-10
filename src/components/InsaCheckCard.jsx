import moment from "moment";
import { useEffect, useState } from "react";

export default function InsaCheckCard(props) {
    const {
        companyName = "",
        name = "",
        lank = "",
        date = "",
        check = false,
        setCheck,
    } = props;
    const [isCheck, setIsCheck] = useState(check);

    useEffect(() => {
        setIsCheck(check)
    }, [check])

    return <div
        className="hand"
        style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: 16,
            borderRadius: 8,
            border: `1px solid ${isCheck ? "#7A7A7A" : "#E6E9EB"}`,
            background: "#FFF"
        }}
        onClick={() => {
            if (setCheck) setCheck(isCheck);
        }}
    >
        <div style={{
            position: "absolute",
            top: 24,
            right: 16,
            width: 24,
            height: 24,
        }}>
            {isCheck ?
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="#C90000" />
                    <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#C90000" />
                    <circle cx="12" cy="12" r="4" fill="white" />
                </svg> :
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#DADDDE" />
                </svg>
            }

        </div>
        <div className="title-16">{companyName} 인사평가</div>
        <div className="font-14 color mt-10">{name} | {lank}</div>
        <div className="font-14 color mt-32">평가 완료일: {moment(date).format("YYYY.MM.DD")}</div>
    </div>
}