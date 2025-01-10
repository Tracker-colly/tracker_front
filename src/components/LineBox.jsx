export default function LineBox(props) {
    return <div
        className={props.className}
        style={{
            width: "calc(100% + 32px)", height: 12, background: "#F4F6F7",
            transform: "translatex(-16px)"
        }} />
}