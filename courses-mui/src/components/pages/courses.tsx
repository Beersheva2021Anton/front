import { Box, Button, Typography } from "@mui/material";
import { FC, useContext } from "react";
import CoursesContext from "../../store/context";

const Courses: FC = () => {
    const storeValue = useContext(CoursesContext);
    return <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <Typography variant="h2">Courses {storeValue.count}</Typography>
        <Button onClick={storeValue.decrease}> MINUS </Button>
    </Box>
}

export default Courses;