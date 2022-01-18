import { FC, useState } from "react";
import { LoginData } from "../../models/common/login-data";
import LoginForm from "../common/login-form";
import courseData from "../../config/course-data.json";
import { authService } from "../../config/service-config";
import { Box, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { PATH_COURSES } from "../../config/routes-config";

const Login: FC = () => {

    const [flagNavigate, setFlagNavigate] = useState<boolean>(false);
    
    async function loginFunction(loginData: LoginData): Promise<boolean>  {
        const res = await authService.login(loginData);
        setFlagNavigate(res);
        return res;
    }
    function passValidationFn(password: string): string {
        return password.length < courseData.passwordLength
            ? `Password length cannot be less than ${courseData.passwordLength}`
            : ''
    }

    return <Box marginX='1em'>
        <Typography variant="h2">Sign In</Typography>
        <LoginForm loginFn={loginFunction} passwordValidationFn={passValidationFn} />
        { flagNavigate && <Navigate to={PATH_COURSES} />}
    </Box>
}

export default Login;