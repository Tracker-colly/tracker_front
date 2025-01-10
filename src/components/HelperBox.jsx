export default function HelperBox(props) {

    const { className, title = "" } = props;

    return <div
        className={className}
        style={{
            display: "flex",
            gap: 6,
            flexDirection: "column",
            width: "100%",
            padding: "16px 10px",
            borderRadius: 8,
            background: "#F7F7FB",
        }}
    >
        <div style={{
            display: "flex",
            gap: 4,
            alignItems: "center",
            paddingBottom: 6,
        }}>
            <svg style={{ flexShrink: 0 }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12.2V8.75416M12 15.8C12 15.8 12.0049 15.8 12.008 15.8M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="#131214" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p className="title-16">지금부터 {title} 작성을 시작합니다.</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <svg style={{ flexShrink: 0 }} width="8" height="22" viewBox="0 0 8 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="3.5" cy="11" r="1.5" fill="#6E7375" />
            </svg>
            <p className="font-14 color-dark-gray" style={{ lineHeight: "20px" }}>
                <span className="font-14 bold">부적절한 표현, 욕설, 외설적인 내용 및 차별적 언어</span>가 포함된 평판은 삭제될 수 있습니다.
            </p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <svg style={{ flexShrink: 0 }} width="8" height="22" viewBox="0 0 8 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="3.5" cy="11" r="1.5" fill="#6E7375" />
            </svg>
            <p className="font-14 color-dark-gray" style={{ lineHeight: "20px" }}>
                <span className="font-14 bold">내용이 불충분하거나 부적절한 경우,</span> 작성 요청자의 채용에 부정적인 영향을 미칠 수 있습니다.
            </p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <svg style={{ flexShrink: 0 }} width="8" height="22" viewBox="0 0 8 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="3.5" cy="11" r="1.5" fill="#6E7375" />
            </svg>
            <p className="font-14 color-dark-gray" style={{ lineHeight: "20px" }}>
                <span className="font-14 bold">개인정보(이메일, 전화번호 등)</span>를 작성하실 수 없습니다.
            </p>
        </div>
    </div>
}