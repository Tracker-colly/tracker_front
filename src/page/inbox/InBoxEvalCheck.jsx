import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input"
import LineBox from "../../components/LineBox";
import Selector from "../../components/Selector";
import { monthList, yearList } from "../../utils/utils";
import CheckBox from "../../components/CheckBox";
import RadioButton from "../../components/RadioButton";
import RadioList from "../../components/RadioList";
import { useConfig } from "../../zustand/store";

export default function InBoxEvalCheck(props) {
    const {
        info,
        onConfirm = (data) => { },
    } = props;

    const { config } = useConfig();

    const [imageName, setimageName] = useState("")
    const [imageFile, setimageFile] = useState("")
    const [check, setCheck] = useState(false)

    const [relation, setRelation] = useState("")
    const [workLevel, setWorkLevel] = useState("")

    const confirmClick = () => {
        let data = {
            file: imageFile,
            relation: relation,
            workLevel: workLevel
        }

        onConfirm(data)
    }

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.log('image is required');
            return false;
        }
        if (!file.name.match(/\.(png|jpg|jpeg|pdf)$/)) {
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
                const path = event.target.result;
                setimageName(file.name)
                setimageFile(data)
            }
        } else {
            setimageName("")
        }
    }

    useEffect(() => {
        if (!relation || !workLevel) {
            setCheck(false)
        } else {
            if (!info?.creatorId && !imageFile) {
                setCheck(false)
            } else {
                setCheck(true)
            }
        }
    }, [imageFile, relation, workLevel])

    return <div className="flex-column">
        {!info?.creatorId && <>
            <p className="title-20">추천서를 작성하기 전</p>
            <p className="title-20 mt-4">꼭 첨부해야 할 목록이 있어요!</p>
            <p className="info4 color-sub-text mt-10">객관성 있고 정확한 사실 검증 절차를 위함이에요.</p>

            <div className="border-box green bg-green mt-18 padding-20-16">
                <p className="title2-1 ">둘중에 <span className="font-16 bold color-success">하나만 있어도</span> 가능해요!</p>
                <div className="flex-between mt-12" style={{ gap: 12 }}>
                    <div className="border-box green flex-center padding-10 font-15 bold-500">회사 명함</div>
                    <div className="border-box green flex-center padding-10 font-15 bold-500">경력/재직증명서</div>
                </div>
                <div className="flex mt-12">
                    <div style={{ width: 3, height: 3, background: "black", borderRadius: 3, flexShrink: 0, margin: 8 }} />
                    <p className="font-15">평판작성을 요청하기 전 작성자님께 해당 레퍼런스 요청에 대한 사전 안내를 진행해 주세요.</p>
                </div>
            </div>

            <p className="title-18 mt-24">증빙 파일 첨부</p>
            <p className="info3 mt-10">함께 근무했던 당시의 증빙서류를 첨부해 주세요.</p>

            <div className="input mt-18" style={{ lineHeight: 1 }}>{imageName ? imageName :
                <span style={{ lineHeight: 1, color: "#767676" }}>jpg, png 파일 업로드 가능</span>}
            </div>
            <label className={`btn ${imageFile ? "dark-gray" : "red"} mt-12`} htmlFor="recommend_file_upload">
                {imageFile ? "다시첨부하기" : "첨부하기"}
            </label>
            <input
                type="file"
                style={{ display: "none" }}
                id="recommend_file_upload"
                onChange={onFileChange}
            />

            <LineBox className="mt-30" />
        </>}

        <p className="title-20 mt-30"><span className="title-20 color-success">요청자 {info?.userName}</span>님이 작성한 정보가</p>
        <p className="title-20 mt-4"> 제대로 작성 되었는지 확인해 주세요.</p>

        <p className="title-18 mt-40">1. 함께 근무했던 회사</p>
        <p className="info3 mt-10">작성자 {info?.creatorName}님과 함께 근무했던 회사</p>

        <Input className="mt-18" value={info?.companyName} disabled />

        <p className="title-18 mt-40">2. 함께 근무한 기간</p>
        <p className="info3 mt-10">작성자 {info?.creatorName}님과 함께 근무한 기간</p>

        <div className="flex-between mt-12" style={{ gap: 10 }}>
            <Selector
                options={yearList().reverse().map((v) => {
                    return { value: String(v), label: v + "년" }
                })}
                value={info?.startYear}
                disabled
            />
            <Selector
                options={monthList().map((v) => {
                    return { value: String(v), label: v + "월" }
                })}
                value={info?.startMonth}
                disabled
            />
        </div>
        <div className="flex-between mt-10" style={{ gap: 10 }}>
            <Selector
                options={yearList().reverse().map((v) => {
                    return { value: String(v), label: v + "년" }
                })}
                value={info?.endYear}
                placeholder="종료연도"
                disabled
            />
            <Selector
                options={monthList().map((v) => {
                    return { value: String(v), label: v + "월" }
                })}
                value={info?.endMonth}
                placeholder="월"
                disabled
            />
        </div>

        <div className="mt-16" style={{
            display: "flex", gap: 10,
            fontSize: 15, fontWeight: 500, alignItems: "center"
        }}>
            <CheckBox value={!info?.endYear} disabled />
            현재 근무 중
        </div>

        <p className="title-18 mt-40">3. 근무 유형</p>
        <p className="info3 mt-10">작성 요청자 {info?.userName}님의 근무 유형</p>
        <RadioButton
            // color="red"
            color="gray"
            className="mt-16"
            value={info?.workType}
            setValue={() => { }}
            count={3}
            options={[
                { values: "회사", label: "회사" },
                { values: "알바", label: "알바" },
                { values: "프리랜서", label: "프리랜서" }
            ]}
            disabled
        />

        <p className="title-18 mt-40">4. {info?.userName}님의 직책</p>
        <p className="info3 mt-10">작성자 {info?.creatorName}님과 근무 당시 {info?.userName}님의 직책</p>
        <RadioButton
            // color={"red"}
            color={"gray"}
            className="mt-16"
            value={info?.workLevel}
            count={3}
            options={config?.codes?.map(v => {
                return { values: v?.id, label: v?.value }
            })}
            disabled
        />

        <LineBox className="mt-30" />
        <p className="title-20 mt-30"><span className="title-20 color-error">작성자 {info?.creatorName}</span>님의 몇가지 정보를</p>
        <p className="title-20 mt-4">작성해 주세요.</p>

        <div className="title-18 mt-40">소속 정보 / 관계</div>
        <div className="info3 mt-10">근무 시 {info?.userName}님과의 관계를 알려주세요.</div>
        <RadioList
            className="mt-16"
            value={relation}
            setValue={setRelation}
            options={config?.relations?.map(v => {
                return { values: v, label: info?.userName + "님의 " + v }
            })}
        />

        <div className="title-18 mt-40">{info?.creatorName}님의 직책</div>
        <div className="info3 mt-10">{info?.userName}님과 근무 당시의 직책을 알려주세요.</div>
        <RadioButton
            color="red"
            className="mt-16"
            value={workLevel}
            setValue={setWorkLevel}
            count={3}
            options={config?.codes?.map(v => {
                return { values: v?.id, label: v?.value }
            })}
        />

        <Button
            className="mt-24"
            type="red"
            title="추천서 작성하기"
            disabled={!check}
            onClick={confirmClick}
        />
    </div >
}