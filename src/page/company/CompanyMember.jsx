import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import images from "../../libs/images";
import CheckBox from "../../components/CheckBox";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import ModalBottom from "../../components/ModalBottom";
import ModalAuth from "../../components/ModalAuth";
import * as APIS from "../../utils/service"
import consts from "../../libs/consts"
import { useUser } from "../../zustand/store";
import { defaultProfile } from "../../utils/utils";

const MemberItem = (props) => {
    const {
        profile = "",
        name,
        rank,
        isCheck = false,
        checked = false,
        setChecked = (v) => { },
        authClick,
        isMe = false
    } = props

    const [check, setCheck] = useState(false);

    const onCheckBox = (v) => {
        setCheck(v);
        if (setChecked) setChecked(v);
    }

    useEffect(() => {
        setCheck(checked);
    }, [checked])

    useEffect(() => {
        if (!isCheck) {
            setCheck(false);
        }
    }, [isCheck])

    return <div className="flex-between">
        <div className="member-item-box">
            {isCheck && <CheckBox value={check} setValue={onCheckBox} />}
            <img
                className={`thumb${isMe ? " border" : ""}`}
                src={consts.s3url + profile}
                alt=""
                onError={defaultProfile}
            />
            {isMe && <div className="my-tag" >본인</div>}
            <div className="info">
                <div className="title1">{name}</div>
                <div className="line" />
                <div className="title1">{rank}</div>
            </div>
        </div>
        {authClick && <div>
            <Button type="auth" title="권한설정" onClick={authClick} disabled={false} />
        </div>}
    </div>
}

/*-----   회사 멤버   -----*/
export default function CompanyMember() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(window.location.search);
    const [level, setLevel] = useState(2);
    const { userInfo } = useUser();

    const [comId, setComId] = useState("");
    const [memberInfo, setMemberInfo] = useState(null)
    const [checkIds, setCheckIds] = useState([]);

    const [ornerList, setOnerList] = useState([])
    const [adminList, setAdminList] = useState([])
    const [staffList, setStaffList] = useState([])

    const [isEdit, setIsEdit] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [authSet, setauthSet] = useState(false);
    const [authConfirm, setauthConfirm] = useState(false);

    const [editUser, setEditUser] = useState(null);

    const [exitModal, setexitModal] = useState(false);

    const leftBackBtnClick = () => {
        navigate(-1);
    }
    // 수정하기 버튼
    const headerEditClick = () => {
        if (isEdit) {
            setCheckIds([])
            setIsEdit(false)
        } else {
            setCheckIds([])
            setIsEdit(true)
        }
    }

    const deleteMemberClick = () => {
        if (checkIds.length <= 0) {
            toast.error("삭제할 멤버가 없습니다.")
            return;
        }

        setConfirm(true)
    }

    // 멤버 삭제 관리자
    const deleteFunc = () => {
        setConfirm(false)
        setIsEdit(false)

        APIS.postData("/v1/company/unLink", {
            comId: comId,
            userIds: checkIds
        }).then((result) => {
            toast.success("멤버 삭제를 완료하였습니다.")
            loadMembers(comId)
        }).catch(e => {
            toast.error(e.response.data)
        })
    }

    const setCheckMember = (isCheck, v) => {
        console.log("🚀 ~ setCheckMember ~ isCheck:", isCheck)
        if (isCheck) {
            setCheckIds(checkList => {
                if (checkList.indexOf(v.userId) < 0) {
                    checkList.push(v.userId)
                }
                return [...checkList]
            })
        } else {
            setCheckIds(checkList => {
                let findIndex = checkList.indexOf(v.userId);
                if (findIndex >= 0) {
                    checkList.splice(findIndex, 1)
                }
                return [...checkList]
            })
        }
    }

    // 유저 나가기
    const unLinkUserFunc = () => {
        APIS.postData("/v1/company/unLinkMember", {
            comId: comId,
        }).then((result) => {
            toast.success("나가기를 성공적으로 완료하였습니다.");
            navigate(-1);
        }).catch(e => {
            toast.error(e.response.data)
        })
    }

    // 권한 팝업 오픈
    const setAuthOpen = (userData) => {
        setEditUser({ ...userData });
        setauthSet(true)
    }

    // 권한 설정 하기
    const authConfirmClick = (data) => {
        // console.log("🚀 ~ authConfirmClick ~ data:", data)
        setEditUser(v => {
            v.code = data.code
            v.codeName = data.codeName
            v.level = data.level
            return v
        })
        setauthSet(false)
        setauthConfirm(true)
    }

    // 권설 설정 확인 팝업 확인
    const setAuthFunc = () => {
        setauthConfirm(false)
        let sendData = {
            comId: comId,
            userId: editUser.userId,
            code: editUser.code,
            level: editUser.level
        }
        APIS.postData("/v1/company/editUserAuth", sendData)
            .then(() => {
                toast.success("권한을 성공적으로 변경하였습니다.")
                loadMembers(comId)
            }).catch(e => {
                toast.error(e.response.data)
            })
    }


    //member목록 가져오기
    const loadMembers = (idx) => {
        APIS.postData("/v1/company/memberList", {
            comId: idx,
        }).then((result) => {
            let memberData = result.data.data;
            // console.log("🚀 ~ loadMembers ~ memberData:", memberData)
            setMemberInfo(memberData)
            let oList = []
            let aList = []
            let sList = []
            for (let member of memberData?.list) {
                if ([9].includes(member.level)) {
                    oList.push(member)
                } else if ([3].includes(member.level)) {
                    aList.push(member)
                } else {
                    sList.push(member)
                }
            }

            if (memberData.isEdit) {
                setLevel(1)
            } else {
                setLevel(2)
            }

            setOnerList(oList)
            setAdminList(aList)
            setStaffList(sList)

            if (location.state?.isView) {
                setLevel(3) //보기만 가능함
            }
        }).catch(e => {
            navigate(-1)
            toast.error(e.response.data)
        })
    }

    useEffect(() => {
        let comidx = Number(params.get("idx"))
        if (!isNaN(comidx)) {
            setComId(comidx);
            loadMembers(comidx)
        } else {
            toast.error("멤버 정보를 확인할 수 없습니다.")
            navigate(-1);
        }
    }, [])

    return <Layout
        headerTitle="멤버"
        leftBtnClick={leftBackBtnClick}
        text={level === 1 ? (isEdit ? "취소" : "수정") : undefined}
        textClick={memberInfo?.isEdit ? headerEditClick : undefined}
        isHeader
    >
        <div className="content">
            <p className="title1 mt-24 bold">Owner</p>
            <div className="flex-column gap-20 mt-20">
                {ornerList.map(v => {
                    return <MemberItem
                        profile={v?.userProfile}
                        name={v?.userName}
                        rank={v?.codeName}
                        isMe={v?.isMy}
                    />
                })}
                <div className="border-bottom" />
            </div>
            {
                adminList.length > 0 && <>
                    <p className="title1 mt-24 bold">Administrator</p>
                    <div className="flex-column gap-20 mt-20">
                        {adminList.map(v => {
                            return <MemberItem
                                isCheck={isEdit && !v?.isMy}
                                setChecked={(isCheck) => {
                                    setCheckMember(isCheck, v)
                                }}
                                profile={v?.userProfile}
                                name={v?.userName}
                                rank={v?.codeName}
                                isMe={v?.isMy}
                                authClick={(level === 1 && !isEdit && !v?.isMy) ? () => {
                                    setAuthOpen(v)
                                } : false}
                            />
                        })}
                        <div className="border-bottom" />
                    </div>
                </>
            }

            {/* <p className="title1 mt-24 bold">Administrator</p>
            <div className="flex-column gap-20 mt-20">
                {!isEdit && <MemberItem name="나야나" rank="이사" isMe />}
                <MemberItem isCheck={isEdit} name="이성계" rank="이사" authClick={(level === 1 && !isEdit) ? () => { setAuthOpen(1) } : false} />
                <MemberItem isCheck={isEdit} name="최치원" rank="부장" authClick={(level === 1 && !isEdit) ? () => { setAuthOpen(1) } : false} />
                <div className="border-bottom" />
            </div> */}

            {
                staffList.length > 0 && <>
                    <p className="title1 mt-24 bold">Staff</p>
                    <div className="flex-column gap-20 mt-20">
                        {staffList.map(v => {
                            return <MemberItem
                                isCheck={isEdit}
                                setChecked={(isCheck) => {
                                    setCheckMember(isCheck, v)
                                }}
                                profile={v?.userProfile}
                                name={v?.userName}
                                rank={v?.codeName}
                                isMe={v?.isMy}
                                authClick={(level === 1 && !isEdit && !v?.isMy) ? () => {
                                    setAuthOpen(v)
                                } : false}
                            />
                        })}
                    </div>
                </>
            }
            {/* <p className="title1 mt-24 bold">Staff</p>
            <div className="flex-column gap-20 mt-20">
                <MemberItem isCheck={isEdit} name="왕건" rank="과장" authClick={(level === 1 && !isEdit) ? () => { setAuthOpen(1) } : false} />
                <MemberItem isCheck={isEdit} name="궁예" rank="대리" authClick={(level === 1 && !isEdit) ? () => { setAuthOpen(1) } : false} />
                <MemberItem isCheck={isEdit} name="견훤" rank="주임" authClick={(level === 1 && !isEdit) ? () => { setAuthOpen(1) } : false} />
            </div> */}
        </div>

        {isEdit && <div className="position-bot">
            <Button type="delete" title="멤버 삭제" onClick={deleteMemberClick} disabled={false} />
        </div>}

        {level === 2 && <div className="position-bot">
            <Button type="delete" title="나가기" onClick={() => { setexitModal(true) }} />
        </div>}

        <Modal
            type="info"
            open={confirm}
            setOpen={setConfirm}
            title="멤버를 삭제하시겠습니까?"
            message={<>
                삭제된 멤버는 더 이상 회사 정보를<br />
                확인할 수 없습니다.
            </>}
            confirm="확인"
            onConfirm={deleteFunc}
            cancel="취소"
            onCancel={() => { setConfirm(false) }}
        />

        <Modal
            type="info"
            open={authConfirm}
            setOpen={setauthConfirm}
            title={editUser?.userName + "님의 권한을 변경할까요?"}
            message={<>
                직책: {editUser?.codeName}<br />
                권한: {editUser?.level == 3 ? "Administrator" : "Staff"}
            </>}
            confirm="확인"
            onConfirm={setAuthFunc}
            cancel="취소"
            onCancel={() => { setauthConfirm(false) }}
        />

        <ModalAuth
            title={"권한 설정"}
            open={authSet}
            setOpen={setauthSet}
            listItem={["Administrator Card 추가"]}
            onCancel={() => { setauthSet(false) }}
            onConfirm={authConfirmClick}
            initValue={editUser}
        />

        <Modal
            type="info"
            open={exitModal}
            setOpen={setexitModal}
            title="정말 나가시겠습니까?"
            message={<>
                멤버에서 나갈 시 더 이상 회사 정보를<br />
                확인할 수 없습니다.
            </>}
            confirm="나가기"
            onConfirm={unLinkUserFunc}
            cancel="취소"
            onCancel={() => { setexitModal(false) }}
        />
    </Layout>
}