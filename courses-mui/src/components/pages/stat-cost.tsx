import { Box, Typography } from "@mui/material";
import React, { FC, useContext } from "react";
import CoursesContext from "../../store/context";

const StatisticsCost: FC = () => {
    const storeValue = useContext(CoursesContext);
    return <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <Typography variant="h2">Cost Statistics (num of digits) 
            {Math.abs(storeValue.count).toString().length}</Typography>
    </Box>
}

export default StatisticsCost;