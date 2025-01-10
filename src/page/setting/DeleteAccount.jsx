import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";

import * as APIS from "../../utils/service"
import { toast } from "react-toastify";
import { useLoading } from "../../zustand/store";

export default function DeleteAccount() {
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    const [pass, setpass] = useState("");
    const [errorpass, seterrorpass] = useState("");

    const [next, setnext] = useState(false);

    const [modalOpen, setmodalOpen] = useState(false);

    const leftBtnClick = () => {
        navigate(-1)
    }

    //탈퇴 클릭
    const delteAccountClick = () => {
        setLoading(true)
        APIS.postData("/v1/setting/delete", {
            pass: pass
        }).then((result) => {
            setLoading(false)
            setmodalOpen(true)
        }).catch(e => {
            setLoading(false)
            toast.error(e.response.data)
        })
    }

    // 완료 확인
    const deleteConfirm = () => {
        window.localStorage.setItem("token", "")
        navigate("/")
    }

    useEffect(() => {
        if (pass != "") {
            setnext(true)
        } else {
            setnext(false)
        }
    }, [pass])

    return <Layout
        headerTitle="계정삭제"
        leftBtnClick={leftBtnClick}
        isHeader
    >
        <div className="content">
            <p className="title-18 mt-22">
                계정 삭제 시 이용중인 ID Card, Track, Inbox<br />
                정보가 모두 삭제됩니다.
            </p>

            <Input
                className="mt-16"
                inputType="password"
                value={pass}
                setValue={setpass}
                error={errorpass}
                placeHolder="현재 비밀번호 입력"
            />

        </div>
        <div className="position-bot">
            <Button title="계정삭제" type="red" disabled={!next} onClick={delteAccountClick} />
        </div>

        <Modal
            open={modalOpen}
            setOpen={setmodalOpen}
            title={"계정을 삭제하였습니다"}
            message={<>
                그동안 트랙커 콜리를 <br />
                사랑해 주셔서 진심으로 감사합니다.
            </>}
            confirm="닫기"
            onConfirm={deleteConfirm}
        />
    </Layout>
}