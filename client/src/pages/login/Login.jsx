
import * as React from 'react';
import {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { setWarningAlerts, setSuccessAlerts, setErrorAlerts } from '../../actions/darkActions'
import {  login, clearErrors, setLoading } from '../../actions/authActions'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        pesaApp company
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Login = ({setWarningAlerts, setSuccessAlerts, setErrorAlerts, authState, login, clearErrors, setLoading}) => {
  const navigate = useNavigate()
  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error, isAuthenticated } = authState

  useEffect(() => {
    if (isAuthenticated) {
      setSuccessAlerts('Your logged in')
      navigate('/');
    }

    if (error) {
      if (error.includes('9000')) {
        setErrorAlerts(error)
        clearErrors()
      }
    }
    //eslint-disable-next-line
  }, [error,isAuthenticated,authState.history])

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (email === "" || password === "") {
      setWarningAlerts("Please Fill both fields")
    } else {
      login({email, password})
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={event => setEmail(event.target.value)}
              error = {email === ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={event => setPassword(event.target.value)}
              error = {password === ""}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

Login.propTypes = {
  setWarningAlerts : PropTypes.func.isRequired,
  setSuccessAlerts : PropTypes.func.isRequired,
  setErrorAlerts : PropTypes.func.isRequired,
  login : PropTypes.func.isRequired,
  setLoading : PropTypes.func.isRequired,
  clearErrors : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  authState : state.authState
})

export default connect(mapStateToProps, { setWarningAlerts, setSuccessAlerts, setErrorAlerts, login, clearErrors, setLoading })(Login)