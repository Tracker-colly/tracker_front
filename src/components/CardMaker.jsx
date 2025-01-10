export default function CardMaker(props) {
    const {
        type = 1
    } = props;

    return <div className={`card-maker${type != 1 ? type : ""}`} >
        <div className="circle1"></div>
        <div className="circle2"></div>
    </div >
}