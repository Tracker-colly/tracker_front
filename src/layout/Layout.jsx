import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom } from 'react-toastify';

import images from "../libs/images"
import Selector from '../components/Selector';
import Modal from '../components/Modal';
import Header from '../components/Header';
import BottomNavi from '../components/BottomNavi';
import * as APIS from "../utils/service"
import { useConfig, useFooter, useUser } from '../zustand/store';

export default function Layout({
    children,
    index = 0,
    headerTitle = "",
    leftBtnClick,
    searchClick,
    bellClick,
    isHeader = false,
    isNavi = false,
    text,
    textClick,
    addClick,
    homeClick
}) {
    const navigate = useNavigate();
    const { setConfig } = useConfig();
    const { setFooterInfo } = useFooter();
    const { userInfo, loadUser } = useUser();

    const [logoutPop, setlogoutPop] = useState(false)

    const logoutConfirm = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    const getUser = () => {
        let token = localStorage.getItem("token");
        if (token) {
            loadUser();
        }
    };

    const getConfig = () => {
        APIS.postData("/v1/config").then((result) => {
            setConfig(result.data.data)
        })

        APIS.postData("/v1/config/siteInfo").then((result) => {
            setFooterInfo(result.data.data)
        })
    }

    useEffect(() => {
        console.log("layout mount")
        window.scrollTo({ top: 0 })
        getUser();
        getConfig();
    }, []);

    return (
        <div className={`layout-contain `}>

            {isHeader && <Header
                title={headerTitle}
                leftBtnClick={leftBtnClick}
                searchClick={searchClick}
                bellClick={bellClick}
                text={text}
                textClick={textClick}
            />}

            <div className={`main-wrapper pageViewer${isHeader ? " mt-64" : ""}`}>
                {children}
            </div>
            {isNavi && <BottomNavi addClick={addClick} homeClick={homeClick} />}

            <Modal
                open={logoutPop}
                setOpen={setlogoutPop}
                title={"로그아웃"}
                message={"로그아웃 하시겠습니까?"}
                onConfirm={logoutConfirm}
                onCancel={() => { setlogoutPop(false) }}
            />
        </div>
    )
}

