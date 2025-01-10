import { useEffect, useState } from "react";
import images from "../libs/images"

export default function RadioRating2(props) {
    const {
        className = "",
        value = 1,
        setValue,
        disabled = false,
        list = ["우수하다", "좋다", "만족스럽다", "개선이 필요하다", "불만족스럽다"]
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

    return <div className={`radio4 ${className ? className : ""}`}>
        {list.map((v, i) => {
            return <div className={`box${disabled ? "" : " hand"}`} onClick={() => { itemClick(i) }}>
                <img src={i === index ? images.RadioRed : images.RadioOff} alt="" />
                {v}
            </div>
        })}
    </div >
}