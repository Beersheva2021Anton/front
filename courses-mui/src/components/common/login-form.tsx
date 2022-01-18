import { Button, TextField } from '@mui/material';
import { FC, useState, useEffect } from 'react';
import { LoginData } from '../../models/common/login-data';

type LoginFormProps = {
    loginFn: (loginData: LoginData) => Promise<boolean>;
    passwordValidationFn: (password: string) => string;
}

const LoginForm: FC<LoginFormProps> = props => {

    const emptyLoginData: LoginData = { email: '', password: ''};
    const {loginFn, passwordValidationFn} = props;
    const [loginData, setLoginData] = useState<LoginData>(emptyLoginData);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [flagSubmit, setFlagSubmit] = useState<boolean>(false);

    useEffect(() => {
        setFlagSubmit(!!loginData.email && !passwordValidationFn(loginData.password));
    }, [loginData]);

    async function onSubmit(event: any) {
        event.preventDefault();
        const res: boolean = await loginFn(loginData);
        if (!res) {
            alert('Wrong credentials');
        }
    }

    function userNameHandler(event: any) {
        loginData.email = event.target.value;
        setLoginData({...loginData});
    }

    function passwordHandler(event:any) {
        const password = event.target.value;
        const message = passwordValidationFn(password);
        setErrorMessage(message);
        loginData.password = password;
        setLoginData({...loginData});
    }

    return <form onSubmit={onSubmit} onReset={() => setLoginData(emptyLoginData)}>
        <TextField placeholder='username/email' required onChange={userNameHandler} />
        <TextField placeholder='password' type='password' error={!!errorMessage} 
            helperText={errorMessage} required onChange={passwordHandler} />
        <Button type='submit' disabled={!flagSubmit}>Log In</Button>
        <Button type='reset'>Reset</Button>
    </form>
}

export default LoginForm;