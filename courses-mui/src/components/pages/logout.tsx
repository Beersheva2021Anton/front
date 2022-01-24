import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { authService } from "../../config/service-config";

const Logout: FC = () => {

    function logout() {
        authService.logout();
    }

    return <Box marginX='1em'>
        <Typography variant="h2">Sign Out</Typography>
        <Button sx={{ mt: 2 }} variant="outlined" onClick={logout}>Confirm Logout</Button>
    </Box>
}

export default Logout;