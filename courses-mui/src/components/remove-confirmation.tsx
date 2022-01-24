import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FC } from "react";

type RemoveProps = {
    isVisible: boolean,
    title: string,
    message: string,
    onClose: (status: boolean) => void
}

const ActionConfirmation: FC<RemoveProps> = (props) => {
    const { isVisible, title, message, onClose } = { ...props };

    return <Dialog
        open={isVisible}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {title}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {message}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => onClose(false)}>Cancel</Button>
            <Button onClick={() => onClose(true)} autoFocus>
                OK
            </Button>
        </DialogActions>
    </Dialog>
}

export default ActionConfirmation;