import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import images from "../../libs/images"
import DotTextBox from "../../components/DotTextBox";
import * as APIS from "../../utils/service"
import { useCompany } from "../../zustand/store";

const DEMO_LIST = [
    { name: "트랙커콜리" },
    { name: "트라닉스" },
    { name: "트래닛" },
    { name: "트라이업" },
    { name: "트랙스" },
    { name: "트랜스코스모스 코리아" },
    { name: "네이버" },
    { name: "구글" },
    { name: "카카오" },
    { name: "라인" },
    { name: "쿠팡" },
    { name: "배달의민족" },
    { name: "당근마켓" },
    { name: "토스" },
    { name: "마이크로소프트" },
    { name: "소프트뱅크" },
    { name: "테슬라" },
]

export default function FindCompany(props) {
    const {
        backClick,
        onCompanyData = (data) => { }
    } = props;

    const { companyList, setCompanyList } = useCompany();

    const [searchInput, setSearchInput] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [isSearch, setIsSearch] = useState(false)
    const [searchList, setSearchList] = useState([]);

    const leftClick = () => {
        if (backClick) backClick();
    }

    const searchClick = () => {
        setIsSearch(true);

        if (searchInput) {
            let data = companyList.filter(v => {
                return v.name.indexOf(searchInput) >= 0;
            })
            setSearchList(data)
            setSearchValue(searchInput);
        } else {
            setSearchList([]);
            setIsSearch(false);
        }
    }

    //직접 입력
    const addClick = () => {
        leftClick();
        onCompanyData({ idx: null, name: searchValue })
    }

    const onItemClick = (data) => {
        leftClick();
        onCompanyData(data);
    }

    // 컴퍼니 리스트 가져오기
    const loadCompanyList = () => {
        APIS.postData("/v1/search/companyList", {})
            .then((result) => {
                setCompanyList(result.data.data)
            })
    }

    useEffect(() => {
        loadCompanyList();
    }, [])

    return <div style={{
        position: "fixed",
        width: "100%",
        maxWidth: 600,
        height: "100%",
        top: 0,
        left: "50%",
        transform: "translate(-50%, 0%)",
        background: "#FFFFFF",
        zIndex: 10,
    }}>

        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 64,
        }}>
            <p style={{ fontSize: 20, fontWeight: 600 }}>회사/소속 검색</p>
            <button
                style={{
                    position: "absolute",
                    width: 32,
                    height: 32,
                    left: 9
                }}
                onClick={leftClick}
            ><img className="logo" src={images.x} /></button>
        </div>
        <div className="content">
            <p className="title-18">
                작성자님과 함께 근무했던 회사를<br />
                선택해 주세요.
            </p>

            <Input
                className="mt-16"
                placeHolder="회사/소속명 검색"
                value={searchInput}
                setValue={setSearchInput}
            />

            <Button
                className="mt-12"
                title="검색"
                onClick={searchClick}
            />

            {isSearch ? <div className="mt-10" style={{
                display: "flex",
                flexDirection: "column",
            }}>
                {searchList.length > 0 ? searchList.map((v) => {
                    return <SearchItem
                        title={v?.name}
                        pointText={searchValue}
                        onClick={() => {
                            onItemClick(v);
                        }}
                    />
                }) : <NotFindInfo
                    className="mt-12"
                    name={searchValue}
                    addClick={addClick}
                />}
            </div> : <FindInfo className="mt-12" />}
        </div>
    </div>
}
//검색 회사리스트 아이템
const SearchItem = (props) => {
    const {
        title,
        pointText = "",
        onClick = () => { }
    } = props;

    return <div style={{
        padding: "20px 0px",
        borderBottom: "1px solid #E6E9EB",
        cursor: "pointer",
        fontSize: 17,
        fontWeight: 500,
        color: "#898D8F"
    }} onClick={onClick}>
        {title.includes(pointText) ? (
            <>
                {title.split(pointText)[0]}
                <span style={{
                    fontSize: 17,
                    fontWeight: 500,
                    color: "#2E81FF"
                }}>{pointText}</span>
                {title.split(pointText)[1]}
            </>
        ) : (
            <>{title}</>
        )}
    </div>
}
// 정보 컴포넌트
const FindInfo = (props) => {
    const { className } = props;


    return <div
        className={className}
        style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: 16,
            borderRadius: 8,
            border: "1px solid #E6E9EB"
        }}
    >
        <DotTextBox title="사업자 등록에 등록된 회사명으로 검색해 주세요." />
        <DotTextBox title="회사명이 영문이거나 숫자가 포함된 경우, 영문 및 숫자를 모두 포함하여 검색해 주세요." />
        <DotTextBox title="정확한 명칭으로 검색을 진행해 주세요." />
    </div>
}
// 정보 컴포넌트 (없을경우)
const NotFindInfo = (props) => {
    const {
        className,
        name = "검색단어",
        addClick = () => { }
    } = props;

    return <div
        className={className}
        style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: 16,
            borderRadius: 8,
            border: "1px solid #E6E9EB"
        }}
    >
        <p className="font-15 bold">찾으시는 '{name}' 회사명이 없으신가요?</p>

        <DotTextBox className="mt-5" title="사업자 등록에 등록된 회사명으로 검색해 주세요." />
        <DotTextBox title="회사명이 영문이거나 숫자가 포함된 경우, 영문 및 숫자를 모두 포함하여 검색해 주세요." />
        <DotTextBox title="정확한 명칭으로 검색을 진행해 주세요." />

        <p className="font-14" style={{ display: "flex", alignItems: "center" }}>그래도 찾을 수 없다면&nbsp;
            <div className="font-14 hand under-line" style={{ display: "flex", alignItems: "center" }} onClick={addClick}>
                직접 추가하기
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                    <path d="M6.75 14L11.014 10.0303C11.3287 9.73744 11.3287 9.26256 11.014 8.96967L6.75 5" stroke="#131214" stroke-linecap="round" />
                </svg>
            </div>
        </p>
    </div>
}