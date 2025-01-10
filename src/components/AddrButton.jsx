import { useState } from "react";
import PostCode from "./PostCode";
import images from "../libs/images"

export default function AddrButton(props) {
    const {
        address = "",
        onAddress,
        onSido = (v) => { }
    } = props

    const [isAddrView, setIsAddrView] = useState(false);

    return <>
        {isAddrView && <PostCode
            backClick={() => { setIsAddrView(false) }}
            setAddress={(v) => {
                if (onAddress) onAddress(v)
            }}
            setSido={(v) => {
                onSido(v)
            }}
        />}

        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 12,
            border: "1px solid #E6E9EB",
            borderRadius: 8,
            cursor: "pointer"
        }} onClick={() => { setIsAddrView(true) }} className="mt-16">
            {address ? address : <p style={{ color: "#898D8F" }}>주소 찾기</p>}
            <img src={images.search_1} alt="" />
        </div>
    </>
}