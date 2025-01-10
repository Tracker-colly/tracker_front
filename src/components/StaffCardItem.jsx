import images from "../libs/images";
import consts from "../libs/consts"
import { useEffect, useState } from "react";

export function CardOptionBtn(props) {
    const {
        img,
        title,
        onClick
    } = props;

    return <div className="card-option-btn" onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
    }}>
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "black",
            width: 44,
            height: 44,
            borderRadius: 100
        }}>
            {/* <img width={24} height={24} src={img} alt="" /> */}
            <img src={img} alt="" />
        </div>
        <p className="title-10">{title}</p>
    </div>
}

/**
 * 
 * @param {{
 * onClick:()=>void
 * onOptionClick:(type: "Member"|"Link"|"Setting")
 * }} props 
 * @returns 
 */
export default function StaffCardItem(props) {
    const {
        index = 0,
        img,
        title = "회사명",
        rank = "직급",
        onClick,
        onOptionClick
    } = props;

    const cardClick = () => {
        if (onClick) onClick();
    }

    const optionClick = (type) => {
        if (onOptionClick) onOptionClick(type);
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

            <p className="info2 mt-4">{rank}</p>

            <div className="btn-group mt-4">
                <div className="btn-item">
                    <CardOptionBtn img={images.team_w} title="Member" onClick={() => {
                        optionClick("Member")
                    }} />
                </div>
            </div>
        </div>
    </div>
}