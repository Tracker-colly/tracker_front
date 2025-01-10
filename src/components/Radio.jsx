import { useEffect, useState } from "react";
import images from "../libs/images"

export default function Radio(props) {
    const {
        className = "",
        options = [],
        value,
        setValue
    } = props;
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (options.length > 0) {
            let values = options?.map(v => v.values);
            if (values?.indexOf(value) >= 0) setIndex(values.indexOf(value))
            else {
                if (setValue) setValue(options[0]?.values)
            }
        }
    }, [value])

    return <div className={`radio ${className ? className : ""}`}>
        {options.map((v, i) => {
            return <div className="box" onClick={() => {
                if (setValue) setValue(options[i]?.values)
                setIndex(i)
            }}>
                <img src={i === index ? images.RadioOn : images.RadioOff} alt="" />
                {v.label}
            </div>
        })}
    </div >
}