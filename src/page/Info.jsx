import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import images from "../libs/images"
import * as APIS from "../utils/service"

import Layout from "../layout/Layout";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Selector from "../components/Selector";
import { toast, ToastContainer } from "react-toastify";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { usePopup } from "../zustand/store";

export default function Info() {
    const navigate = useNavigate();
    const { setRegiOpen } = usePopup();
    const [slideIndex, setslideIndex] = useState(0);

    const startFunc = () => {
        // setRegiOpen(true);
        navigate("/login");
    }

    useEffect(() => {
        if (slideIndex === 2) {
            console.log("last")
        }
    }, [slideIndex])

    useEffect(() => {
        console.log("id card")
    }, [])

    return <div style={{
        position: "fixed",
        // maxWidth: 600,
        maxWidth: 480,
        left: "50%",
        transform: "translate(-50%, 0%)",
        width: "100%",
        height: "100%",
    }} >
        <div
            id="containerForBullets"
            style={{
                opacity: `${slideIndex === 2 ? 0 : 1}`
            }}
        />
        <Swiper
            style={{
                width: "100%",
                height: "100%"
            }}
            modules={[FreeMode, Navigation, Thumbs, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(swiper) => {
                setslideIndex(swiper.activeIndex)
            }}
            // onSwiper={(swiper) => console.log(swiper)}
            pagination={{
                el: "#containerForBullets",
                type: "bullets",
                bulletClass: "swiper-custom-bullet",
                bulletActiveClass: "swiper-custom-bullet-active",
                clickable: true,
            }}
            resistanceRatio={0}
        >
            <SwiperSlide className="info-slide-item">
                <img className="bg-img" src={images.info_bg1} alt="" />
                <div className="title">
                    <p className="color-white" style={{ flexShrink: 0 }}>CAREERS</p>
                    <div className="line" />

                    <div className="info">
                        <p className="info-title">간편하고 빠른 제출</p>
                        <p className="info-text mt-20">
                            간편하게 레퍼런스를 요청<br /><br />
                            하고 관리하여 나의 이직<br /><br />
                            성공률을 높혀보세요.<br /><br />
                        </p>
                    </div>
                </div>
                {/* <div className="info">
                    <p className="info-title">간편하고 빠른 제출</p>
                    <p className="info-text mt-20">
                        간편하게 레퍼런스를 요청<br /><br />
                        하고 관리하여 나의 이직<br /><br />
                        성공률을 높혀보세요.<br /><br />
                    </p>
                </div> */}
            </SwiperSlide>
            <SwiperSlide className="info-slide-item">
                <img className="bg-img" src={images.info_bg2} alt="" />
                <div className="title">
                    <p className="color-white" style={{ flexShrink: 0 }}>ID CARDS</p>
                    <div className="line" />

                    <div className="info">
                        <p className="info-title">3가지 아이디 카드</p>
                        <p className="info-text mt-20">
                            자신의 니즈에 맞춰 카드를<br /><br />
                            생성하고 효율적인 업무<br /><br />
                            프로세스를 경험해 보세요.<br /><br />
                        </p>
                    </div>
                </div>

            </SwiperSlide>
            <SwiperSlide className="info-slide-item">
                <img className="bg-img" src={images.info_bg3} alt="" />
                <div className="title">
                    <p className="color-white" style={{ flexShrink: 0 }}>RECRUIT</p>
                    <div className="line" />

                    <div className="info">
                        <p className="info-title">인재 채용</p>
                        <p className="info-text mt-20">
                            자신의 니즈에 맞춰 카드를<br /><br />
                            생성하고 효율적인 업무<br /><br />
                            프로세스를 경험해 보세요.<br /><br />
                        </p>
                    </div>
                </div>

            </SwiperSlide>
        </Swiper>
        <button style={{
            position: "absolute",
            width: 180,
            height: 48,
            background: "#C90000",
            zIndex: 4,
            left: "calc(50% - 90px)",
            borderRadius: 6,
            bottom: 52,
            cursor: "pointer",
            fontSize: 16,
            fontWeight: 600,
            color: "#FFFFFF",
            transform: `translateY(${slideIndex === 2 ? "0px" : "100px"})`,
            transition: "all 0.3s ease-in-out"
        }}
            onClick={startFunc}
        >시작하기</button>
    </div>
}