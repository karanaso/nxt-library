import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { links } from '../../helpers/links';
import { login } from '../../helpers/auth';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../components/SnackbarComponent';
import { useIntl } from 'react-intl';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://sekdev.com/" target="_blank">
        SEKDev.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const SignIn = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { showSnackbar } = useSnackbar();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await login({
        username,
        password: password
      });

      navigate(links.home.index);
      if (response) {
        showSnackbar(
          intl.formatMessage({ id: 'WelcomeBack' }),
          'success',
        )
      }
    } catch (e) {
      localStorage.clear();
      alert(intl.formatMessage({ id: 'OopsSignIn' }));
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <cite></cite>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={intl.formatMessage({ id: 'email' })}
              name="username"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={intl.formatMessage({ id: 'password' })}
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              {intl.formatMessage({ id: 'SignIn' })}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href={links.user.forgotPassword} variant="body2">
                {intl.formatMessage({ id: 'ForgotPassword' })}?
                </Link>
              </Grid>
              <Grid item>
                <Link href={links.user.signup} variant="body2">
                  {intl.formatMessage({ id: 'DontHaveAnAccountSignUp' })}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}