import * as React from "react";
import Clock from "./clock";
import Colors from "./colors";
import InputData from "./inputData";

const App: React.FC = () => {
    const style: React.CSSProperties = {display: "flex", flexDirection: "column"};

    const [colors, setColors] = React.useState<string[]>(["red", "green", "blue", "yellow", "brown"]);
    const [timeZone, setTZ] = React.useState<string>("Asia/Jerusalem");
    
    return <div style={style}>
        <InputData colorsFn={setColors} timeZoneFn={setTZ}></InputData>
        <Colors colors={colors}></Colors>
        <Clock timeZone={timeZone}></Clock>
    </div>;
}

export default App;