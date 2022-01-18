import { Tab, Tabs } from "@mui/material";
import { FC, ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RouteType } from "../../models/common/route-type";

const NavigatorWeb: FC<{ items: RouteType[] }> = (props) => {

    const location = useLocation();
    const [activeTabIndex, setActiveTab] =
        useState(getInitialTabIndex(location.pathname, props.items));

    useEffect(() => {
        setActiveTab(getInitialTabIndex(location.pathname, props.items));
    }, [props.items]);

    function getTabs(): ReactNode[] {
        return props.items.map(item =>
            <Tab key={item.label} component={Link} to={item.path} label={item.label} />)
    }

    function onChangeHandler(event: any, newValue: number) {
        setActiveTab(newValue);
    }

    return <Tabs value={activeTabIndex >= props.items.length ? 0 : activeTabIndex} 
        onChange={onChangeHandler}>
        {getTabs()}
    </Tabs>
}

function getInitialTabIndex(path: string, items: RouteType[]) {
    let res = items.findIndex(item => path === item.path);
    return res < 0 ? 0 : res;
}

export default NavigatorWeb;