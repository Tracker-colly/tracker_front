import moment from "moment";
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
export default function InputCount(props) {
    const {
        style = {},
        className,
        placeHolder,
        value,
        setValue,
        type,
        inputType,
        valueType = "number",
        error = "",
        focus = false,
        onEnter,
        limitTime = 0,
        setLimitTime,
        onTimeEnd
    } = props;

    const inputRef = useRef(null);
    const [isClear, setIsClear] = useState(false);
    const [inputFocus, setInputFocus] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    const onChange = (e) => {
        let value = e.target.value;
        if (setValue) {
            if (valueType === "number") {
                if (value === "") {
                    setValue("")
                    return
                }

                let val = (value)
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

    useEffect(() => {
        if (value != "") {
            setIsClear(true)
        } else {
            setIsClear(false)
        }
    }, [value])

    let interval = null;
    const startInterval = () => {
        if (interval) clearInterval(interval);
        if (setLimitTime) {
            interval = setInterval(() => {
                console.log("setInterval");
                setLimitTime((cnt) => {
                    if (cnt <= 0) {
                        clearInterval(interval);
                        if (onTimeEnd) onTimeEnd();
                        return 0
                    }
                    return cnt - 1
                });
            }, 1000)
        }
    }

    useEffect(() => {
        if (isEnd) {
            startInterval();
            setIsEnd(false)
        } else if (limitTime <= 0) {
            setIsEnd(true);
        }
    }, [limitTime])

    useEffect(() => {
        startInterval();

        return () => {
            console.log("unmount!")
            if (interval) clearInterval(interval);
        }
    }, [])

    return <div
        style={{
            ...style,
            position: "relative",
        }}
        className={`${className ? " " + className : ""}`}
    >
        <input
            type={inputType}
            ref={inputRef}
            className={`input count ${type ? type : ""}${error ? " error" : ""}`}
            placeholder={placeHolder}
            value={value}
            onChange={onChange}
            onFocus={(e) => {
                setInputFocus(true)
            }}
            autoFocus={focus}
            maxLength={6}
            onKeyDown={(e) => {
                if (e.code == "Enter")
                    if (onEnter) onEnter();
            }}
        />
        <div className="input-timer">{moment(limitTime * 1000).format("mm:ss")}</div>

        {(isClear && inputFocus) && <button
            className="input-clear-btn"
            onClick={clearFunc}
            style={{
                right:52
            }}
        ></button>}

        {error && <p style={{
            fontSize: 13,
            color: "#DC0000",
            marginTop: 12
        }}>{error}</p>}
    </div >
} 