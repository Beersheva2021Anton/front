import { Alert, Avatar, Box, Button, Container, createTheme, CssBaseline, IconButton, TextField, ThemeProvider, Typography } from '@mui/material';
import { FC, useState, useEffect, useRef } from 'react';
import { LoginData } from '../../models/common/login-data';
import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { providers } from '../../config/fire-config';
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth';

type LoginFormProps = {
  loginFn: (loginData: LoginData) => Promise<boolean>;
  passwordValidationFn: (password?: string) => string;
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

  function googleProviderHandler(event: any) {
    loginData.provider = new GoogleAuthProvider();
    setLoginData({ ...loginData });
    onSubmit(event);
  }

  function faceBookProviderHandler(event: any) {
    loginData.provider = new FacebookAuthProvider();
    setLoginData({ ...loginData });
    onSubmit(event);
  }

  function twitterProviderHandler(event: any) {
    loginData.provider = new TwitterAuthProvider();
    setLoginData({ ...loginData });
    onSubmit(event);
  }

  type AuthProvidersProps = {
    providers: string[]
  }

  const AuthProviders: FC<AuthProvidersProps> = props => {
    const providers = props.providers;
    return <Box>
      {providers.includes('google')
        && <IconButton onClick={googleProviderHandler} title='Sign In with Google'
          disabled={!!loginData.email || !!loginData.password}>
          <GoogleIcon />
        </IconButton>}
      {providers.includes('facebook')
        && <IconButton onClick={faceBookProviderHandler} title='Sign In with Facebook'
          disabled={!!loginData.email || !!loginData.password}>
          <FacebookIcon />
        </IconButton>}
      {providers.includes('twitter')
        && <IconButton onClick={twitterProviderHandler} title='Sign In with Twitter'
          disabled={!!loginData.email || !!loginData.password}>
          <TwitterIcon />
        </IconButton>}
    </Box>
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
          <AuthProviders providers={providers} />
          {alertFl && <Alert severity='error'>{alertMsg.current}</Alert>}
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
}

export default LoginForm;