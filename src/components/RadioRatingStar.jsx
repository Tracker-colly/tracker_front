import { useEffect, useState } from "react";
import images from "../libs/images"

export default function RadioRatingStar(props) {
    const {
        className = "",
        value = 0,
        setValue,
        disabled = false,
    } = props;

    const [index, setIndex] = useState(0);

    const itemClick = (index) => {
        if (!disabled) {
            if (setValue) setValue(index)
            setIndex(index)
        }
    }

    useEffect(() => {
        setIndex(value)
    }, [value])

    return <div
        className={`${className ? className : ""}`}
        style={{
            display: "flex",
            width: 120,
            height: 24
        }}
    >
        {Array(5).fill(0).map((v, i) => {
            return <div
                style={{}}
                className={`${disabled ? "" : " hand"}`}
                onClick={() => { itemClick(i) }}
            >
                <img width={24} height={24} src={i <= index ? images.StarOn : images.StarOff} alt="" />
            </div>
        })}
    </div >
}