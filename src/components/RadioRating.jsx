import { useEffect, useState } from "react";
import images from "../libs/images"

export default function RadioRating(props) {
    const {
        className = "",
        value = 3,
        setValue,
        disabled = false,
    } = props;

    const [index, setIndex] = useState(3);

    const itemClick = (index) => {
        if (!disabled) {
            if (setValue) setValue(index)
            setIndex(index)
        }
    }

    useEffect(() => {
        setIndex(value)
    }, [value])

    return <div className={`radio3 ${className ? className : ""}`}>
        <div className={`box${disabled ? "" : " hand"}`} onClick={() => { itemClick(5) }}>
            <img className="large" src={5 === index ? images.RadioRed : images.RadioOff} alt="" />
            매우잘함
        </div>
        <div className={`box${disabled ? "" : " hand"}`} onClick={() => { itemClick(4) }}>
            <img className="medium" src={4 === index ? images.RadioRed : images.RadioOff} alt="" />
            잘함
        </div>
        <div className={`box${disabled ? "" : " hand"}`} onClick={() => { itemClick(3) }}>
            <img className="small" src={3 === index ? images.RadioRed : images.RadioOff} alt="" />
            보통
        </div>
        <div className={`box${disabled ? "" : " hand"}`} onClick={() => { itemClick(2) }}>
            <img className="medium" src={2 === index ? images.RadioRed : images.RadioOff} alt="" />
            약함
        </div>
        <div className={`box${disabled ? "" : " hand"}`} onClick={() => { itemClick(1) }}>
            <img className="large" src={1 === index ? images.RadioRed : images.RadioOff} alt="" />
            매우약함
        </div>
    </div >
}