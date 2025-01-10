import moment from "moment";
import images from "../libs/images";
import consts from "../libs/consts"
import { useEffect, useState } from "react";

/**
 * 
 * @param {{
 * onClick:()=>void
 * }} props 
 * @returns 
 */
export default function ApplicantCardItem(props) {
    const {
        index = 0,
        img = "",
        sendDate,
        isView,
        title = "회사명",
        onClick,
    } = props;

    const cardClick = () => {
        if (onClick) onClick();
    }

    const [isAnim, setIsAnim] = useState(false)
    useEffect(() => {
        let time = 0;
        if (index != 0) {
            time = 200 * index;
        }
        setTimeout(() => {
            setIsAnim(true)
        }, time)
    }, [])

    return <div className={"admin-card-item" + (isAnim ? " view-anim" : "")} onClick={cardClick}>
        <img className="thmb" src={consts.s3url + img} alt="" />
        <div className="card-info">
            <div className="title-box">
                <p className="title3">{title}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                    <path d="M1.625 12.375L6.71816 7.63345C7.09395 7.28361 7.09395 6.71639 6.71816 6.36655L1.625 1.625" stroke="#87848A" stroke-width="1.34375" stroke-linecap="round" />
                </svg>
            </div>

            <div style={{
                display: "flex",
                flexGrow: 1,
                flexDirection: "column",
                justifyContent: "end",
                gap: 4
            }} className="mt-4">
                <p className="info2">제출일</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p className="info4">{sendDate ? moment(sendDate).format("YYYY.MM.DD") : "-"}</p>
                    {
                        isView ?
                            <p className="font-14 color-success">열람</p> :
                            <p className="font-14 color-error">미열람</p>
                    }
                </div>
            </div>
        </div>
    </div>
}