import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FC } from "react";
import BuildIcon from '@mui/icons-material/Build';

type AlertProps = {
    isVisible: boolean,
    title: string,
    message: string
}

const Alert: FC<AlertProps> = (props) => {
    const { isVisible, title, message } = props;
    return <Dialog open={isVisible}>
    <DialogTitle><BuildIcon/> {title}</DialogTitle>
    <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {message}
            </DialogContentText>
        </DialogContent>
  </Dialog>
}

export default Alert;