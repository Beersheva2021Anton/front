import * as React from "react";

type InputDataProps = {
    colorsFn: (colors: string[]) => void,
    timeZoneFn: (timeZone: string) => void
}
const InputData: React.FC<InputDataProps> = (props) => {
    let inputColorsEl: any;
    let inputTZEl: any;

    React.useEffect(() => {
        inputColorsEl = document.getElementById("input-colors");
        inputTZEl = document.getElementById("input-tz");
    }, []);

    function returnColors() {
        const colorsStr: string = inputColorsEl.value;
        props.colorsFn(colorsStr.split(' '));
    }
    function returnTimeZone() {
        props.timeZoneFn(inputTZEl.value);
    }
    return <div>
        <input id="input-colors" placeholder="Enter colors separated by space"/><button onClick={returnColors}>GO</button>
        <input id="input-tz" placeholder="Enter time-zone"/><button onClick={returnTimeZone}>GO</button>
    </div>
}

export default InputData;