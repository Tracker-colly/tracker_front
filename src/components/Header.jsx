import react from "react"
import images from "../libs/images";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useUser } from "../zustand/store";

export default function Header(props) {
    const navigate = useNavigate();
    const { userInfo } = useUser();

    const {
        title = "",
        leftBtnClick,
        searchClick,
        bellClick,
        text,
        textClick,
        isLogo = true
    } = props;

    return <div className="main-header-box">
        <div
            className={`left-group ${leftBtnClick ? "hand" : ""}`}
            onClick={() => {
                if (leftBtnClick) leftBtnClick();
            }}
        >
            {leftBtnClick ?
                <img className="logo left" src={images.left_Actionable} /> :
                (isLogo && <img className="logo hand" src={images.logo_icon} onClick={() => {
                    window.location.href = "/home"
                }} />)}

        </div>
        <div className="title">
            {title}
        </div>
        <div className="btn-group">
            {
                searchClick &&
                <div
                    data-tooltip-id="search-tooltip"
                    style={{
                        width: 34,
                        height: 24,
                        cursor: "pointer"
                    }}>
                    <img

                        style={{
                            width: 24,
                            height: 24,
                        }}
                        src={images.user_search}
                        onClick={() => {
                            navigate("/search")
                            searchClick()
                        }}
                    />
                </div>
            }


            {bellClick && <div style={{
                position: "relative",
                width: 30,
                height: 30,
                cursor: "pointer"
            }}>
                {userInfo?.alarmCount > 0 && <img
                    style={{ position: "absolute", top: 2, right: 3 }}
                    src={images.red_dot} alt=""
                />}

                <img
                    src={images.bell}
                    style={{
                        width: 30,
                        height: 30
                    }}
                    alt="" onClick={() => {
                        navigate("/alarm")
                        bellClick()
                    }} />
            </div>}

            {
                (textClick && text) &&
                    (typeof text === "string") ? <button
                        style={{ fontSize: 16, fontWeight: 500 }}
                        className="under-line"
                        onClick={() => {
                            textClick();
                        }}
                    >{text}</button> :
                    text
            }
        </div>

    </div>
}