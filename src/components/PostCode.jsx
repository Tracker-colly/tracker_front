import DaumPostcodeEmbed from "react-daum-postcode"
import images from "../libs/images"

export default function PostCode(props) {
    const {
        backClick,
        setAddress,
        setSido,
    } = props;

    const leftClick = () => {
        if (backClick) backClick();
    }

    const handleComplete = (data) => {
        if (setAddress) setAddress(data.roadAddress)
        if (setSido) setSido(data.sido)
        if (backClick) backClick();
    }

    return <div style={{
        position: "fixed",
        width: "100%",
        maxWidth: 600,
        height: "100%",
        top: 0,
        left: "50%",
        transform: "translate(-50%, 0%)",
        background: "#FFFFFF",
        zIndex: 10,
    }}>

        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 64,
        }}>
            <p style={{ fontSize: 20, fontWeight: 600 }}>주소 변경</p>
            <button
                style={{
                    position: "absolute",
                    width: 32,
                    height: 32,
                    left: 9
                }}
                onClick={leftClick}
            ><img className="logo" src={images.x} /></button>
        </div>
        <DaumPostcodeEmbed style={{
            height: "calc(100% - 64px)"
        }} onComplete={handleComplete} />
    </div>
}