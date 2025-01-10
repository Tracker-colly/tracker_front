import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";

import images from "../../libs/images"
import * as APIS from "../../utils/service"

import Layout from "../../layout/Layout";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Selector from "../../components/Selector";
import { elapsedTime } from "../../utils/utils";
import CheckBoxIOS from "../../components/CheckBoxIOS";
import Header from "../../components/Header";
import ServiceInfo from "./ServiceInfo";
import TabMenu from "../../components/TabMenu";

export default function Guide() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("setting")
    }, [])

    const [isInfo, setisInfo] = useState(false);

    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        // setisInfo(true)
    }, [])


    useEffect(() => {
        if (!isInfo) {
            window.scrollTo(0, 0)
        }
    }, [isInfo])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [tabIndex])

    return <Layout
        headerTitle={"Guide"}
        isHeader
        searchClick={() => { }}
        bellClick={() => { }}
        isNavi
        homeClick={() => { navigate("/home") }}
    >
        {isInfo && <ServiceInfo onConfirm={() => {
            setisInfo(false);
        }} />}
        <div className="content" style={{ padding: 0 }}>
            <TabMenu
                style={{
                    // position: "fixed",
                    // top: 64,
                    // zIndex: 10,
                    // width: "100%",
                    // maxWidth: 600,
                    // background: "#FFF"
                }}
                menuList={["Admin", "Staff", "Applicant"]}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
            />
            {tabIndex === 0 && <>
                <p className="guide-title mt-130">
                    Administrator 카드란<br />
                    무엇인가요?
                </p>
                <p className="guide-info mt-24">
                    Administrator 카드는 <span className="bold">관리자 권한</span>을 가지고 있는<br />
                    카드이며 회사를 등록했을 때 자동으로 생성됩니다.<br />
                    인사평가 실시, 레퍼런스 제출 요청, 직원 관리 등을<br />
                    효율적으로 진행해 보세요!<br />
                </p>

                <img className="mt-56" style={{ padding: "0px 16px" }} src={images.guide_admin_01} alt="" />

                <p className="guide-title mt-64">
                    Administrator 카드는<br />
                    어떻게 생성하나요?
                </p>
                <Swiper
                    className="mt-24"
                    style={{
                        width: "100%",
                        background: "#FFF",
                        padding: "0px 16px",
                    }}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1}
                    pagination={{
                        el: "#guide-bullets-01",
                        type: "bullets",
                        bulletClass: "swiper-custom-bullet3",
                        bulletActiveClass: "swiper-custom-bullet-active3",
                        clickable: true,
                    }}
                    resistanceRatio={0}
                >
                    <SwiperSlide >
                        <p className="guide-info">
                            하단의 ‘+’버튼을 눌러<br />
                            Admnistrator 카드 생성을 시작합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_admin_021} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            회사명, 회사소개, URL 입력 등<br />
                            회사 정보를 작성해줍니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_admin_022} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            회사 공개 설정 여부와<br />
                            연결 요청 설정을 확인합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_admin_023} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            최종적으로 Administrator 카드<br />
                            등록을 완료합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_admin_024} alt="" />
                    </SwiperSlide>
                </Swiper>
                <div id="guide-bullets-01" className="guide-bullets mt-24" />

                <p className="guide-title mt-64">
                    인사평가 및 추천서 제출<br />
                    요청은 어떻게 하나요?
                </p>
                <Swiper
                    className="mt-24"
                    style={{
                        width: "100%",
                        background: "#FFF",
                        padding: "0px 16px",
                    }}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1}
                    pagination={{
                        el: "#guide-bullets-02",
                        type: "bullets",
                        bulletClass: "swiper-custom-bullet3",
                        bulletActiveClass: "swiper-custom-bullet-active3",
                        clickable: true,
                    }}
                    resistanceRatio={0}
                >
                    <SwiperSlide >
                        <p className="guide-info">
                            우측 상단에 돋보기 아이콘을 통해<br />
                            인사평가 및 추천서 제출을 요청합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_admin_031} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            추천서 및 인사평가를 요청할<br />
                            지원자를 검색합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_admin_032} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            검색 결과를 확인하고 평가 제출<br />
                            요청 버튼을 누릅니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_admin_033} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            제출을 요청할 항목을 선택하여<br />
                            제출 요청을 진행합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_admin_034} alt="" />
                    </SwiperSlide>
                </Swiper>
                <div id="guide-bullets-02" className="guide-bullets mt-24" />

                <p className="guide-title mt-64">
                    요청받은 추천서 작성은<br />
                    어떻게 진행하나요?
                </p>

                <Swiper
                    className="mt-24"
                    style={{
                        width: "100%",
                        background: "#FFF",
                        padding: "0px 16px",
                    }}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1}
                    pagination={{
                        el: "#guide-bullets-03",
                        type: "bullets",
                        bulletClass: "swiper-custom-bullet3",
                        bulletActiveClass: "swiper-custom-bullet-active3",
                        clickable: true,
                    }}
                    resistanceRatio={0}
                >
                    <SwiperSlide >
                        <p className="guide-info">
                            INBOX에서 작성 요청 받은<br />
                            목록을 확인합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_admin_041} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            작성할 목록을 탭한 후 안내글을<br />
                            확인하고 작성하기를 시작합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_admin_042} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            추천서 작성을 시작합니다.<br /><br />
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_admin_043} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            추천서 작성이 완료되면 작성완료<br />
                            버튼을 눌러 작성을 완료합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_admin_044} alt="" />
                    </SwiperSlide>
                </Swiper>
                <div id="guide-bullets-03" className="guide-bullets mt-24" />
            </>}

            {tabIndex === 1 && <>
                <p className="guide-title mt-130">
                    Staff 카드란 무엇인가요?
                </p>
                <p className="guide-info mt-24">
                    Staff 카드는 현재 재직중인 회사 목록을 보여주는<br />
                    카드로 회사에서 실시하는 인사평가를 진행할 수 있으며<br />
                    회사의 멤버들을 확인할 수 있습니다.
                </p>
                <img className="mt-56" style={{ padding: "0px 16px" }} src={images.guide_staff_01} alt="" />

                <p className="guide-title mt-64">
                    Staff 카드 생성은<br />
                    어떻게 할 수 있나요?
                </p>
                <Swiper
                    className="mt-24"
                    style={{
                        width: "100%",
                        background: "#FFF",
                        padding: "0px 16px",
                    }}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1}
                    pagination={{
                        el: "#guide-bullets-01",
                        type: "bullets",
                        bulletClass: "swiper-custom-bullet3",
                        bulletActiveClass: "swiper-custom-bullet-active3",
                        clickable: true,
                    }}
                    resistanceRatio={0}
                >
                    <SwiperSlide >
                        <p className="guide-info">
                            우측 상단에 돋보기 아이콘을 통해<br />
                            Staff 카드를 생성할 회사를 찾습니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_staff_021} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            연결을 요청할 회사를 찾았다면<br />
                            결과 항목의 오른쪽 Link를 탭합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_staff_022} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            링크 요청 확인란이 뜨면<br />
                            ‘예’ 버튼을 선택해 줍니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_staff_023} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            회사의 최고관리자가 링크 요청을<br />
                            수락하면 카드가 생성됩니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_staff_024} alt="" />
                    </SwiperSlide>
                </Swiper>
                <div id="guide-bullets-01" className="guide-bullets mt-24" />

                <p className="guide-title mt-64">
                    추천서 작성은<br />
                    어떻게 진행하나요?
                </p>
                <Swiper
                    className="mt-24"
                    style={{
                        width: "100%",
                        background: "#FFF",
                        padding: "0px 16px",
                    }}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1}
                    pagination={{
                        el: "#guide-bullets-02",
                        type: "bullets",
                        bulletClass: "swiper-custom-bullet3",
                        bulletActiveClass: "swiper-custom-bullet-active3",
                        clickable: true,
                    }}
                    resistanceRatio={0}
                >
                    <SwiperSlide >
                        <p className="guide-info">
                            INBOX에서 applicant/staff 쪽으로<br />
                            이동하여 요청 받은 추천서 작성 목록을 확인합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_staff_031} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            목록 선택 후 안내글을 확인하고<br />
                            작성하기를 시작합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_staff_032} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            추천서 작성을 시작합니다.<br /><br />
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_staff_033} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            작성완료 버튼을 누르면<br />
                            추천서 작성이 완료됩니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_staff_034} alt="" />
                    </SwiperSlide>
                </Swiper>
                <div id="guide-bullets-02" className="guide-bullets mt-24" />
            </>}

            {tabIndex === 2 && <>
                <p className="guide-title mt-130">
                    Applicant 카드란<br />
                    무엇인가요?
                </p>
                <p className="guide-info mt-24">
                    Applicant 카드는 내가 지원한 회사 목록을<br />
                    확인할 수 있는 카드로 제출한 인사평가 및 추천서를<br />
                    확인할 수 있는 <span className="bold">지원 통합 관리 카드</span>입니다.
                </p>

                <img className="mt-56" style={{ padding: "0px 16px" }} src={images.guide_appli_01} alt="" />

                <p className="guide-title mt-64">
                    Applicant 카드는<br />
                    어떻게 생성하나요?
                </p>
                <Swiper
                    className="mt-24"
                    style={{
                        width: "100%",
                        background: "#FFF",
                        padding: "0px 16px",
                    }}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1}
                    pagination={{
                        el: "#guide-bullets-01",
                        type: "bullets",
                        bulletClass: "swiper-custom-bullet3",
                        bulletActiveClass: "swiper-custom-bullet-active3",
                        clickable: true,
                    }}
                    resistanceRatio={0}
                >
                    <SwiperSlide >
                        <p className="guide-info">
                            우측 상단에 돋보기 아이콘을 통해<br />
                            Applicant 카드를 생성할 수 있습니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_appli_021} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            인사평가 및 추천서를 제출할 회사를<br />
                            찾았다면 Submit 버튼을 탭합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_appli_022} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            지원한 회사에 제출할<br />
                            인사평가 및 추천서를 선택합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_appli_023} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            올바른 인사평가 및 추천서를 선택했는지<br />
                            최종적으로 확인합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_appli_024} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            지원한 회사에 인사평가 및 추천서를<br />
                            제출하면 카드가 생성됩니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_appli_025} alt="" />
                    </SwiperSlide>
                </Swiper>
                <div id="guide-bullets-01" className="guide-bullets mt-24" />

                <p className="guide-title mt-64">
                    인사평가 및 추천서<br />
                    요청은 어떻게 하나요?
                </p>
                <Swiper
                    className="mt-24"
                    style={{
                        width: "100%",
                        background: "#FFF",
                        padding: "0px 16px",
                    }}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1}
                    pagination={{
                        el: "#guide-bullets-02",
                        type: "bullets",
                        bulletClass: "swiper-custom-bullet3",
                        bulletActiveClass: "swiper-custom-bullet-active3",
                        clickable: true,
                    }}
                    resistanceRatio={0}
                >
                    <SwiperSlide >
                        <p className="guide-info">
                            우측 상단에 돋보기 아이콘을 통해<br />
                            인사평가 및 추천서를 요청할 수 있습니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_appli_031} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            인사평가 혹은 추천서를 요청할<br />
                            회사 및 유저를 검색합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_appli_032} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            평가 작성 요청 버튼을 탭하여<br />
                            작성을 요청합니다.
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_appli_033} alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <p className="guide-info">
                            작성을 요청할 항목을 선택합니다.<br /><br />
                        </p>
                        <img className="mt-48" style={{ width: "100%" }} src={images.guide_appli_034} alt="" />
                    </SwiperSlide>
                </Swiper>
                <div id="guide-bullets-02" className="guide-bullets mt-24" />
            </>}


            <div className="mt-130" />
        </div>
    </Layout >
}



