import * as React from "react";
import Buttons from "./buttons";
import Clock from "./clock";
import Colors from "./colors";
import InputData from "./inputData";

const App: React.FC = () => {
    const style: React.CSSProperties = {display: "flex", flexDirection: "column"};

    const [colors, setColors] = React.useState<string[]>(["red", "green", "blue", "yellow", "brown"]);
    const [timeZone, setTZ] = React.useState<string>("Asia/Jerusalem");
    const [btnNum, setBtn] = React.useState<number>(0);
    
    return <div style={style}>
        <Buttons changeBtn={setBtn}></Buttons>
        {btnNum == 1 && <InputData colorsFn={setColors} timeZoneFn={setTZ}></InputData>}
        {btnNum == 2 && <Colors colors={colors}></Colors>}
        {btnNum == 3 && <Clock timeZone={timeZone}></Clock>}
    </div>;
}

export default App;