import React, { FC, useEffect, useRef, useState } from "react";
import LifeMatrix from "../service/life-matrix";
import { getRandomMatrix } from "../util/random";
import lifeGameConfig from "../configuration/life-game-config.json";
import Matrix from "./matrix";

const LifeGame: FC = () => {

    const lifeMatrix = useRef<LifeMatrix>(new LifeMatrix(getRandomMatrix(0, 1, 
        lifeGameConfig.dimension, lifeGameConfig.dimension)));
    const [numbers, setNumbers] = useState<number[][]>(lifeMatrix.current.matrix);

    function tic() {
        setNumbers(lifeMatrix.current.nextStep());
    }

    useEffect(() => {
        const interval = setInterval(tic, lifeGameConfig.ticInterval);
        return () => clearInterval(interval);
    }, [])

    return <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Matrix matrix={numbers}></Matrix>
    </div>
}

export default LifeGame;