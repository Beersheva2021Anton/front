import * as React from "react";

const Buttons: React.FC<{changeBtn: (num: number) => void}> = (props) => {

    return <div>
        <button onClick={props.changeBtn.bind(this, 1)}>Show Input</button>
        <button onClick={props.changeBtn.bind(this, 2)}>Show Colors</button>
        <button onClick={props.changeBtn.bind(this, 3)}>Show Timer</button>
    </div>
}

export default Buttons;