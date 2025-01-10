import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import CheckBoxIOS from "../../components/CheckBoxIOS";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as APIS from "../../utils/service"
import { useLoading } from "../../zustand/store";

export default function CompanySetting() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(window.location.search);
    const { setLoading } = useLoading();

    const [companyInfo, setCompanyInfo] = useState({});

    const [pubCheck, setPubCheck] = useState(false)
    const [connectCheck, setConnectCheck] = useState(false)

    const leftBtnClick = () => {
        navigate(-1)
    }

    //공개설정 변경
    const pubSetFunc = (isCheck) => {
        comEditFunc(isCheck, connectCheck);
    }

    //연결요청 변경
    const connectSetFunc = (isCheck) => {
        comEditFunc(pubCheck, isCheck);
    }

    const comEditFunc = (pCheck, lCheck) => {
        let sendData = {
            comId: companyInfo.idx,
            photo1: "no del",
            photo2: "no del",
            photo3: "no del",
            share: pCheck,
            link: lCheck,
        }

        // console.log(pCheck, lCheck)
        // return;
        setLoading(true)
        APIS.postData("/v1/company/edit", sendData).then((result) => {
            setLoading(false)
            toast.success("설정 완료");
            setPubCheck(pCheck)
            setConnectCheck(lCheck)
        }).catch(e => {
            setLoading(false)
            toast.error(e.response.data)
        })
    }

    const loadCompany = (idx) => {
        APIS.postData("/v1/company/info", {
            comId: idx,
        }).then((result) => {
            let comData = result.data.data
            setCompanyInfo(comData)
            setPubCheck(comData?.share)
            setConnectCheck(comData?.link)
        }).catch(e => {
            navigate(-1)
            toast.error(e.response.data)
        })
    }

    useEffect(() => {
        console.log("com set rander")
        let companyIdx = Number(params.get("idx"))
        if (companyIdx) {
            loadCompany(companyIdx)
        } else {
            toast.error("회사정보를 가져올 수 없습니다.")
            navigate(-1);
        }
    }, [])

    return <Layout
        isHeader
        headerTitle="설정"
        leftBtnClick={leftBtnClick}
    >
        <div className="content">
            <div>
                <div className="mt-24" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div className="title2">공개 설정</div>
                        <CheckBoxIOS value={pubCheck} setValue={pubSetFunc} />
                    </div>
                    <div className="info2">
                        Workplace Card를 공개할지의 여부를
                        설정하는 기능입니다.
                    </div>

                </div>
                <div className="mt-24" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div className="title2">연결 요청 설정</div>
                        <CheckBoxIOS value={connectCheck} setValue={connectSetFunc} />
                    </div>
                    <div className="info2">
                        멤버 연결 요청을 받을지의 여부를 설정
                        해주는 기능입니다.
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}