import { Alert, Avatar, Box, Button, Container, createTheme, CssBaseline, TextField, ThemeProvider, Typography } from '@mui/material';
import { FC, useState, useEffect, useRef } from 'react';
import { LoginData } from '../../models/common/login-data';
import LoginIcon from '@mui/icons-material/Login';

type LoginFormProps = {
  loginFn: (loginData: LoginData) => Promise<boolean>;
  passwordValidationFn: (password: string) => string;
}

const LoginForm: FC<LoginFormProps> = props => {

  const theme = createTheme();
  const emptyLoginData: LoginData = { email: '', password: '' };
  const { loginFn, passwordValidationFn } = props;
  const [loginData, setLoginData] = useState<LoginData>(emptyLoginData);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [flagSubmit, setFlagSubmit] = useState<boolean>(false);
  const [alertFl, setAlertFl] = useState<boolean>(false);
  let alertMsg = useRef<string>('');

  useEffect(() => {
    setFlagSubmit(!!loginData.email && !passwordValidationFn(loginData.password));
  }, [loginData]);

  async function onSubmit(event: any) {
    event.preventDefault();
    setAlertFl(false);
    try {
      const res: boolean = await loginFn(loginData);
      if (!res) {
        alertMsg.current = 'Wrong credentials';
        setAlertFl(true);
      }
    } catch (err) {
      alertMsg.current = 'Server unavailable';
      setAlertFl(true);
    }
  }

  function userNameHandler(event: any) {
    loginData.email = event.target.value;
    setLoginData({ ...loginData });
  }

  function passwordHandler(event: any) {
    const password = event.target.value;
    const message = passwordValidationFn(password);
    setErrorMessage(message);
    loginData.password = password;
    setLoginData({ ...loginData });
  }

  return <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LoginIcon />
        </Avatar>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={userNameHandler}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={passwordHandler}
            error={!!errorMessage}
            helperText={errorMessage}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!flagSubmit}
          >
            Sign In
          </Button>
          {alertFl && <Alert severity='error'>{alertMsg.current}</Alert>}
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
}

export default LoginForm;