import { Typography, Box, Button, List, ListItemText } from "@mui/material";
import { FC, useContext } from "react";
import CoursesContext from "../../store/context";
import ClearIcon from '@mui/icons-material/Clear';

const Courses: FC = () => {
    const context = useContext(CoursesContext);
    return <Box marginX='1em'>
        <Typography variant="h2">Courses</Typography>
        <List>{context.list.map(c =>
            <Box key={c.id}>
                <ListItemText sx={{ display: "inline-flex", flexDirection: "row" }}>{c.name + " | " + c.cost + " | " + c.lecturer}</ListItemText>
                <Button variant="text" onClick={() => context.remove!(c.id!)} 
                    disabled={!context.userData.isAdmin}>
                    <ClearIcon/>
                </Button>
            </Box>
        )}
        </List>
    </Box>
}

export default Courses;