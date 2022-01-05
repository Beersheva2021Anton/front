import React, { FC, ReactNode } from "react";
import lifeGameConfig from "../configuration/life-game-config.json";

const BORDER_SIZE = 1;

const Row: FC<{row: number[]}> = (props) => {

    const row = props.row;

    function getCells(): ReactNode[] {
        return row.map((num, index) => <div key={index} style={getStyle(num)}></div>);
    }

    return <div style={{display: "flex"}}>
        {getCells()}
    </div>
}

function getCellSize(): number {
    return Math.min(window.innerHeight, window.innerWidth) / 
        lifeGameConfig.dimension - BORDER_SIZE * 2;
}

function getStyle(num: number): React.CSSProperties {
    const size = getCellSize();
    return {
        backgroundColor: !!num ? "black" : "white",
        width: size,
        height: size,
        border: `${BORDER_SIZE}px solid grey`
    }
}

export default Row;