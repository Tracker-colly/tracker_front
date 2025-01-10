import { randomDigitCharactersSpecialCharacterslength } from "../utils/utils";

export default function CheckBoxIOS(props) {
    const {
        value = false,
        setValue
    } = props;

    const idx = randomDigitCharactersSpecialCharacterslength(10);

    return <div className="check-box-ios">
        <input
            id={idx}
            type='checkbox'
            class='ios8-switch'
            checked={value}
            onChange={(e) => {
                let checked = e.target.checked;
                if (setValue) setValue(checked)
            }}
        />
        <label for={idx} />
    </div>
}