import { useLocation, useNavigate } from "react-router-dom";
import images from "../libs/images";
import { useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { useUser } from "../zustand/store";

/**
 * 메뉴
 * @param {{
 * position:"left"|"right"|undefined,
 * img:any
 * title:string
 * }} props 
 * @returns 
 */
const MenuItem = (props) => {
    const {
        data_tooltip_id,
        position,
        img,
        imgActive,
        title,
        onClick,
        isActive = false,
        isAlarm = false
    } = props
    return <div data-tooltip-id={data_tooltip_id} className={`navi-item-box${position ? " " + position : ""}`}
        onClick={() => {
            if (onClick) onClick();
        }}
    >
        <div style={{ position: "relative" }}>
            {isAlarm && <div style={{
                position: "absolute",
                top: "-3px",
                right: "-2.6px",
                width: 8,
                height: 8,
                borderRadius: 100,
                background: "#DB340B"
            }} />}
            {isActive ?
                <img width={26} height={26} src={imgActive ? imgActive : img} alt="" /> :
                <img width={26} height={26} src={img} alt="" />
            }
        </div>

        <p style={{
            color: isActive ? "#C90000" : ""
        }}>{title}</p>
    </div >
}


export default function BottomNavi({
    addClick,
    homeClick,
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { userInfo } = useUser();

    return <div className="main-bottom-navi">
        <MenuItem
            data_tooltip_id="guide-tooltip"
            title={"Guide"}
            img={images.vip}
            imgActive={images.vip_on}
            onClick={() => {
                navigate("/guide");
            }}
            isActive={location.pathname == "/guide"}
        />
        <MenuItem
            title={"Track"}
            img={images.faceid}
            imgActive={images.faceid_on}
            position="left"
            onClick={() => {
                navigate("/track");
            }}
            isActive={location.pathname == "/track"}
        />
        <MenuItem
            title={"Inbox"}
            img={images.inbox}
            imgActive={images.inbox_on}
            position="right"
            onClick={() => {
                navigate("/inbox");
            }}
            isActive={location.pathname == "/inbox"}
            isAlarm={userInfo?.inboxCount > 0}
        />
        <MenuItem
            title={"Setting"}
            img={images.setting}
            imgActive={images.setting_on}
            onClick={() => {
                navigate("/setting");
            }}
            isActive={location.pathname == "/setting"}
        />

        {addClick && <div data-tooltip-id="home-tooltip" className="add-box" onClick={() => {
            if (addClick) addClick();
        }} >
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M18 7.5V28.5M7.5 18H28.5" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>}

        {homeClick &&

            <div className="add-box black" onClick={() => {
                if (homeClick) homeClick();
            }} >
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                    <path d="M5.66663 22.6663L15.0993 27.3827C16.2958 27.9809 17.7041 27.9809 18.9006 27.3827L28.3333 22.6663M5.66663 16.9997L15.0993 21.716C16.2958 22.3142 17.7041 22.3142 18.9006 21.716L28.3333 16.9997M5.66663 11.333L15.0993 6.61665C16.2958 6.01841 17.7041 6.01841 18.9006 6.61665L28.3333 11.333L18.9006 16.0493C17.7041 16.6476 16.2958 16.6476 15.0993 16.0493L5.66663 11.333Z" stroke="white" stroke-width="1.96154" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        }
    </div>
}