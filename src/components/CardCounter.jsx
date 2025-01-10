import images from "../libs/images"
export default function CardCounter(props) {
    const {
        style = {},
        type = 1,
        num = 1,
    } = props;

    return <div style={{ ...style }} className={`card_counter${type != 1 ? type : ""}`} >
        <img src={images.cards} alt="" />
        <div className="num">{num}</div>
    </div >
}