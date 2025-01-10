
import { useEffect, useState } from "react";

import { defaultProfile, randomDigitCharactersSpecialCharacterslength } from "../utils/utils";
import images from "../libs/images"

export default function Profile(props) {
    const {
        className = "",
        labelRef,
        value = "",
        disabled = false,
        onChange,
    } = props;

    const idx = randomDigitCharactersSpecialCharacterslength(10);
    const [thumbSrc, setthumbSrc] = useState("");

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
            //파일 없을 경우
            setthumbSrc("")
        }
    }

    useEffect(() => {
        setthumbSrc(value)
    }, [value])


    return <div style={{
        position: "relative",
        width: 90,
        height: 90,
    }}>
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }} className="profile large">
            <img style={{
                width: 78, height: 78,
                borderRadius: 100,
            }} src={thumbSrc} alt="" onError={defaultProfile} />
        </div>

        {!disabled && <label ref={labelRef} style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 30,
            height: 30,
            background: "white",
            overflow: "hidden",
            border: "1px solid #DCDBDC",
            borderRadius: 100,
            cursor: "pointer"
        }} htmlFor={idx}>
            <img style={{ width: 22, height: 22 }} src={images.camera} alt="" />
        </label>}
        <input style={{ display: "none" }} id={idx} type="file" onChange={onFileChange} disabled={disabled} />
    </div>
}