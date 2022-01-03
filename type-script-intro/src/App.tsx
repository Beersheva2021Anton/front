import * as React from "react";
import Clock from "./clock";
import Colors from "./colors";
import InputData from "./inputData";

const App: React.FC = () => {
    const style: React.CSSProperties = {display: "flex", flexDirection: "column"};

    const [colors, setColors] = React.useState<string[]>(["red", "green", "blue", "yellow", "brown"]);
    function injectColors(colorsArr: string[]) {
        setColors(colorsArr);
    }

    const [timeZone, setTZ] = React.useState<string>("Asia/Jerusalem");
    function injectTimeZone(timeZone: string) {
        setTZ(timeZone);
    }

    return <div style={style}>
        <InputData colorsFn={injectColors} timeZoneFn={injectTimeZone}></InputData>
        <Colors colors={colors}></Colors>
        <Clock timeZone={timeZone}></Clock>
    </div>;
}

export default App;