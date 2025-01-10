
import { Swiper, SwiperSlide } from "swiper/react";
import Header from "../../components/Header";
import images from "../../libs/images"
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import Button from "../../components/Button";

export default function ServiceInfo(props) {
    const {
        onConfirm = () => { }
    } = props;

    return <div className={`modal-area`}>

        {/* <div className="modal-bg" onClick={() => {
    
}} /> */}
        <div className={`modal-full-contents`}>
            <Header
                title={"서비스 소개"}
                isLogo={false}
            />
            <div className="mt-32" style={{
                padding: "0px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <img style={{ width: 21, height: 16 }} src={images.logo_icon} alt="" />
                <img className="mt-22" src={images.logo_ver} alt="" />
                <p className="mt-32">확실한 인재검증 서비스를 위한</p>
                <p className="font-28 bold mt-8">새로운 패러다임</p>

                <img className="mt-58" style={{ width: "100%" }} src={images.service00} alt="" />
                <img className="mt-32" src={images.hand_down} alt="" />
                <p className="font-18 bold-700 mt-8">
                    <span className="font-18 color-purple bold-700">이럴 때</span> 사용해 보세요.
                </p>

                <IconText
                    className="mt-24"
                    textList={[
                        "지원자 이력의 검증이 필요할 때",
                        "시간과 비용에 대한 절감이 필요할 때",
                        "지원자의 성향과 조직적응에 대한 검증이 필요할 때"
                    ]}
                />

                <NumberText
                    className="mt-56"
                    number="01"
                    title="레퍼런스 체크? 오래 걸리지 않아요"
                    subTitle1={<>
                        신속한 레퍼런스 체크를 통해 채용 과정을 빠르게 완료하세요.
                    </>}
                    subTitle2={<>
                        TrackerColly는 <span style={{ color: "#7257FF", fontSize: 14, fontWeight: 600 }}>하루 만에 인사 정보를 검증합니다.</span>
                    </>}
                />

                <img className="mt-24" style={{ width: "100%" }} src={images.service01} alt="" />

                <NumberText
                    className="mt-56"
                    number="02"
                    title="레퍼런스 요청은 터치 한번으로 끝!"
                    subTitle1={<>
                        자신의 인사정보를 직접 등록하고 기업에 추천서 및
                    </>}
                    subTitle2={<>
                        인사평가서를 <span style={{ color: "#7257FF", fontSize: 14, fontWeight: 600 }}>빠르게 요청해 보세요!</span>
                    </>}
                />
                <img className="mt-24" style={{ width: "100%" }} src={images.service02} alt="" />

                <NumberText
                    className="mt-56"
                    number="03"
                    title="간편하게 관리해 보세요"
                    subTitle1={<>
                        3가지의 ID카드를 통해 <span style={{ color: "#7257FF", fontSize: 14, fontWeight: 600 }}>추천서 요청 및 맴버 관리를</span>
                    </>}
                    subTitle2={<>
                        <span style={{ color: "#7257FF", fontSize: 14, fontWeight: 600 }}>효율적으로 진행해 보세요.</span>
                    </>}
                />
                <img className="mt-24" style={{ width: "100%" }} src={images.service03} alt="" />

                <div
                    className="mt-56"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M13.1777 20.1679C13.4524 20.2318 13.4776 20.5917 13.21 20.6809L11.63 21.2009C7.65998 22.4809 5.56997 21.4109 4.27998 17.4409L2.99997 13.4909C1.71997 9.52086 2.77997 7.42086 6.74997 6.14086L7.27397 5.96733C7.67684 5.83391 8.0689 6.23797 7.95451 6.64664C7.8978 6.84922 7.84326 7.06062 7.78997 7.28086L6.80997 11.4709C5.70997 16.1809 7.31997 18.7809 12.03 19.9009L13.1777 20.1679Z" fill="#7257FF" />
                        <path d="M17.6701 3.42143L16.0001 3.03143C12.6601 2.24143 10.6701 2.89143 9.50006 5.31143C9.20006 5.92143 8.96006 6.66143 8.76006 7.51143L7.78006 11.7014C6.80006 15.8814 8.09006 17.9414 12.2601 18.9314L13.9401 19.3314C14.5201 19.4714 15.0601 19.5614 15.5601 19.6014C18.6801 19.9014 20.3401 18.4414 21.1801 14.8314L22.1601 10.6514C23.1401 6.47143 21.8601 4.40143 17.6701 3.42143ZM15.7901 13.5414C15.7001 13.8814 15.4001 14.1014 15.0601 14.1014C15.0001 14.1014 14.9401 14.0914 14.8701 14.0814L11.9601 13.3414C11.5601 13.2414 11.3201 12.8314 11.4201 12.4314C11.5201 12.0314 11.9301 11.7914 12.3301 11.8914L15.2401 12.6314C15.6501 12.7314 15.8901 13.1414 15.7901 13.5414ZM18.7201 10.1614C18.6301 10.5014 18.3301 10.7214 17.9901 10.7214C17.9301 10.7214 17.8701 10.7114 17.8001 10.7014L12.9501 9.47143C12.5501 9.37143 12.3101 8.96143 12.4101 8.56143C12.5101 8.16143 12.9201 7.92143 13.3201 8.02143L18.1701 9.25143C18.5801 9.34143 18.8201 9.75143 18.7201 10.1614Z" fill="#7257FF" />
                    </svg>
                    <p className="font-20 bold-700 mt-8">레퍼런스 체크 사용 후기</p>
                    <p className="font-14 bold-500 color-gray al-center mt-16">
                        인재를 검증하고 채용 성공률을 높힌 기업들의 <br />
                        후기를 확인해 보세요!
                    </p>
                </div>

                <div className="mt-24" />
                <Swiper
                    style={{
                        width: "100%",
                        background: "#FFF",
                        padding:1
                    }}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    spaceBetween={8}
                    slidesPerView={1.05}
                    pagination={{
                        el: "#containerForBullets2",
                        type: "bullets",
                        bulletClass: "swiper-custom-bullet2",
                        bulletActiveClass: "swiper-custom-bullet-active2",
                        clickable: true,
                    }}
                    resistanceRatio={0}
                >
                    <SwiperSlide ><ReViewItem /></SwiperSlide>
                    <SwiperSlide ><ReViewItem /></SwiperSlide>
                    <SwiperSlide ><ReViewItem /></SwiperSlide>
                </Swiper>

                <div className="mt-16" id="containerForBullets2"></div>

                <div className="mt-130" />
            </div>

            <div className="position-bot">
                <Button
                    type="red"
                    title={"트랙커콜리 시작하기"}
                    onClick={onConfirm}
                />
            </div>
        </div>
    </div>
}

const IconText = (props) => {
    const {
        className = "",
        textList = []
    } = props;
    return <div
        className={className}
        style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            padding: "24px 16px",
            borderRadius: 8,
            background: "#F3F4FF",
            gap: 16,
        }}
    >
        {textList.map(text => {
            return <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <img src={images.verify} alt="" />
                <p className="font-14 bold" style={{ letterSpacing: "-0.42px" }}>{text}</p>
            </div>
        })}
    </div>
}

const NumberText = (props) => {
    const {
        className = "",
        number = "01",
        title = "title",
        subTitle1 = "",
        subTitle2 = "",
    } = props;

    return <div
        className={className}
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}
    >
        <div style={{
            display: "flex",
            width: 98,
            height: 27,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            background: "#312C2C",
            color: "white",
            borderRadius: 100
        }}>{number}</div>
        <p className="font-20 bold-700 mt-16">{title}</p>
        <div className="mt-16" style={{ textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "#A0A0A0", letterSpacing: "-0.35px" }}>
                {subTitle1}
            </p>
            <p className="mt-4" style={{ fontSize: 14, color: "#A0A0A0", letterSpacing: "-0.35px" }}>
                {subTitle2}
            </p>
        </div>
    </div>
}

const ReViewItem = () => {
    return <div style={{
        width: "100%",
        borderRadius: 12,
        border: "1px solid #A999FF",
        padding: 26,
    }}>
        <div style={{ width: 265 }}>
            <p className="font-17 bold-700">
                스마트폰으로 이용할 수 있어 편리하고
                업무 부담이 적어 좋았어요!
            </p>
            <p className="font-15 color-gray mt-16" style={{ lineHeight: 1.5 }}>
                입사 지원한 대상자 마다 전화로 늘 물어보고, 평판조회 진행이 너무 더뎌 야근하는 날이 많았는데 체크메이트로 이틀 만에 레퍼런스 체크를 할 수 있었습니다!
            </p>

            <div
                className="mt-22"
                style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                }}
            >
                <img
                    style={{ width: 48, height: 48, borderRadius: 100, }}
                    src={images.demo_profile} alt="" />
                <div style={{}}>
                    <p className="font-16 bold-500 lh-1">네카라쿠배당토</p>
                    <p className="font-14 color-gray lh-1 mt-8">인사팀</p>
                </div>
            </div>
        </div>
    </div>
}