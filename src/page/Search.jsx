import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import images from "../libs/images"
import * as APIS from "../utils/service"

import Layout from "../layout/Layout";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Selector from "../components/Selector";
import { toast } from "react-toastify";
import InputPhone from "../components/InputPhone";

export default function Search() {
    const navigate = useNavigate();

    const [inpuCount, setInputCount] = useState(0);

    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [serial, setserial] = useState("");

    const leftBtnClick = () => {
        navigate(-1)
    }

    const searchClick = () => {
        searchFunc();
        // if (serial.indexOf("#9") >= 0) {
        //     navigate("/searchResultCompany")
        // } else {
        //     navigate("/searchResult", {
        //         state: {
        //             name: "김검색",
        //             email: "search@naver.com",
        //             serial: "#12121211"
        //         }
        //     })
        // }
    }

    const searchFunc = () => {
        let sendData = {
            name: name,
            hp: phone,
            email: email,
            serial: serial
        }
        console.log("sendData", sendData);

        APIS.postData("/v1/search", sendData)
            .then((result) => {
                let searchData = result.data.data;

                if (searchData?.type == "company") {
                    navigate("/searchResultCompany", {
                        state: {
                            companyList: searchData?.list
                        }
                    })
                } else {
                    navigate("/searchResult", {
                        state: {
                            userInfo: searchData
                        }
                    })
                }
            }).catch(e => {
                toast.error(e.response.data)
            })
    }

    useEffect(() => {
        let count = 0;
        if (name != "") count += 1;
        if (phone != "") count += 1;
        if (email != "") count += 1;
        if (serial != "") count += 1;

        setInputCount(count);
    }, [name, phone, email, serial])

    useEffect(() => {
        console.log("search")
    }, [])

    return <Layout
        headerTitle={"검색"}
        leftBtnClick={leftBtnClick}
        isHeader
    >
        <div className="content" >
            <p className="title-18 mt-4"><span className={`title-18${inpuCount < 2 ? "" : " color-success"}`}>{inpuCount}</span>/4</p>
            <p className="title-18">두가지 이상의 검색란을 채워주세요.</p>

            <div className="font-16 bold-500 mt-35">이름 및 기업명</div>
            <Input
                className="mt-10"
                placeHolder="이름 및 기업명을 입력해주세요."
                value={name}
                setValue={setname}
            />

            <div className="font-16 bold-500 mt-18">핸드폰 번호</div>
            {/* <Input
                className="mt-10"
                valueType="number"
                placeHolder="핸드폰 번호를 입력해 주세요."
                value={phone}
                setValue={(v) => {
                    if (v.length <= 11) setphone(v)
                }}
            /> */}
            <InputPhone
                className="mt-10"
                placeHolder="핸드폰 번호를 입력해 주세요."
                value={phone}
                setValue={setphone}
            />

            <div className="font-16 bold-500 mt-18">이메일</div>
            <Input
                className="mt-10"
                placeHolder="이메일을 입력해주세요."
                value={email}
                setValue={setemail}
            />

            <div className="font-16 bold-500 mt-18">시리얼 넘버</div>
            <Input
                className="mt-10"
                valueType="number"
                placeHolder="시리얼 넘버를 입력해주세요."
                value={serial}
                setValue={setserial}
            />

            <div
                className="mt-20"
                style={{
                    flexGrow: 10,
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                    gap: 14,
                    paddingBottom: 20
                }}
            >
                <Button
                    title="검색"
                    onClick={searchClick}
                    disabled={inpuCount < 2}
                />
                <p
                    className="font-14 color-success under-line hand al-center"
                    onClick={() => {
                        navigate("/requestMember")
                    }}
                >
                    찾으시는 맴버가 없으신가요?
                </p>
            </div>
        </div>
    </Layout>
}