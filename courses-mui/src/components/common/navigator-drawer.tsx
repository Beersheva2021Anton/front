import { Box, Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { FC, useState } from "react";
import { RouteType } from "../../models/common/route-type";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const NavigatorDrawer: FC<{ items: RouteType[] }> = (props) => {

    const location = useLocation();
    const [visibleDrawer, setVisibleDrawer] = useState(false);
    const [currentItem, setCurrentItem] =
        useState(getCurrentItem(location.pathname, props.items));

    function getCurrentItem(path: string, items: RouteType[]) {
        let res = items.find(item => item.path === path);
        return res ? res.label : items[0].label;
    }

    function setDrawer() {
        setVisibleDrawer(!visibleDrawer);
    }

    function getLinks() {
        return props.items.map(item =>
            <ListItem key={item.label} component={Link} to={item.path} 
                onClick={() => setCurrentItem(item.label)}>
                <ListItemText disableTypography sx={{ fontSize: '1em' }}>{item.label}</ListItemText>
            </ListItem>)
    }

    return <Box>
        <Box sx={{ fontWeight: 'medium'}}>
            <IconButton sx={{ display: 'inline' }} onClick={() => setDrawer()}>
                <MenuIcon />
            </IconButton>
            {currentItem}
        </Box>
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