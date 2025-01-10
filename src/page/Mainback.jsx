import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import images from "../libs/images"
import * as APIS from "../utils/service"

import Layout from "../layout/Layout";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Selector from "../components/Selector";
import { toast, ToastContainer } from "react-toastify";
import CardMaker from "../components/CardMaker";
import CardCounter from "../components/CardCounter";

export default function Main() {

    const navigate = useNavigate();

    const token = window.localStorage.getItem("token");

    // const [isSplash, setIsSplash] = useState(true)
    const [isAnim, setIsAnim] = useState(false);

    useEffect(() => {
        console.log("main")
        setIsAnim(false);
        setTimeout(() => {
            setIsAnim(true)
        }, 50)

        // setTimeout(() => {
        //     if (token) {
        //         navigate("/home")
        //     } else {
        //         navigate("/info")
        //     }

        // }, 3000)
    }, [])

    return <div
        className="layout-bg"
        style={{
            position: "fixed",
            width: "100%",
            maxWidth: 600,
            height: "100%",
            left: "50%",
            transform: "translate(-50%, 0%)",
        }}
    >
        <div className="main-title-box ">
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
            <div className="tbox-contain">
                <div style={{ margin: 20 }}></div>
                <div className={`ttt-box ${isAnim && " ttt-1"}`}>
                    <div className="bg" />
                    <CardMaker type={2} />
                    <p className="title mt-10">Applicant Card</p>
                    <CardCounter type={2} num={2} />
                    <img className="logo" src={images.logo} alt="" />
                </div>
                <div className={`ttt-box red ${isAnim && " ttt-2"}`}>
                    <div className="bg red" />
                    <CardMaker type={2} />
                    <p className="title mt-10">Staff Card</p>
                    <CardCounter type={2} num={1} />
                    <img className="logo" src={images.logo} alt="" />
                </div>
                <div className={`ttt-box blue ${isAnim && " ttt-3"}`}>
                    <div className="bg blue" />
                    <CardMaker type={2} />
                    <p className="title mt-10">Administrator Card</p>
                    <CardCounter type={2} num={2} />
                    <img className="logo" src={images.logo} alt="" />
                </div>
            </div>
        </div>

        <p style={{
            position: "absolute",
            width: "100%",
            fontSize: 10,
            lineHeight: 1.2,
            textAlign: "center",
            bottom: 60,
            fontWeight: 500
        }} className="color-white mt-16">
            Copyright (C) 2024 Trackcolly all rights reserved.
        </p>
    </div>
}