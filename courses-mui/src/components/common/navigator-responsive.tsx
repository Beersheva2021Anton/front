import { Box } from "@mui/material";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { RouteType } from "../../models/common/route-type";
import NavigatorDrawer from "./navigator-drawer";
import NavigatorWeb from "./navigator-web";

const NavigatorResponsive: FC<{items: RouteType[]}> = (props) => {
    const isMobileOrLaptop = useMediaQuery({ query: '(min-width: 900px)' });
    return <Box>
        {
        isMobileOrLaptop 
            ? <NavigatorWeb items={props.items} /> 
            : <NavigatorDrawer items={props.items} />
    }
    </Box> 
}

export default NavigatorResponsive;