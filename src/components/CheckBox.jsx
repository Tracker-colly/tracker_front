import { useState } from "react"

export default function CheckBox(props) {
    const {
        style,
        value = false,
        setValue,
        disabled = false
    } = props


    const checkClick = () => {
        setValue(!value);
    }

    return <button
        style={style}
        className={`check-box${value ? " on" : ""}`} onClick={checkClick} disabled={disabled} />
}