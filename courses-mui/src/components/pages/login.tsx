import { FC } from "react";
import { LoginData } from "../../models/common/login-data";
import LoginForm from "../common/login-form";
import { authService, passwordLength } from "../../config/service-config";
import { Box, Typography } from "@mui/material";

const Login: FC = () => {

    function loginFunction(loginData: LoginData): Promise<boolean>  {
        return authService.login(loginData);
    }
    function passValidationFn(password: string): string {
        return password.length < passwordLength
            ? `Password length cannot be less than ${passwordLength}`
            : ''
    }

    return <Box marginX='1em'>
        <Typography variant="h2">Sign In</Typography>
        <LoginForm loginFn={loginFunction} passwordValidationFn={passValidationFn} />
    </Box>
}

export default Login;