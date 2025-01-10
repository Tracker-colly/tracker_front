import { useEffect, useState } from "react";
import { randomDigitCharactersSpecialCharacterslength } from "../utils/utils";
import images from "../libs/images"

/**
 * 이미지 라디오
 * @param {{
 * className?:string
 * photoList?:string[] | {base:string,ext:string}[]
 * onChange:(list:[])=>void
 * }} props 
 * @returns 
 */
export default function InputImageMulti(props) {
    const {
        className = "",
        photoList = [],
        onChange
    } = props;

    const [thumbList, setthumbList] = useState([])
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
                // const path = event.target.result;
                setthumbList((list) => {
                    let listData = list.concat([data])
                    return listData
                })
                e.target.value = '';
            }
        }
    }

    useEffect(() => {
        if (onChange) onChange(thumbList)
    }, [thumbList])

    const deleteItem = (index) => {
        setthumbList((list) => {
            list.splice(index, 1);
            if (onChange) onChange(list)
            return [...list]
        })
    }

    useEffect(() => {
        if (thumbList.length != photoList.length) {
            setthumbList(photoList)
        }
    }, [photoList])

    useEffect(() => {

    }, [])

    return <div className={`add-image-box ${className && className}`} >
        {thumbList.length > 0 && thumbList.map((v, i) => {
            return <div className="thumb-box">
                {
                    typeof v === "object" ?
                        <img style={{
                            width: "100%",
                            height: "100%"
                        }} className="thumb" src={v?.base} alt="" /> :
                        <img style={{
                            width: "100%",
                            height: "100%"
                        }} className="thumb" src={v} alt="" />
                }
                <img
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 24,
                        height: 24,
                        cursor: "pointer",
                        background: "rgba(0, 0, 0, 0.5)"
                    }}
                    src={images.x_w}
                    alt=""
                    onClick={() => {
                        console.log("delete!!", i)
                        deleteItem(i)
                    }}
                />
            </div>
        })}

        {thumbList.length < 3 && <label htmlFor={idx}>
            <div className="add-box">
                <img src={images.add_circle_grey} alt="" />
                {thumbList.length}/3
            </div>
        </label>}

        <input style={{ display: "none" }} id={idx} type="file" onChange={onFileChange} />
    </div>
} 