import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem } from "@mui/material";
import { FC, ReactElement } from "react";

type DialogInfoProps = {
    isVisible: boolean,
    onClose: () => void,
    data: Object,
    properties: string[]
}

const DialogInfo: FC<DialogInfoProps> = (props) => {

    const { isVisible, onClose, data, properties } = { ...props };

    function mapObjectToItems(): ReactElement[] {
        let res: ReactElement[] = [];
        for (let property of properties) {
            res.push(<ListItem key={property}>{`${property}: ${(data as any)[property]}`}</ListItem>);
        }
        return res;
    }

    return <Dialog
        open={isVisible}
        onClose={onClose}
        aria-labelledby="info-dialog-title"
    >
        <DialogTitle style={{ cursor: 'move' }} id="info-dialog-title">
            Details
        </DialogTitle>
        <DialogContent>
            <List>
                { isVisible && mapObjectToItems() }
            </List>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={onClose}>
                OK
            </Button>
        </DialogActions>
    </Dialog>
}

export default DialogInfo;