import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import images from "../libs/images"
import * as APIS from "../utils/service"
import { usePopup } from "../zustand/store";

export default function Main() {

    const navigate = useNavigate();

    const token = window.localStorage.getItem("token");
    const { infoOpen, setInfoOpen } = usePopup();

    // const [isSplash, setIsSplash] = useState(true)
    const [isView, setIsView] = useState(false);
    const [isAnim, setIsAnim] = useState(false);

    useEffect(() => {
        console.log("main")
        setTimeout(() => {
            setIsView(true)
        }, 10)

        setTimeout(() => {
            setIsAnim(true)
        }, 1000)

        setTimeout(() => {
            if (token) {
                navigate("/home")
            } else {
                if (infoOpen) {
                    navigate("/info")
                    setInfoOpen(false)
                } else {
                    navigate("/login")
                }
            }

        }, 3000)
    }, [])

    return <div
        className="layout-bg"
        style={{
            position: "fixed",
            width: "100%",
            // maxWidth: 600,
            maxWidth: 480,
            height: "100%",
            left: "50%",
            transform: "translate(-50%, 0%)",
        }}
    >
        <div className="main-title-box-sp"
            style={{
                transform: isView ? "translateY(0px)" : "translateY(50px)",
                opacity: isView ? 1 : 0
            }}
        >
            <img src={images.logo_icon} alt="" />
            <img className="mt-22" src={images.logo} alt="" />
            <p style={{
                fontSize: 18,
                lineHeight: "32px",
                textAlign: "center"
            }} className="color-white mt-16">
                인재 검증의 최신 트랜드<br />Tracker Colly
            </p>
        </div>
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div
                className="main-card-box"
                style={{
                    transform: isView && "translateY(0px)",
                    opacity: isView && 1
                }}
            >
                <img
                    className={`card-img ${isAnim ? "anim3" : ""}`}
                    src={images.card_green} alt="" />
                <img
                    className={`card-img ${isAnim ? "anim2" : ""}`}
                    src={images.card_red} alt="" />
                <img
                    className={`card-img ${isAnim ? "anim1" : ""}`}
                    src={images.card_blue} alt="" />
            </div>
        </div>

        {/* <p style={{
            position: "absolute",
            width: "100%",
            fontSize: 10,
            lineHeight: 1.2,
            textAlign: "center",
            bottom: 60,
            fontWeight: 500
        }} className="color-white mt-16">
            Copyright (C) 2024 Trackcolly all rights reserved.
        </p> */}
    </div>
}