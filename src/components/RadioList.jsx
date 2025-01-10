import { useEffect, useState } from "react";
import images from "../libs/images"

export default function RadioList(props) {
    const {
        className = "",
        options = [],
        value,
        setValue,
        disabled = false,
    } = props;
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let index = options.findIndex(v => v.values == value)
        setIndex(index)
    }, [value])

    useEffect(() => {
        if (options.length > 0) {
            let values = options?.map(v => v.values);
            if (values?.indexOf(value) >= 0) setIndex(values.indexOf(value))
            else {
                if (setValue) setValue("")
            }
        }
    }, [value])

    return <div
        className={`${className ? className : ""}`}
        style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
        }}
    >
        {options.map((v, i) => {
            return <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 12,
                    backgroundColor: i == index ? "#FFF6F6" : "white",
                    border: `1px solid ${i == index ? "#FDBFC3" : "#E6E9EB"}`,
                    borderRadius: 8
                }}
                className={`${disabled ? "" : " hand"}`}
                onClick={() => {
                    if (disabled) return
                    if (setValue) setValue(options[i]?.values)
                    setIndex(i)
                }}
            >
                <img width={24} height={24} src={i == index ? images.check_red : images.check_gary} alt="" />
                <p style={{
                    color: i == index ? "#C62832" : "#898D8F",
                    fontSize: 16,
                    fontWeight: 500,
                }}>{v.label}</p>
            </div>
        })}
    </div >
}