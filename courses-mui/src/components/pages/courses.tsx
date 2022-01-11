import { Typography, Box, Button, List, ListItemText } from "@mui/material";
import { FC, useContext } from "react";
import CoursesContext from "../../store/context";

const Courses: FC = () => {
    const context = useContext(CoursesContext);
    return <Box>
        <Typography variant="h2">Courses</Typography>
        <List>{context.list.map(c =>
            <Box>
                <ListItemText sx={{ display: "inline-flex", flexDirection: "row" }}>{c.name + " | " + c.cost + " | " + c.lecturer}</ListItemText>
                <Button sx={{ marginBottom: '10px'}} variant="text" onClick={() => context.remove!(c.id)}>DEL</Button>
            </Box>
        )}
        </List>
    </Box>
}

export default Courses;