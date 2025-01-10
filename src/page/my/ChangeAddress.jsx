import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Layout from "../../layout/Layout";
import AddrButton from "../../components/AddrButton";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as APIS from "../../utils/service"

export default function ChangeAddress() {
    const navigate = useNavigate();

    const [sido, setSido] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");

    const [next, setnext] = useState(false);

    const backBtnClick = () => {
        navigate("/myInfo", { replace: true });
    }

    const nextBtnClick = () => {
        console.log("sido:", sido)
        console.log("address1:", address1)
        console.log("address2:", address2)
        // toast.success("주소를 변경하였습니다.")
        // navigate("/myInfo", { replace: true });
        APIS.postData("/v1/user/editAddr", {
            sido: sido,
            addr1: address1,
            addr2: address2,
        }).then(() => {
            toast.success("주소를 변경하였습니다.")
            navigate("/myInfo", { replace: true });
        }).catch(e => {
            toast.error(e.response.data)
        })
    }

    useEffect(() => {
        if (address1 != "" && address2 != "") {
            setnext(true)
        } else {
            setnext(false)
        }
    }, [address1, address2])

    return <Layout
        isHeader
        headerTitle="주소 변경"
        leftBtnClick={backBtnClick}
    >
        <div className="content">
            <p className="info1 mt-22">
                변경하려는 주소를 입력해 주세요
            </p>

            <p className="title1 mt-40">기본 주소</p>
            <AddrButton
                address={address1}
                onAddress={setAddress1}
                onSido={setSido}
            />
            <p className="title1 mt-20">상세 주소</p>
            <Input className="mt-16"
                value={address2}
                setValue={setAddress2}
                placeHolder="상세 주소를 입력해 주세요." />
        </div>

        <div className="position-bot">
            <Button title="완료" onClick={nextBtnClick} disabled={!next} />
        </div>
    </Layout>
}