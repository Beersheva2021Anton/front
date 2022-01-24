import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Paper, PaperProps, useIsFocusVisible } from "@mui/material";
import { FC } from "react";
import Draggable from "react-draggable";
import CourseType from "../models/course-type";

type CourseInfoProps = {
    isVisible: boolean,
    onClose: () => void,
    data: CourseType
}

const CourseInfo: FC<CourseInfoProps> = (props) => {

    const { isVisible, onClose, data } = { ...props };

    function PaperComponent(props: PaperProps) {
        return (
            <Draggable
                handle="#draggable-dialog-title"
                cancel={'[class*="MuiDialogContent-root"]'}
            >
                <Paper {...props} />
            </Draggable>
        );
    }

    return <Dialog
        open={isVisible}
        onClose={onClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
    >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Details
        </DialogTitle>
        <DialogContent>
            <List>
                { isVisible && Object.keys(data).map(key => 
                    <ListItem>{`${key}: ${(data as any)[key]}`}</ListItem>) }
            </List>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={onClose}>
                OK
            </Button>
        </DialogActions>
    </Dialog>
}

export default CourseInfo;