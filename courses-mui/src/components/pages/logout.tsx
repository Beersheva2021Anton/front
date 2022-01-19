import { Box, Button, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Navigate } from "react-router-dom";
import { PATH_LOGIN } from "../../config/routes-config";
import { authService } from "../../config/service-config";

const Logout: FC = () => {

    const [flagNavigate, setFlagNavigate] = useState<boolean>(false);

    async function logout() {
        const res = await authService.logout();
        setFlagNavigate(res);
    }

    return <Box marginX='1em'>
        <Typography variant="h2">Sign Out</Typography>
        <Button sx={{ mt: 2 }} variant="outlined" onClick={logout}>Confirm Logout</Button>
        { flagNavigate && <Navigate to={PATH_LOGIN} />}
    </Box>
}

export default Logout;