import { useEffect, useRef, useState } from "react";

/**
 * 텍스트 인풋
 * (valueType default="text")
 * @param {{
 * className?:string
 * placeHolder?:string
 * value?:string
 * setValue?:(v:string)=>void
 * type?:"large"
 * valueType?:"text" | "number"
 * }} props 
 * @returns 
 */
export default function Input(props) {
    const {
        style = {},
        className,
        placeHolder,
        value,
        setValue,
        type,
        inputType,
        valueType = "text",
        error = "",
        focus = false,
        onBlur,
        onEnter,
        disabled = false,
        maxLength = 255
    } = props;

    const inputRef = useRef(null);
    const [isClear, setIsClear] = useState(false);
    const [inputFocus, setInputFocus] = useState(false);
    const [confType, setConfType] = useState(inputType);

    const onChange = (e) => {
        let value = e.target.value;
        if (setValue) {
            if (valueType === "number") {
                if (value === "") {
                    setValue("")
                    return
                }

                let val = value
                if (!isNaN(val)) setValue(val)
            } else {
                setValue(value)
            }
        }
    }
    const clearFunc = () => {
        if (setValue) {
            setValue("")
        };
    }

    const eyeFunc = () => {
        console.log("confType", confType)
        if (confType === "password") {
            setConfType("text")
        } else {
            setConfType("password")
        }
    }

    useEffect(() => {
        if (value != "") {
            setIsClear(true)
        } else {
            setIsClear(false)
        }
    }, [value])

    return <div
        style={{
            ...style,
            position: "relative",
        }}
        className={className}
    >
        <input
            type={confType}
            ref={inputRef}
            className={`input ${type ? type : ""}${error ? " error" : ""}${disabled ? "off" : ""}`}
            placeholder={placeHolder}
            value={value}
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
        {(inputType === "password" && isClear && !inputFocus) && <button className="input-eye-btn" onClick={eyeFunc}></button>}
        {(isClear && inputFocus) && <button className="input-clear-btn" onClick={clearFunc}></button>}
        {error && <p style={{
            fontSize: 13,
            color: "#DC0000",
            marginTop: 12
        }}>{error}</p>}
    </div >
} 