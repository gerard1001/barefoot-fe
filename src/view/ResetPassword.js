/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Box,
  CircularProgress,
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import imgsvg from '../../public/image/Group 47.svg';
import Buttons from '../components/button';
import LandingFooter from '../components/landing/footer';
import Header from '../components/landing/header';
import { Reset } from '../redux/actions/ResetPassword.action';
import store from '../redux/store';

const StyledInputs = styled(TextField)(({ theme }) => ({
  [theme?.breakpoints.down('sm')]: {
    width: 280,
    height: 20,
    margin: '30px 0px',
  },
  width: 350,
  height: 50,
  margin: '20px 0px',

  '& .MuiFormLabel-root': {
    color: '#00095E',
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: '#00095E',
  },
  '& .MuiInputBase-root': {
    color: '#00095E',
    '& fieldset': {
      borderColor: '#00095E',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00095E',
    },
  },
  '&.Mui-focused .MuiInputBase-root': {
    color: '#00095E',
  },
}));

const ResetPasswordImage = styled('img')(({ theme }) => ({
  width: 400,
  height: 320,
  objectFit: 'cover',
  marginBottom: '50px',
}));

const mediaStyles = {
  width: {
    xs: 280,
    sm: 350,
    md: 165,
  },
  height: '55px',
  margin: {
    xs: '10px 0px',
    sm: '10px 10px',
  },
  backgroundColor: '#00095E',
  fontSize: '11px',
  color: 'white',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#00095E',
  },
};

const container = {
  display: 'flex',
  flexDirection: {
    xs: 'column',
    md: 'row',
  },
  alignItems: 'center',
  margin: '50px 20px',
  background: 'F8F9FA',
  justifyContent: 'space-evenly',
};

const formSection = {
  width: {
    xs: 300,
    sm: 460,
  },
  minheight: {
    xs: 370,
    md: 430,
  },
  backgroundColor: '#EBF2FA',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 2,
  padding: '10px 0px',
  margin: '0px 20px',
};

const errorresetPassword = {
  border: '1px solid #EC5C5C',
  borderRadius: 1,
  width: {
    xs: 250,
    sm: 320,
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 40,
  fontSize: '16px',
  fontWeight: '500',
  fontFamily: 'Robot, sans-serif',
  color: '#f44336',
};

const ResetPassword = (props) => {
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const resetPasswsord = state.Reset;

  const validate = () => {
    // eslint-disable-next-line no-useless-escape
    const regexConfirmPassword = password;
    const regexPassword = /^(?=.*[A-Z])(?=.*[0-9])\w{8,}$/;
    const ConfirmPasswordError =
      ConfirmPassword !== password
        ? 'Confirm password should match password'
        : ConfirmPassword === password
        ? ''
        : 'Confirm password is required';
    const passwordError =
      !password.match(regexPassword) && password.length > 6
        ? 'Must have at least one digit and capital letter'
        : password.match(regexPassword)
        ? ''
        : 'Password is required';

    setValidationError(() => ({
      ConfirmPassword: ConfirmPasswordError,
      password: passwordError,
    }));

    return Object.values({ ConfirmPasswordError, passwordError }).every(
      (value) => value === '',
    );
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickshowConfirmPassword = () => {
    setshowConfirmPassword(!showConfirmPassword);
  };

  const onSubmitHandler = async () => {
    if (validate()) {
      setLoading(true);
      await Reset(password, token)(dispatch);
      /* istanbul ignore next */
      setLoading(false);
    }
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onchangeConfrimpassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <Header />
      <Box sx={container}>
        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'flex',
            },
          }}
        >
          <ResetPasswordImage src={imgsvg} alt="login" />
        </Box>

        <Box sx={formSection}>
          <Typography
            variant="h4"
            sx={{
              fontSize: '35px',
              fontWeight: '600',
              color: '#00095E',
              fontFamily: 'Robot, sans-serif',
              paddingTop: '20px',
              paddingBottom: '10px',
            }}
          >
            Reset Password
          </Typography>
          {error ? (
            <Alert variant="outlined" severity="error" sx={errorresetPassword}>
              {store.getState().userReducer.error.data?.message}
            </Alert>
          ) : null}
          <Stack sx={{ width: '75%', marginTop: 1 }} spacing={2}>
            {resetPasswsord.error.message && (
              <Alert variant="outlined" severity="error">
                {resetPasswsord.error?.message}
              </Alert>
            )}
            {resetPasswsord.data.message && <Navigate to="/login" replace />}
          </Stack>

          <StyledInputs
            onChange={onChangePassword}
            {...(validationError.password && {
              error: true,
              helperText: validationError.password,
            })}
            label="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    data-testid="visibility-button"
                  >
                    {showPassword ? (
                      <VisibilityIcon sx={{ color: '#00095E' }} />
                    ) : (
                      <VisibilityOffIcon sx={{ color: '#00095E' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <StyledInputs
            label="Confirm password"
            data-testid="Confirmpassword"
            type={showConfirmPassword ? 'text' : 'password'}
            {...(validationError.ConfirmPassword && {
              error: true,
              helperText: validationError.ConfirmPassword,
            })}
            variant="outlined"
            onChange={onchangeConfrimpassword}
            value={ConfirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickshowConfirmPassword}
                    edge="end"
                    data-testid="visibility-button1"
                  >
                    {showConfirmPassword ? (
                      <VisibilityIcon sx={{ color: '#00095E' }} />
                    ) : (
                      <VisibilityOffIcon sx={{ color: '#00095E' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Buttons
            variant="contained"
            sx={{
              width: {
                xs: 280,
                sm: 350,
              },
              height: 50,
              margin: {
                xs: '30px 0px',
                sm: '20px 0px',
              },
              backgroundColor: '#00095E',
              fontSize: '16px',
              color: 'white',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#00095E',
              },
            }}
            value={
              loading ? (
                <CircularProgress
                  sx={{
                    color: 'white',
                  }}
                  size={30}
                  thickness={4}
                />
              ) : (
                'Change Password'
              )
            }
            onClick={onSubmitHandler}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
            }}
          />
        </Box>
      </Box>
      <LandingFooter />
    </>
  );
};
export default ResetPassword;
