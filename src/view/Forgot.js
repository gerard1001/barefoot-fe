/* eslint-disable jsx-a11y/alt-text */
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import img from '../../public/image/undraw_forgot_password_re_hxwm 1.svg';
import LandingFooter from '../components/landing/footer';
import Header from '../components/landing/header';
import { sendEmail } from '../redux/actions/Forgot.action';

const ResetImage = styled('img')(({ theme }) => ({
  width: 400,
  height: 320,
  marginBottom: '10px',
}));
/* istanbul ignore next */
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
const ResetBtn = styled(Button)(({ theme }) => ({
  width: 350,
  height: 50,
  margin: '20px 0px',
  backgroundColor: '#00095E',
  fontSize: '18px',
  color: 'white',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#00095E',
    color: '#FFC800',
  },
  [theme?.breakpoints.down('sm')]: {
    width: 280,
    height: 50,
    margin: '30px 0px',
  },
}));

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState({});
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const { forgot } = state;

  const validate = () => {
    // eslint-disable-next-line no-useless-escape
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const emailError =
      !email.match(regexEmail) && email.length
        ? 'Invalid email'
        : email.match(regexEmail)
        ? ''
        : 'Email required';
    setValidationError(() => ({
      email: emailError,
    }));

    return Object.values(emailError).every((value) => value === '');
  };

  const onSubmitHandler = async () => {
    if (validate()) {
      setLoading(true);
      await sendEmail(email)(dispatch);
      setLoading(false);
      if (forgot.data.message) {
        setEmail('');
      }
    } else {
      setEmail('');
    }
  };
  const EmailText = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          margin: '100px 20px',
          background: 'F8F9FA',
          justifyContent: 'space-evenly',
        }}
      >
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {' '}
          <ResetImage src={img} alt="reset" />
        </Box>
        <Box
          sx={{
            width: { xs: 300, sm: 460 },
            minHeight: { xs: 350, sm: 650, md: 650, lg: 350 },
            backgroundColor: '#EBF2FA',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            padding: '10px 0px',
            margin: '0px 20px',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: '35px',
              fontWeight: '600',
              color: '#00095E',
              fontFamily: 'Robot, sans-serif',
              paddingTop: '30px',
              paddingBottom: '10px',
            }}
          >
            {' '}
            Forgot Password
          </Typography>
          <Stack sx={{ width: '75%', marginTop: 1 }} spacing={2}>
            {forgot.error.message && (
              <Alert
                autoHideDuration={2000}
                variant="outlined"
                severity="error"
              >
                {' '}
                {forgot.error.message}{' '}
              </Alert>
            )}{' '}
            {forgot.data.message && (
              <Alert variant="outlined" severity="success">
                {' '}
                {forgot.data.message}{' '}
              </Alert>
            )}{' '}
          </Stack>
          <StyledInputs
            label="Email"
            type="text"
            value={email}
            {...(validationError.email && {
              error: true,
              helperText: validationError.email,
            })}
            onChange={EmailText}
          />
          <ResetBtn onClick={onSubmitHandler} variant="contained">
            {' '}
            {loading ? (
              <CircularProgress
                sx={{
                  color: 'white',
                }}
                size={30}
                thickness={4}
              />
            ) : (
              'Submit'
            )}
          </ResetBtn>{' '}
        </Box>
      </Box>{' '}
      <LandingFooter />
    </>
  );
}
