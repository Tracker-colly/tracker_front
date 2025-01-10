
export default function WriterCard(props) {
    const {
        className,
        type = "",
        onClick = () => { },
        onViewClick,
        title = "Title",
        infoList = [],
        disabled = false
    } = props;

    return <div
        className={`writer-card ${disabled ? "" : "hand"}${type ? " " + type : ""}${className ? " " + className : ""}`}
        onClick={onClick}
    >
        <div className={"title-box" + (type ? " " + type : "")}>
            {title}
            {onViewClick && <button className="under-line info2" onClick={(e) => {
                e.stopPropagation();
                onViewClick();
            }}>관계 보기</button>}
        </div>

        <hr className="mt-14" />
        <div className="info-box mt-14">
            {infoList.map((v) => {
                return <p style={{ display: "flex", gap: 20, fontWeight: 500, alignItems: "center", lineHeight: 1 }}><span style={{ fontWeight: 400, width: 60, lineHeight: 1 }}>{v.title}</span>{v.value}</p>
            })}
        </div>
    </div>
}