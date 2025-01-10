import { uniqueId } from "lodash";
import { useEffect, useState } from "react";

/**
 * 이미지 라디오
 * @param {{
 * className?:string
 * options?:{
 *  title:string
 *  imgSrc:string
 * }[]
 * current:number
 * onChange:(current:number)=>void
 * }} props 
 * @returns 
 */
export default function RadioImage(props) {
    const {
        className = "",
        options = [],
        current = 0,
        onChange
    } = props;

    const [index, setIndex] = useState(current)

    useEffect(() => {
        setIndex(current)
    }, [current]);

    return <div className={`image-radio ${className ? className : ""}`}>
        {options.map((v, i) => {
            return <div key={uniqueId()} className="item" >
                <img
                    className={`thumb no-drag ${i === index ? "select" : ""}`}
                    src={v.imgSrc} alt=""
                    onClick={() => {
                        setIndex(i);
                        if (onChange) onChange(i)
                    }}
                />
                <textarea className="title body2" readOnly value={v?.title} />
            </div>
        })}

        {options.length <= 0 && <div className="item" >
            <img
                className={`thumb no-drag`}
                src="/images/block-img.svg" alt=""
            />
            <textarea className="title body2" readOnly value={"목록 없음"} />
        </div>}
    </div>
} 