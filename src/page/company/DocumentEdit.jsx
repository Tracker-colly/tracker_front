import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import CheckBoxIOS from "../../components/CheckBoxIOS";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RadioRating2 from "../../components/RadioRating2";
import RadioRating from "../../components/RadioRating";
import LineBox from "../../components/LineBox";
import Button from "../../components/Button";
import Input from "../../components/Input";

import images from "../../libs/images"
import consts from "../../libs/consts"
import TabMenu from "../../components/TabMenu";
import ModalDocView from "../../components/ModalDocView";
import * as APIS from "../../utils/service"

// 평가 항목 추가 버튼
const DocAddBtn = (props) => {
    const {
        onClick = () => { }
    } = props

    return <div
        className="mt-50"
        style={{
            display: "flex",
            justifyContent: "center",
        }}
    >
        <div
            style={{
                display: "flex",
                gap: 6,
                alignItems: "center",
                cursor: "pointer"
            }}
            onClick={onClick}>
            <img src={images.add_icon_blue} alt="" />
            <p>평가 항목 추가</p>
        </div>
    </div >
}
// 평가 항목 아이템
const DocItem = (props) => {
    const {
        title,
        setTitle,
        message,
        setMessage,
        deleteClick = () => { }
    } = props;

    return <div className="mt-50">
        <div className="flex-between center">
            <p className="bold">평가 항목</p>
            <img className="hand" src={images.x} alt=""
                onClick={deleteClick}
            />
        </div>

        <Input
            className="mt-18"
            placeHolder="(예시: 근무 태도)"
            value={title}
            setValue={v => {
                if (setTitle) setTitle(v);
            }}
        />

        <p className="bold mt-24">평가 질문</p>
        <textarea
            className="input text-area mt-18"
            style={{
                height: 148
            }}
            value={message}
            onChange={e => {
                if (setMessage) setMessage(e.target.value);
            }}
            maxLength={100}
            placeholder="예시: 올바른 인성으로 회사 사원으로 역할을 인지하고 있는가?"
        />
    </div>
}

export default function DocumentEdit() {
    const navigate = useNavigate();
    const location = useLocation();

    const [tabIndex, setTabIndex] = useState(0);

    const [comId, setComId] = useState("");
    const [addDocs, setAddDocs] = useState([]);
    const [docList, setDocList] = useState([]);

    const [isView, setIsView] = useState(false);
    // 뒤로가기
    const leftBtnClick = () => {
        navigate(-1)
    }

    // 미리보기
    const textClick = () => {
        setIsView(true)
    }
    // 취소
    const cancleBtnClick = () => {
        navigate(-1)
    }
    // 수정완료
    const editBtnClick = () => {
        if (tabIndex == 0) {
            let error = false;
            for (let data of addDocs) {
                if (!data.title) {
                    error = true;
                    break;
                }

                for (let child of data.child) {
                    if (!child.title || !child.message) {
                        error = true;
                        break;
                    }
                }
            }
            if (error) {
                toast.error("입력되지 않은 항목이 있습니다.")
                return;
            }

            // console.log(addDocs);
            setDocList(v => {
                return [...v, ...addDocs]
            })
            setTabIndex(1)
        } else if (tabIndex == 1) {
            // 수정완료
            console.log(comId)
            console.log(docList);
            // 항목 체크
            let error = false;
            for (let data of docList) {
                if (!data.title) {
                    error = true;
                    break;
                }

                for (let child of data.child) {
                    if (!child.title || !child.message) {
                        error = true;
                        break;
                    }
                }
            }
            if (error) {
                toast.error("입력되지 않은 항목이 있습니다.")
                return;
            }

            APIS.postData("/v1/company/editDoc", {
                comId: comId,
                editData: docList
            }).then((result) => {
                toast.success("인사평가 양식이 수정되었습니다.")
                navigate(-1)
            }).catch(e => {
                toast.error(e.response.data)
            })
        }
    }

    const addDocDelete = (index) => {
        setAddDocs(prev => {
            if (prev.length > 1) {
                prev.splice(index, 1)
            } else {
                toast.error("1개 이상의 평가 주제가 있어야 합니다.")
            }
            return [...prev]
        })
    }

    const addDocEdit = (value, index) => {
        setAddDocs(prev => {
            if (prev[index]) {
                prev[index].title = value
            }
            return [...prev]
        })
    }

    const addDocChildEdit = (type, value, pIndex, index) => {
        setAddDocs(prev => {
            if (type == "title") {
                if (prev[pIndex]) {
                    prev[pIndex].child[index].title = value
                }
            } else if (type == "message") {
                if (prev[pIndex]) {
                    prev[pIndex].child[index].message = value
                }
            }
            return [...prev]
        })

    }

    const addDocPlus = (value, index) => {
        setAddDocs(prev => {
            prev.push({ title: "", child: [{ title: "", message: "", }] })
            return [...prev]
        })
    }

    const addDocChildPlus = (index) => {
        setAddDocs(prev => {
            if (prev[index]) {
                prev[index].child.push({ title: "", message: "" })
            }
            return [...prev]
        })
    }

    const addDocChildDelete = (pIndex, childIndex) => {
        setAddDocs(prev => {
            if (prev[pIndex]) {
                if (prev[pIndex].child.length > 1)
                    prev[pIndex].child.splice(childIndex, 1)
                else
                    toast.error("1개 이상의 평가항목이 있어야 합니다.")
            }
            return [...prev]
        })
    }

    const listDocDelete = (index) => {
        setDocList(prev => {
            if (prev.length > 1) {
                prev.splice(index, 1)
            } else {
                toast.error("1개 이상의 평가 주제가 있어야 합니다.")
            }
            return [...prev]
        })
    }

    const listDocEdit = (value, index) => {
        setDocList(prev => {
            if (prev[index]) {
                prev[index].title = value
            }
            return [...prev]
        })
    }

    const listDocChildEdit = (type, value, pIndex, index) => {
        setDocList(prev => {
            if (type == "title") {
                if (prev[pIndex]) {
                    prev[pIndex].child[index].title = value
                }
            } else if (type == "message") {
                if (prev[pIndex]) {
                    prev[pIndex].child[index].message = value
                }
            }
            return [...prev]
        })
    }

    const listDocChildPlus = (index) => {
        setDocList(prev => {
            if (prev[index]) {
                prev[index].child.push({ title: "", message: "" })
            }
            return [...prev]
        })
    }

    const listDocChildDelete = (pIndex, childIndex) => {
        setDocList(prev => {
            if (prev[pIndex]) {
                if (prev[pIndex].child.length > 1)
                    prev[pIndex].child.splice(childIndex, 1)
                else
                    toast.error("1개 이상의 평가항목이 있어야합니다.")
            }
            return [...prev]
        })
    }

    useEffect(() => {
        if (tabIndex == 0) {
            setAddDocs(v => {
                return [{ title: "", child: [{ title: "", message: "", }] }]
            })
        } else if (tabIndex == 1) {

        }

    }, [tabIndex])

    useEffect(() => {
        if (location.state?.docList && location.state?.comId) {
            setComId(location.state?.comId)
            setDocList(location.state?.docList)
        } else {
            toast.error("양식 정보를 불러올 수 없습니다.")
            navigate(-1)
        }
    }, []);

    return <Layout
        isHeader
        headerTitle="양식 수정"
        leftBtnClick={leftBtnClick}
        text={"미리보기"}
        textClick={textClick}
    >
        <TabMenu
            style={{
                position: "fixed",
                top: 64,
                zIndex: 10,
                width: "100%",
                maxWidth: 600,
                background: "#FFF"
            }}
            menuList={["양식 추가", "양식 목록"]}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
        />

        <div className="content">
            <div className="mt-56"></div>
            {tabIndex == 0 && addDocs.map((addDoc, index) => {
                return <>
                    {index > 0 && <LineBox className="mt-28" />}
                    <div className={`flex-between center ${index > 0 ? "mt-46" : "mt-26"}`}>
                        <p className="bold">평가 주제</p>
                        <img className="hand" src={images.x} alt=""
                            onClick={()=>{
                                addDocDelete(index)
                            }}
                        />
                    </div>
                    {/* <p className={`bold ${index > 0 ? "mt-46" : "mt-26"}`}>평가 주제</p> */}
                    <Input
                        className="mt-18"
                        value={addDoc.title}
                        setValue={v => {
                            addDocEdit(v, index)
                        }}
                        placeHolder="(예시: 태도 및 윤리의식)"
                    />
                    {addDoc.child?.map((v, i) => {
                        return <DocItem
                            title={v.title}
                            setTitle={(v) => {
                                addDocChildEdit("title", v, index, i)
                            }}
                            message={v.message}
                            setMessage={(v) => {
                                addDocChildEdit("message", v, index, i)
                            }}
                            deleteClick={() => { addDocChildDelete(index, i) }}
                        />
                    })}
                    <DocAddBtn onClick={() => {
                        addDocChildPlus(index)
                    }} />
                    < hr className="mt-50" />
                </>
            })}

            {tabIndex == 1 && docList.map((addDoc, index) => {
                return <>
                    {index > 0 && <LineBox className="mt-28" />}
                    <p className={`bold ${index > 0 ? "mt-46" : "mt-26"}`}>평가 주제</p>

                    <div className={`flex gap-8 mt-18`}>
                        <Input
                            style={{ width: "100%" }}
                            value={addDoc?.title}
                            setValue={v => {
                                listDocEdit(v, index)
                            }}
                            placeHolder="(예시: 태도 및 윤리의식)"
                        />
                        <Button
                            style={{ width: 68 }} type="red" title="삭제"
                            onClick={() => {
                                listDocDelete(index)
                            }}
                        />
                    </div>
                    {addDoc?.child?.map((v, i) => {
                        return <DocItem
                            title={v.title}
                            setTitle={(v) => {
                                listDocChildEdit("title", v, index, i)
                            }}
                            message={v.message}
                            setMessage={(v) => {
                                listDocChildEdit("message", v, index, i)
                            }}
                            deleteClick={() => { listDocChildDelete(index, i) }}
                        />
                    })}
                    <DocAddBtn onClick={() => {
                        listDocChildPlus(index)
                    }} />
                    < hr className="mt-50" />
                </>
            })}

            <div className="mt-20"></div>
        </div>

        <div className="position-bot-db">
            {tabIndex == 0 && <Button type="red-line" title={"평가 주제 추가"} onClick={addDocPlus} />}
            <div className="flex gap-15">
                <Button type="line" title={"취소"} onClick={cancleBtnClick} />
                <Button type="red" title={tabIndex == 0 ? "목록에 추가" : "수정완료"} onClick={editBtnClick} />
            </div>
        </div>

        <ModalDocView
            open={isView}
            setOpen={setIsView}
            docList={docList}
        />
    </Layout>
}