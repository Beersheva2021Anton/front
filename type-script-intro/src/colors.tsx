import * as React from "react";

type ColorsProps = {
    colors: string[]
}

const Colors: React.FC<ColorsProps> = (props: ColorsProps) => {
    const {colors} = props;
    return <div>
        <ul>
            {colors.map((col, index) => <li key={index} style={{color: "grey", backgroundColor: col}}>{col}</li>)}
        </ul>
    </div>
}

export default Colors;