import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { patternPwCker2, regEmail } from "../../utils/utils";
import consts from "../../libs/consts"
import InputCount from "../../components/InputCount";
import Modal from "../../components/Modal";

import * as APIS from "../../utils/service"
import { toast } from "react-toastify";
import { useLoading } from "../../zustand/store";

export default function FindPass() {

    const navigator = useNavigate();
    const { setLoading } = useLoading();

    const [step, setStep] = useState(0);

    const [account, setAccount] = useState("");
    const [errorAccount, setErrorAccount] = useState("");
    const [next1, setNext1] = useState(false);

    const [authNum, setAuthNum] = useState("")
    const [errorAuthNum, seterrorAuthNum] = useState("");
    const [limitTime, setLimitTime] = useState(0);
    const [timeEnd, setTimeEnd] = useState(false);
    const [next2, setNext2] = useState(false);

    const [token, setToken] = useState("")
    const [pass1, setpass1] = useState("")
    const [errorpass1, seterrorpass1] = useState("");
    const [pass2, setpass2] = useState("")
    const [errorpass2, seterrorpass2] = useState("");
    const [statusStep3, setStatusStep3] = useState({
        pass1: false,
        pass2: false,
    })
    const [next3, setNext3] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const headerBackClick = () => {
        if (step === 1 || step === 2) {
            setAuthNum("")
            seterrorAuthNum("")
            setpass1("")
            setpass2("")
            setStep(0);
        } else {
            navigator("/login")
        }
    }

    //------------- step-1 -------------

    useEffect(() => {
        if (account != "" && !regEmail.test(account)) {
            setErrorAccount("올바른 이메일 주소를 입력해 주세요.")
            setNext1(false)
        } else {
            setErrorAccount("")
            if (account != "") {
                setNext1(true);
                return;
            }
        }
    }, [account]);

    // 인증요청 클릭
    const authSendClick = () => {
        // setStep(1);
        // setLimitTime(consts.TIME_NUM);
        setLoading(true)
        APIS.postData("/v1/user/sendAuth", {
            type: 2,
            email: account
        }).then(() => {
            setLoading(false)
            setStep(1);
            setLimitTime(consts.TIME_NUM);
        }).catch(e => {
            setLoading(false)
            toast.error(e.response.data)
        })
    }

    //------------- step-2 -------------

    // 인증번호 유효성검사
    useEffect(() => {
        if (authNum != "" && String(authNum).length < 6) {
            seterrorAuthNum("6자리 인증번호를 입력해 주세요.");
            setNext2(false)
        } else {
            seterrorAuthNum("")
            if (authNum != "") {
                setNext2(true)
            } else {
                setNext2(false)
            }
        }
    }, [authNum]);

    //인증번호 재전송
    const reSendClick = () => {
        setLoading(true)
        APIS.postData("/v1/user/sendAuth", {
            type: 2,
            email: account
        }).then(() => {
            setLoading(false)
            setTimeEnd(false);
            setLimitTime(consts.TIME_NUM);
            toast.success("재전송 하였습니다.", {
                autoClose: 2000
            })
        }).catch(e => {
            setLoading(false)
            toast.error(e.response.data)
        })
        // setTimeEnd(false);
        // setLimitTime(consts.TIME_NUM);
    }

    // 인증완료 클릭
    const authCheckClick = () => {
        APIS.postData("/v1/user/checkAuth", {
            type: 2,
            email: account,
            authNumber: authNum
        }).then((result) => {
            setToken(result.data)
            setStep(2);
        }).catch(e => {
            toast.error(e.response.data)
        })
        // setStep(2);
    }

    //------------- step-3 -------------
    //패스워드1 변경
    useEffect(() => {
        if (pass1 != "" && !patternPwCker2.test(pass1)) {
            seterrorpass1("영문 대소문자+숫자+특수문자 조합으로 8~20자 입력")
            setStatusStep3(v => { return { ...v, pass1: false } })
        } else {
            if (pass1 != "") {
                setStatusStep3(v => { return { ...v, pass1: true } })
            } else {
                setStatusStep3(v => { return { ...v, pass1: false } })
            }
            seterrorpass1("")
        }

        if (pass2 != "" && pass1 !== pass2) {
            seterrorpass2("비밀번호가 일치하지 않습니다.")
            setStatusStep3(v => { return { ...v, pass2: false } })
        } else {
            seterrorpass2("")
            if (pass2 != "") { setStatusStep3(v => { return { ...v, pass2: true } }) }
            else setStatusStep3(v => { return { ...v, pass2: false } })
        }

    }, [pass1]);


    //패스워드2 변경
    useEffect(() => {
        if (pass2 != "" && pass1 !== pass2) {
            seterrorpass2("비밀번호가 일치하지 않습니다.")
            setStatusStep3(v => { return { ...v, pass2: false } })
        } else {
            seterrorpass2("")
            if (pass2 != "") { setStatusStep3(v => { return { ...v, pass2: true } }) }
            else setStatusStep3(v => { return { ...v, pass2: false } })
        }
    }, [pass2]);

    // 다음단계 버튼 활성화 체크
    useEffect(() => {
        if (statusStep3.pass1 && statusStep3.pass2) {
            setNext3(true);
        } else {
            setNext3(false);
        }
    }, [statusStep3])

    const changePassClick = () => {
        APIS.postData("/v1/user/findPass", {
            token: token,
            pass1: pass1,
            pass2: pass2
        }).then((result) => {
            setModalOpen(true)
        }).catch(e => {
            toast.error(e.response.data)
        })
        // setModalOpen(true)
    }

    const goLoginFunc = () => {
        navigator("/login");
    }

    return <Layout
        isHeader
        headerTitle="비밀번호 찾기"
        leftBtnClick={headerBackClick}
    >
        {step === 0 && <>
            <div className="content">
                <p className="info1 mt-22">
                    본인 인증을 위해 가입 시 입력한 이메일을
                    입력해 주세요.
                </p>

                <p className="title1 mt-30">이메일 주소</p>
                <Input className="mt-16"
                    value={account}
                    setValue={setAccount}
                    error={errorAccount}
                    placeHolder="이메일 주소 입력" />
            </div>
            <div className="position-bot">
                <Button title={"인증요청"} onClick={authSendClick} disabled={!next1} />
            </div>
        </>}

        {step === 1 && <>
            <div className="content">
                <p className="info1 mt-22">
                    입력하신 이메일로 인증번호를 보냈어요<br />
                    발송된 인증번호를 입력해 주세요.
                </p>

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
            </div>
            <div className="position-bot">
                <Button title={"인증완료"} onClick={authCheckClick} disabled={!next2} />
            </div>
        </>}

        {step === 2 && <>
            <div className="content">
                <p className="info1 mt-22">
                    본인 인증이 완료되었습니다.<br />
                    변경할 비밀번호를 입력해 주세요.
                </p>

                <p className="title1 mt-24">비밀번호</p>
                <Input
                    className="mt-16"
                    inputType="password"
                    value={pass1}
                    setValue={setpass1}
                    error={errorpass1}
                    placeHolder="새 비밀번호를 입력해 주세요."
                />

                <p className="title1 mt-24">비밀번호 확인</p>
                <Input
                    className="mt-16"
                    inputType="password"
                    value={pass2}
                    setValue={setpass2}
                    error={errorpass2}
                    placeHolder="비밀번호를 한번 더 입력해 주세요."
                />
            </div>
            <div className="position-bot">
                <Button title={"완료"} onClick={changePassClick} disabled={!next3} />
            </div>
        </>}

        <Modal
            open={modalOpen}
            title="비밀번호 변경 완료!"
            message="새로운 비밀번호로 로그인 해주세요."
            confirm="로그인"
            onConfirm={goLoginFunc}
        />
    </Layout>
}