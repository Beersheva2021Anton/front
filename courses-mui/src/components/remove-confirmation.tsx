import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FC } from "react";

type RemoveProps = {
    isVisible: boolean,
    itemId: number,
    onClose: () => void,
    onRemove: () => void
}

const RemoveConfirmation: FC<RemoveProps> = (props) => {
    const {isVisible, itemId, onClose, onRemove} = {...props};

    return <Dialog
    open={isVisible}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
>
    <DialogTitle id="alert-dialog-title">
        {"Course Remove"}
    </DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove course with ID '{itemId}'?
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onRemove} autoFocus>
            OK
        </Button>
    </DialogActions>
</Dialog>
}

export default RemoveConfirmation;