import moment from "moment";
import { useEffect, useState } from "react";

export const InBoxTab = (props) => {
    const {
        list = [],
        value,
        setValue,
    } = props;

    const [index, setIndex] = useState(0);

    const onItemClick = (index) => {
        setIndex(index)
        if (setValue) setValue(index);
    }

    useEffect(() => {
        if (value) setIndex(value);
    }, []);

    return <div style={{
        display: "flex",
        width: "100%",
        height: 34,
        padding: 2,
        borderRadius: 100,
        background: "#F4F6F7"
    }}>
        {list.map((v, i) => {
            return <div
                style={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    background: index === i ? "#312C2C" : "",
                    borderRadius: 100,
                    color: index === i ? "#FFFFFF" : "#6E7375",
                    fontSize: 12,
                    fontWeight: index === i ? 600 : 500,
                    lineHeight: 1,
                    cursor: "pointer",
                }}
                onClick={() => { onItemClick(i) }}
            >
                {v}
            </div>
        })}
    </div >
}

/** 
 * Inbox 아이템
 * 
 * type: 1=제출요청, 2=작성요청, 3=작성완료
 * 
 * @param {{
 * type:1|2|3|4|5|6|7|8
 * title:string
 * date:string
 * }} props 
 * @returns 
 */
export const InBoxItem = (props) => {
    const {
        type,
        title,
        message,
        date,
        onClick
    } = props

    return <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: "20px 16px",
        background: "#FFF",
        cursor: "pointer"
    }} onClick={() => { if (onClick) onClick(); }}>
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <p className="title-18">{title}</p>
            <InBoxItemType type={type} />
        </div>
        <p className="font-15" style={{ lineHeight: 1.5 }}>
            {message}
        </p>
        <p
            className="font-14"
            style={{
                color: "#A5A5A5",
                fontWeight: 500
            }} >
            {moment(date).format("hh:mm A")}
        </p>
    </div>
}

const InBoxItemType = (props) => {
    const { type = 1 } = props;

    const styles = [
        {
            color: "#04B014",
            background: "#E6F7E7",
        },
        {
            color: "#04B014",
            background: "#E6F7E7",
        },
        {
            color: "#EE772F",
            background: "#FDF3E2",
        },
        {
            color: "#DC0000",
            background: "#FCECEE",
        },
        {
            color: "#DC0000",
            background: "#FCECEE",
        },
        {
            color: "#EE772F",
            background: "#FDF3E2",
        },
        {
            color: "#04B014",
            background: "#E6F7E7",
        },
        {
            color: "#04B014",
            background: "#E6F7E7",
        },
    ]

    const texts = [
        "제출요청",
        "제출요청",
        "작성요청",
        "작성완료",
        "작성완료",
        "작성요청",
        "제출완료",
        "제출완료"
    ]

    return <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 10px",
        fontSize: 13,
        fontWeight: 500,
        borderRadius: 4,
        ...styles[type - 1]
    }}>
        {texts[type - 1]}
    </div>
}