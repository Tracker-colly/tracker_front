import { uniqueId } from "lodash";
import { useEffect, useState } from "react";
import { randomDigitCharactersSpecialCharacterslength } from "../utils/utils";

/**
 * 이미지 라디오
 * @param {{
 * className?:string
 * options?:{
 *  title:string
 *  imgSrc:string
 * }[]
 * current:number
 * isEdit: boolean
 * disabled: boolean
 * onChange:(current:number)=>void
 * }} props 
 * @returns 
 */
export default function InputImage(props) {
    const {
        className = "",
        value = "",
        isEdit = false,
        disabled = false,
        onChange
    } = props;

    const [initialImg, setInitialImg] = useState("");
    const [thumbSrc, setthumbSrc] = useState("");
    const idx = randomDigitCharactersSpecialCharacterslength(10);

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.log('image is required');
            return false;
        }
        if (!file.name.match(/\.(bmp|jpeg|jpg|png|tiff|tif)$/)) {
            console.log('select valid image.');
            return false;
        }

        if (e.target.files.length > 0) {
            let fileNameList = file.name.split('.');

            const fReader = new FileReader();
            fReader.readAsDataURL(e.target.files[0]);
            fReader.onloadend = function (event) {
                let data = {
                    base: fReader.result,
                    ext: fileNameList[fileNameList.length - 1]
                }
                const path = event.target.result;
                setthumbSrc(path)
                if (onChange) onChange(data)
            }
        } else {
            setthumbSrc("/images/block-img.svg")
        }
    }

    useEffect(() => {
        setInitialImg(value)
        setthumbSrc(value)
    }, [])

    return <div className={`input-image-box ${className && className}`} >
        <label className={disabled && "cursor-nodrop"} htmlFor={idx}>
            <img
                className={`thumb no-drag ${isEdit && "select"}`}
                src={thumbSrc}
                onError={(e) => {
                    // e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/block-img.svg"
                }}
            />
        </label>

        <input style={{ display: "none" }} id={idx} type="file" onChange={onFileChange} disabled={disabled} />
    </div>
} 