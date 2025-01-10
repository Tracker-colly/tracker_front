/**
 * 버튼
 * @param {{
 *  className?:string;
 *  title?:string;
 *  type?: "line"| "delete";
 *  imgSrc?:string;
 *  onClick?:()=>void;
 * }} props 
 * @returns 
 */
export default function Button(props) {
    const {
        style = {},
        className = "",
        title,
        type,
        imgSrc,
        onClick,
        disabled = false,
    } = props;

    return <button
        style={style}
        className={`btn${type ? " " + type : ""}${className ? " " + className : ""}${disabled ? " off" : ""}`}
        onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick()
        }}
        disabled={disabled}
    >
        {imgSrc && <img className="icon" src={imgSrc} />}
        {title}
    </button>
}