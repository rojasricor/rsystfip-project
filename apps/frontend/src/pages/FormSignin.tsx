import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useMutation } from 'react-query';
import {
  NavigateFunction,
  Link as RouterLink,
  useNavigate,
} from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import Copyright from '../components/Copyright';
import { AUTH_KEY } from '../constants';
import { AuthState, setAuthenticatedUser } from '../features/auth/authSlice';
import { notify } from '../libs/notify';
import * as authService from '../services/auth.service';
import { THandleChangeI } from '../types/THandleChanges';
import { THandleSubmit } from '../types/THandleSubmits';

function FormSignin() {
  const formDataInitialState = {
    username: '',
    password: '',
    passwordVisible: false,
  };
  const [formData, setFormData] = useState(formDataInitialState);

  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const { mutate, isLoading } = useMutation(authService.auth, {
    onSuccess({ data, headers }) {
      const sessionToSave: AuthState = {
        ...data,
        token: headers.authorization,
      };

      window.localStorage.setItem(AUTH_KEY, JSON.stringify(sessionToSave));
      dispatch(setAuthenticatedUser(sessionToSave));
      navigate('/home');
    },
    onError(error: any) {
      notify(error.response.data.error, { type: 'error' });
    },
  });

  const handleClickTogglePassword = () => {
    setFormData({
      ...formData,
      passwordVisible: !formData.passwordVisible,
    });
  };

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();

    const payload = {
      username: formData.username,
      password: formData.password,
    };

    mutate(payload);
  };

  const handleChange = (e: THandleChangeI) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="username"
        label="Username"
        onChange={handleChange}
        value={formData.username}
        autoComplete="off"
        spellCheck={false}
        inputProps={{ minLength: 5, maxLength: 30 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography>@itfip.edu.co</Typography>
            </InputAdornment>
          ),
        }}
        autoFocus
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={formData.passwordVisible ? 'text' : 'password'}
        onChange={handleChange}
        value={formData.password}
        autoComplete="off"
        spellCheck={false}
        inputProps={{ minLength: 8, maxLength: 30 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickTogglePassword}>
                {formData.passwordVisible ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <FormControlLabel
        control={<Checkbox name="remember" color="primary" />}
        label="Remember me"
      />

      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        loading={isLoading}
      >
        Sign In
      </LoadingButton>

      <Grid container>
        <Grid item xs>
          <Link component={RouterLink} to="/recover-password" variant="body2">
            {'Forgot password?'}
          </Link>
        </Grid>
      </Grid>

      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}

export default FormSignin;
