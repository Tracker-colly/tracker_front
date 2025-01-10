const DotBox = ({ color }) => {
    return <div style={{
        display: "flex",
        width: 8,
        height: 21,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    }}>
        <div style={{
            width: 3,
            height: 3,
            borderRadius: 100,
            background: color ? color : "#6E7375",
        }} />
    </div>
}

export default function DotTextBox({
    className = "",
    title = "",
    color = "",
    size = 14,
}) {
    const dtextBoxStyle = {
        display: "flex",
        gap: 8,
        alignItems: "start",
    }

    const dtextStyle = {
        fontSize: size,
        lineHeight: 1.5,
        color: color ? color : "#6E7375",
    }

    return <div className={className} style={dtextBoxStyle}>
        <DotBox color={color} />
        <p style={dtextStyle}>{title}</p>
    </div>
}