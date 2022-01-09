import { Box, Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { FC, useState } from "react";
import { RouteType } from "../../models/common/route-type";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { fontSize } from "@mui/system";

const NavigatorDrawer: FC<{items: RouteType[]}> = (props) => {

    const [visibleDrawer, setVisibleDrawer] = useState(false);

    function setDrawer() {
        setVisibleDrawer(!visibleDrawer);
    }

    function getLinks() {
        return props.items.map(item => 
            <ListItem key={item.label} component={Link} to={item.path}>
                <ListItemText disableTypography sx={{ fontSize: '1em' }}>{item.label}</ListItemText>
            </ListItem>)
    }

    return <Box>
        <IconButton onClick={() => setDrawer()}>
            <MenuIcon />
        </IconButton>
        <Drawer anchor="left" 
                open={visibleDrawer} 
                onClose={() => setDrawer()}
                onClick={() => setDrawer()}>
            <List>
                {getLinks()}
            </List>
        </Drawer>
    </Box>
}

export default NavigatorDrawer;