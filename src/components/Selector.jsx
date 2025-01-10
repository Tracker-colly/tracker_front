import { useEffect, useRef, useState } from "react"
import images from "../libs/images"
import { uniqueId } from "lodash";

export default function Selector(props) {
    const {
        className = "",
        options = [],
        value,
        setValue,
        placeholder = "선택",
        disabled = false
    } = props;

    const dropRef = useRef(null);

    const [focus, setFocus] = useState(false)
    const [label, setLabel] = useState("")

    useEffect(() => {
        const handleClick = (e) => {
            if (dropRef.current && !dropRef.current.contains(e.target)) {
                setFocus(false);
            }
        };
        window.addEventListener('mouseup', handleClick);
        return () => {
            window.removeEventListener('mouseup', handleClick)
        };
    }, [dropRef])

    useEffect(() => {
        let values = options?.map(v => v.value);
        if (values?.indexOf(value) >= 0) {
            setLabel(options[values.indexOf(value)]?.label);
        } else {
            setLabel("");
        }

        return () => {
        }
    }, [value])

    return <div ref={dropRef} className={`drop-box ${focus && "focus"} ${className} ${disabled ? "disabled color-gray" : ""}`} onClick={() => {
        if (!disabled) setFocus(!focus);
    }}>
        {label ?
            label :
            <p className="color-gray font-16">{placeholder}</p>
        }
        {/* {focus ? <img src={images.chevron_down} alt="" /> : <img src={images.chevron_down} alt="" />} */}
        {!disabled && <img src={images.chevron_down} alt="" />}
        {focus && <div className="drop-list">
            {options.map((v, i) => {
                return <div key={uniqueId() + i} className="item" onClick={() => {
                    if (setValue) setValue(v?.value);
                    setLabel(v?.label);
                }}>{v.label}</div>
            })}
        </div>}
    </div >
} 