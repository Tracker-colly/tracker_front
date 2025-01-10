import { useEffect, useState } from "react";
import images from "../libs/images"
import { uniqueId } from "lodash";

export default function RadioButton(props) {
    const {
        className = "",
        options = [],
        value,
        setValue,
        color = "",
        count = 2,
        disabled = false
    } = props;

    const [index, setIndex] = useState("");

    useEffect(() => {
        let index = options.findIndex(v => v.values == value)
        if (index >= 0) setIndex(index);
    }, [value])

    return <div className={`radio2 ${className ? className : ""}`}>
        {options.map((v, i) => {
            return <div key={uniqueId() + i} className={`box${i === index ? " on " + color : ""}${" wrap" + count}`} onClick={() => {
                if (disabled) return
                setIndex(i)
                if (setValue) setValue(options[i]?.values)
            }}>
                {v.label}
            </div>
        })}
    </div >
}