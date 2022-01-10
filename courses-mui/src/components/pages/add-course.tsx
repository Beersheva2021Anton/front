import { Box, Button, Typography } from "@mui/material";
import React, { FC, useContext } from "react";
import CoursesContext from "../../store/context";

const AddCourse: FC = () => {
    const storeValue = useContext(CoursesContext);
    return <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <Typography variant="h2">Add Course {storeValue.count}</Typography>
        <Button onClick={storeValue.increase}> PLUS </Button>
    </Box>
}

export default AddCourse;