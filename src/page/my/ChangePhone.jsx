import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import InputCount from "../../components/InputCount";
import consts from "../../libs/consts"
import { toast } from "react-toastify";
import * as APIS from "../../utils/service"
import { useLoading, useUser } from "../../zustand/store";
import InputPhone from "../../components/InputPhone";

export default function ChangePhone() {
    const navigate = useNavigate();
    const { userInfo } = useUser();
    const { setLoading } = useLoading();

    const [phone, setPhone] = useState("");
    const [errorPhone, seterrorPhone] = useState("");

    const [sendAuth, setSendAuth] = useState(false);

    const [authNum, setAuthNum] = useState("")
    const [errorAuthNum, seterrorAuthNum] = useState("");
    const [limitTime, setLimitTime] = useState(0);
    const [timeEnd, setTimeEnd] = useState(false);

    const [next1, setnext1] = useState(false)
    const [next2, setnext2] = useState(false)

    const backBtnClick = () => {
        navigate("/myInfo", { replace: true });
    }

    const editPhoneFunc = () => {
        APIS.postData("/v1/user/editPhone", {
            type: 1,
            hp: phone,
        }).then(() => {
            navigate("/myInfo", { replace: true });
            toast.success("핸드폰 번호를 변경하였습니다.")
        }).catch(e => {
            toast.error(e.response.data)
        })
    }

    const authSendClick = () => {
        editPhoneFunc();
        return;
        if (sendAuth) {
            //check 인증번호
            // navigate("/myInfo", { replace: true });
            // toast.success("핸드폰 번호를 변경하였습니다.")
            if (!authNum || String(authNum).length < 6) {
                seterrorAuthNum("6자리 인증번호를 입력해주세요.");
            } else {
                APIS.postData("/v1/user/checkAuth", {
                    type: 3,
                    email: userInfo.email,
                    authNumber: authNum
                }).then(() => {
                    editPhoneFunc();
                }).catch(e => {
                    toast.error(e.response.data)
                })
            }

        } else {
            APIS.postData("/v1/user/sendAuth", {
                type: 3,
                email: userInfo.email
            }).then(() => {
                setLimitTime(consts.TIME_NUM);
                setSendAuth(true)
            }).catch(e => {
                toast.error(e.response.data)
            })
        }
    }

    const reSendClick = () => {
        APIS.postData("/v1/user/sendAuth", {
            type: 3,
            email: userInfo.email
        }).then(() => {
            setTimeEnd(false);
            setLimitTime(consts.TIME_NUM);
        }).catch(e => {
            toast.error(e.response.data)
        })
    }

    useEffect(() => {
        if (phone.length >= 11) {
            setnext1(true)
            seterrorPhone("")
        } else {
            if (phone == "") {
                seterrorPhone("")
            } else {
                seterrorPhone("휴대폰 번호 11자리를 입력하세요.")
            }
            setnext1(false)
        }
    }, [phone])

    useEffect(() => {
        if (authNum.length >= 6) {
            setnext2(true)
        } else {
            setnext2(false)
        }
    }, [authNum])

    return <Layout
        isHeader
        headerTitle="휴대폰 인증"
        leftBtnClick={backBtnClick}
    >
        <div className="content">
            {sendAuth ? <p className="info1 mt-22">
                등록된 이메일로 인증번호를 보냈습니다.<br />
                인증번호를 입력해 주세요.
            </p> : <p className="info1 mt-22">
                휴대폰 번호 변경을 위해 변경하려는<br />
                휴대폰 번호를 입력해 주세요.
            </p>}


            <p className="title1 mt-48">휴대폰 번호</p>
            {/* <Input className="mt-16"
                // valueType="number"
                value={phone}
                setValue={(v) => {
                    setPhone(v)
                }}
                error={errorPhone}
                placeHolder="숫자만 입력해 주세요."
                maxLength={11}
                disabled={sendAuth}
            /> */}

            <InputPhone
                className="mt-16"
                value={phone}
                setValue={setPhone}
                placeHolder="숫자만 입력해주세요."
                error={errorPhone}
                disabled={sendAuth}
            />

            {sendAuth && <>
                <p className="title1 mt-24">인증번호 입력</p>
                <InputCount className="mt-16"
                    value={authNum}
                    setValue={setAuthNum}
                    error={errorAuthNum}
                    limitTime={limitTime}
                    setLimitTime={setLimitTime}
                    onTimeEnd={() => {
                        setTimeEnd(true);
                    }}
                    placeHolder="인증번호 6자리를 입력해 주세요."
                />
                <Button className="round mt-16" type="line" title="재전송" onClick={reSendClick} />
            </>}
        </div>

        <div className="position-bot">

            {sendAuth ?
                <Button title={"인증완료"} onClick={authSendClick} disabled={!next2} /> :
                // <Button title={"인증요청"} onClick={authSendClick} disabled={!next1} />
                <Button title={"완료"} onClick={authSendClick} disabled={!next1} />
            }

        </div>
    </Layout>
}