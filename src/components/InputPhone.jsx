import { useEffect, useRef, useState } from "react";

/**
 * 텍스트 휴대폰 인풋
 */
export default function InputPhone(props) {
    const {
        style = {},
        className,
        placeHolder,
        value,
        setValue,
        type,
        error = "",
        focus = false,
        onBlur,
        onEnter,
        disabled = false,
        maxLength = 13
    } = props;

    const inputRef = useRef(null);
    const [isClear, setIsClear] = useState(false);
    const [inputFocus, setInputFocus] = useState(false);
    const [viewValue, setViewValue] = useState("")

    const onChange = (e) => {
        let value = e.target.value;
        if (setValue) {
            setValue(value.replaceAll("-", ""));
        }
    }
    const clearFunc = () => {
        if (setValue) {
            setValue("")
        };
    }

    const parsingPhoneNumber = (num) => {
        return num
            .replace(/[^0-9]/g, "")
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
            .replace(/(-{1,2})$/g, "");
    };

    useEffect(() => {
        if (value != "") {
            setIsClear(true)
        } else {
            setIsClear(false)
        }
        setViewValue(parsingPhoneNumber(value))
    }, [value])

    return <div
        style={{
            ...style,
            position: "relative",
        }}
        className={className}
    >
        <input
            ref={inputRef}
            className={`input ${type ? type : ""}${error ? " error" : ""}${disabled ? "off" : ""}`}
            placeholder={placeHolder}
            value={viewValue}
            onChange={onChange}
            onFocus={(e) => {
                setInputFocus(true)
            }}
            autoFocus={focus}
            onBlur={() => {
                setTimeout(() => {
                    setInputFocus(false)
                }, 200)
                if (onBlur) onBlur();
            }}
            maxLength={maxLength}
            onKeyDown={(e) => {
                if (e.code == "Enter")
                    if (onEnter) onEnter();
            }}
            disabled={disabled}
        />
        {(isClear && inputFocus) && <button className="input-clear-btn" onClick={clearFunc}></button>}
        {error && <p style={{
            fontSize: 13,
            color: "#DC0000",
            marginTop: 12
        }}>{error}</p>}
    </div >
} 