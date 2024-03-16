import React, {useState} from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Link,
  CircularProgress
} from '@mui/material';

import {useSelector} from 'react-redux';
import {registration} from './usersThunk.ts';
import {errorRegistration, loadingRegistration} from './usersSlice.ts';
import {useAppDispatch} from '../../app/hooks.ts';

import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { RegisterUser } from '../../types';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const RegisterForm = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useSelector(errorRegistration);

  const isRegistration = useSelector(loadingRegistration);

  const [state, setState] = useState<RegisterUser>({
    username: '',
    displayName: '',
    password: '',
  });

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };


  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(registration(state)).unwrap();
      navigate('/');
    } catch (e) {
      //error
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={submitForm} sx={{mt: 1}}>
          <TextField
            required
            fullWidth
            id="username"
            type="username"
            name="username"
            value={state.username}
            label="Username"
            onChange={inputChange}
            error={Boolean(getFieldError('username'))}
            helperText={getFieldError('username')}
            margin="normal"
            autoComplete="new-username"
            autoFocus
          />
          <TextField
            required
            fullWidth
            id="displayName"
            type="displayName"
            name="displayName"
            value={state.displayName}
            label="Original name"
            onChange={inputChange}
            error={Boolean(getFieldError('displayName'))}
            helperText={getFieldError('displayName')}
            margin="normal"
            autoComplete="new-displayName"
            autoFocus
          />

          <TextField
            required
            fullWidth
            id="password"
            type="password"
            name="password"
            value={state.password}
            label="Password"
            onChange={inputChange}
            error={Boolean(getFieldError('password'))}
            helperText={getFieldError('password')}
            margin="normal"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            disabled={isRegistration}
          >
            {isRegistration ? <CircularProgress/> : 'Sign Up'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;