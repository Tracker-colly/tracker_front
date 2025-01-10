export default function Loader(props) {
    const {
        isLoading = false
    } = props;

    return <div className={`loader-box ${isLoading ? "" : "off"}`}>
        <div className="loader9" />
    </div>
}