import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { hpHypen, patternPwCker2, regEmail } from "../../utils/utils";
import InputCount from "../../components/InputCount";
import CheckBox from "../../components/CheckBox";
import RadioButton from "../../components/RadioButton";
import DaumPostcodeEmbed from "react-daum-postcode";
import AddrButton from "../../components/AddrButton";
import Modal from "../../components/Modal";
import consts from "../../libs/consts"

import * as APIS from "../../utils/service"
import { toast } from "react-toastify";
import { useLoading } from "../../zustand/store";
import ReactQuill from "react-quill";
import InputPhone from "../../components/InputPhone";

export default function Registe() {
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    const [step, setStep] = useState(0);
    const [account, setAccount] = useState("");
    const [errorAccount, seterrorAccount] = useState("");
    const [authNum, setAuthNum] = useState("")
    const [errorAuthNum, seterrorAuthNum] = useState("");
    const [sendAuth, setSendAuth] = useState(false);
    const [limitTime, setLimitTime] = useState(0);
    const [timeEnd, setTimeEnd] = useState(false);

    const [btnDisable, setBtnDisable] = useState(true);

    const [pass1, setpass1] = useState("")
    const [errorpass1, seterrorpass1] = useState("");
    const [pass2, setpass2] = useState("")
    const [errorpass2, seterrorpass2] = useState("");
    const [terms, setTerms] = useState(false);
    const [statusStep1, setStatusStep1] = useState({
        pass1: false,
        pass2: false,
        terms: false,
    })
    const [next1, setNext1] = useState(false);


    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [date, setDate] = useState("")
    const [sex, setSex] = useState("");
    const [sido, setSido] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")

    const [errorPhone, setErrorPhone] = useState("")
    const [errorDate, setErrorDate] = useState("")

    const [statusStep2, setStatusStep2] = useState({
        name: false,
        phone: false,
        date: false,
        address1: false,
        address2: false,
    })

    const [next2, setNext2] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    // 뒤로가기
    const headerBackClick = () => {
        if (step === 0) {
            if (sendAuth) {
                setSendAuth(false);
            } else {
                navigate("/login")
            }
        } else if (step === 1) {
            setpass1("")
            setpass2("")
            setTerms(false)
            setStep(0)
        } else if (step === 2) {
            setStep(1)
        }
    }

    //인증요청 / 인증완료 클릭
    const authBtnClick = () => {
        if (!sendAuth) { // 인증요청
            setLoading(true)
            APIS.postData("/v1/user/sendAuth", {
                type: 1,
                email: account
            }).then(() => {
                setLoading(false)
                setSendAuth(true)
                setLimitTime(consts.TIME_NUM);
            }).catch(e => {
                setLoading(false)
                toast.error(e.response.data)
            })
            // setSendAuth(true)
            // setLimitTime(consts.TIME_NUM);
        } else { // 인증확인
            checkAuthNum();
        }
    }

    // 인증번호 체크
    const checkAuthNum = () => {
        // console.log("인증번호", authNum);
        if (!authNum || String(authNum).length < 6) {
            seterrorAuthNum("6자리 인증번호를 입력해주세요.");
        } else {
            APIS.postData("/v1/user/checkAuth", {
                type: 1,
                email: account,
                authNumber: authNum
            }).then(() => {
                setStep(1)
                setSendAuth(false);
                setAuthNum("");
            }).catch(e => {
                toast.error(e.response.data)
            })
            // setStep(1)
            // setSendAuth(false);
            // setAuthNum("");
        }
    }

    //인증번호 재전송
    const reSendClick = () => {
        setLoading(true)
        APIS.postData("/v1/user/sendAuth", {
            type: 1,
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

    //패스워드1 변경
    useEffect(() => {
        if (pass1 != "" && !patternPwCker2.test(pass1)) {
            seterrorpass1("영문 대소문자+숫자+특수문자 조합으로 8~20자 입력")
            setStatusStep1(v => { return { ...v, pass1: false } })
        } else {
            if (pass1 != "") {
                setStatusStep1(v => { return { ...v, pass1: true } })
            } else {
                setStatusStep1(v => { return { ...v, pass1: false } })
            }
            seterrorpass1("")
        }

        if (pass2 != "" && pass1 !== pass2) {
            seterrorpass2("비밀번호가 일치하지 않습니다.")
            setStatusStep1(v => { return { ...v, pass2: false } })
        } else {
            seterrorpass2("")
            if (pass2 != "") { setStatusStep1(v => { return { ...v, pass2: true } }) }
            else setStatusStep1(v => { return { ...v, pass2: false } })
        }
    }, [pass1]);


    //패스워드2 변경
    useEffect(() => {
        if (pass2 != "" && pass1 !== pass2) {
            seterrorpass2("비밀번호가 일치하지 않습니다.")
            setStatusStep1(v => { return { ...v, pass2: false } })
        } else {
            seterrorpass2("")
            if (pass2 != "") { setStatusStep1(v => { return { ...v, pass2: true } }) }
            else setStatusStep1(v => { return { ...v, pass2: false } })
        }
    }, [pass2]);

    //동의 체크 변경
    useEffect(() => {
        setStatusStep1(v => { return { ...v, terms: terms } })
    }, [terms]);


    // 다음단계 버튼 활성화 체크
    useEffect(() => {
        if (statusStep1.pass1 && statusStep1.pass2 && statusStep1.terms) {
            setNext1(true);
        } else {
            setNext1(false);
        }
    }, [statusStep1])

    // 이메일 인증 다음단계 버튼
    const nextBtnClick1 = () => {
        setStep(2)
    }

    // 이메일주소 유효성 검사
    useEffect(() => {
        if (account != "" && !regEmail.test(account)) {
            seterrorAccount("올바른 이메일 주소를 입력해 주세요.")
            setBtnDisable(true)
        } else {
            seterrorAccount("")
            if (account != "") {
                setBtnDisable(false);
                return;
            }
        }
    }, [account]);

    // 인증번호 유효성검사
    useEffect(() => {
        if (authNum != "" && String(authNum).length < 6) {
            seterrorAuthNum("6자리 인증번호를 입력해 주세요.");
        } else {
            seterrorAuthNum("")
        }
    }, [authNum]);

    useEffect(() => {
        if (name != "") setStatusStep2(v => { return { ...v, name: true } })
        else setStatusStep2(v => { return { ...v, name: false } })
    }, [name])
    useEffect(() => {
        if (phone != "" && phone.length >= 11) {
            setStatusStep2(v => { return { ...v, phone: true } })
            setErrorPhone("")
        } else {
            if (phone == "") {
                setErrorPhone("")
            } else {
                setErrorPhone("휴대폰번호 11자리를 입력하세요.")
            }
            setStatusStep2(v => { return { ...v, phone: false } })
        }
    }, [phone])
    useEffect(() => {
        if (date != "" && date.length >= 8) {
            setStatusStep2(v => { return { ...v, date: true } })
            setErrorDate("")
        } else {
            if (date == "") {
                setErrorDate("")
            } else {
                setErrorDate("생년월일 8자리를 입력하세요.")
            }
            setStatusStep2(v => { return { ...v, date: false } })
        }
    }, [date])
    useEffect(() => {
        if (address1 != "") setStatusStep2(v => { return { ...v, address1: true } })
        else setStatusStep2(v => { return { ...v, address1: false } })
    }, [address1])
    useEffect(() => {
        if (address2 != "") setStatusStep2(v => { return { ...v, address2: true } })
        else setStatusStep2(v => { return { ...v, address2: false } })
    }, [address2])

    // 상세정보 다음단계 체크
    useEffect(() => {
        if (
            statusStep2.name &&
            statusStep2.phone &&
            statusStep2.date &&
            statusStep2.address1 &&
            statusStep2.address2) {
            setNext2(true);
        } else {
            setNext2(false);
        }
    }, [statusStep2])

    // 상세정보 다음단계 버튼 (가입완료)
    const nextBtnClick2 = () => {
        console.log(account)
        console.log(pass1)
        console.log(name)
        console.log(phone)
        console.log(date)
        console.log(sex)
        console.log(sido)
        console.log(address1)
        console.log(address2)

        APIS.postData("/v1/user/registe", {
            email: account,
            pass: pass1,
            name: name,
            hp: phone,
            birth: date,
            sex: sex,
            sido: sido,
            addr1: address1,
            addr2: address2
        }).then(() => {
            setModalOpen(true);
        }).catch(e => {
            toast.error(e.response.data)
        })
    }

    const next2Confirm = () => {
        setModalOpen(false);
        navigate("/login");
    }

    const [term, setTerm] = useState("");
    const getTerm = () => {
        APIS.postData("/v1/setting/term", {
            type: 2
        })
            .then((result) => {
                setTerm(result.data.data);
            }).catch(e => {
                setTerm("")
            })
    }

    useEffect(() => {
        console.log("registe render!");
        getTerm();
    }, [])

    return <Layout
        headerTitle="회원가입"
        leftBtnClick={headerBackClick}
        isHeader >
        {step === 0 && <>
            <div className="content">
                <p className="title1 ">이메일 주소</p>
                <Input className="mt-16"
                    value={account}
                    setValue={setAccount}
                    error={errorAccount}
                    placeHolder="이메일 주소 입력"
                    disabled={sendAuth} />

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
                <Button title={sendAuth ? "인증완료" : "인증요청"} onClick={authBtnClick} disabled={btnDisable} />
            </div>
        </>}

        {step === 1 && <>
            <div className="content">
                <p className="title1 ">이메일 주소</p>
                <Input className="mt-16" value={account} disabled />

                <p className="title1 mt-24">비밀번호</p>
                <Input
                    className="mt-16"
                    inputType="password"
                    value={pass1}
                    setValue={setpass1}
                    error={errorpass1}
                    placeHolder="비밀번호를 입력해주세요."
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

                <div className="mt-40" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12
                }}>
                    <CheckBox value={terms} setValue={setTerms} />
                    <p className="title1">이용약관 및 개인정보 수집 동의</p>
                </div>

                {/* <textarea className="mt-16"
                    value={ }
                    style={{
                        width: "100%",
                        height: "186px",
                        background: "#F3F3F3",
                        borderRadius: 8,
                        padding: 16
                    }} disabled /> */}
                <ReactQuill
                    className={"mt-16"}
                    style={{
                        background: "#F7F7FB",
                        height: "186px",
                        borderRadius: 8,
                    }}
                    value={term?.text}
                    readOnly
                    theme="snow"

                    modules={{
                        toolbar: false
                    }}
                />
            </div>
            <div className="position-bot">
                <Button title="다음" onClick={nextBtnClick1} disabled={!next1} />
            </div>
        </>}

        {step === 2 && <>
            <div className="content">
                <p className="title1 ">이름</p>
                <Input className="mt-16"
                    value={name}
                    setValue={setName}
                    placeHolder="이름을 입력해 주세요" />

                <p className="title1 mt-24">휴대폰 번호</p>
                {/* <Input className="mt-16"
                    value={phone}
                    valueType="number"
                    setValue={(v) => {
                        if (v.length <= 11) setPhone(v)
                    }}
                    placeHolder="휴대폰 번호를 입력해 주세요" /> */}
                <InputPhone
                    className="mt-16"
                    value={phone}
                    setValue={setPhone}
                    placeHolder="휴대폰 번호를 입력해 주세요."
                    error={errorPhone}
                />

                <p className="title1 mt-24">생년월일</p>
                <Input className="mt-16"
                    value={date}
                    valueType="number"
                    setValue={(v) => {
                        if (v.length <= 8) setDate(v)
                    }}
                    type="number"
                    placeHolder="생년월일 8자리를 입력해 주세요"
                    error={errorDate}
                />

                <p className="title1 mt-24">성별</p>
                <RadioButton
                    className="mt-16"
                    value={sex}
                    setValue={setSex}
                    options={[
                        { values: 1, label: "남성" },
                        { values: 2, label: "여성" },
                    ]}
                />

                <p className="title1 mt-24">주소</p>
                <AddrButton
                    address={address1}
                    onAddress={setAddress1}
                    onSido={setSido}
                />
                <Input className="mt-16"
                    value={address2}
                    setValue={setAddress2}
                    placeHolder="상세 주소를 입력해 주세요." />
            </div>

            <div className="position-bot">
                <Button title="완료" onClick={nextBtnClick2} disabled={!next2} />
            </div>
        </>}

        <Modal
            open={modalOpen}
            title="회원가입 완료!"
            message="회원가입이 완료되었습니다."
            confirm="로그인"
            onConfirm={next2Confirm}
        />
    </Layout>
}