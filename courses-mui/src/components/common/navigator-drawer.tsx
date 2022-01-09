import { Box, Drawer, IconButton, Tab } from "@mui/material";
import { FC, useState } from "react";
import { RouteType } from "../../models/common/route-type";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const NavigatorDrawer: FC<{items: RouteType[]}> = (props) => {

    const [visibleDrawer, setVisibleDrawer] = useState(false);

    function showDrawer() {
        setVisibleDrawer(!visibleDrawer);
    }

    function getLinks() {
        return props.items.map(item => 
            <Tab key={item.label} component={Link} to={item.path} label={item.label} />)
    }

    return <Box>
        <IconButton onClick={() => showDrawer()}>
            <MenuIcon />
        </IconButton>
        <Drawer anchor="left" 
                open={visibleDrawer} 
                onClose={() => showDrawer()}
                onClick={() => showDrawer()}>
            {getLinks()}
        </Drawer>
    </Box>
}

export default NavigatorDrawer;