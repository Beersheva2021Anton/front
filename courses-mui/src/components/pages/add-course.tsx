import { Box, Button, List, ListItemText, Typography } from "@mui/material";
import { FC, useContext } from "react";
import CoursesContext from "../../store/context";

const AddCourse: FC = () => {
    const context = useContext(CoursesContext);
    return <Box marginX='1em'>
        <Typography variant="h2">Add New Course</Typography>
        <Button onClick={() => context.add!()} variant="outlined">Generate</Button>
        <List>{context.list.map(c => 
            <ListItemText key={c.id}>{c.name + " | " + c.cost + " | " + c.lecturer}</ListItemText>)}
        </List>
    </Box>
}

export default AddCourse;