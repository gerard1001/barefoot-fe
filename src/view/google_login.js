import React from 'react';
import { Paper, CircularProgress } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import store from '../redux/store';
import { socialLoginAction } from '../redux/actions/socialLogin.action';

const retrieveParams = (params) => {
  const userData = {};
  params.forEach((value, key) => {
    userData[key] = value;
  });

  return userData;
};

const GoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  dispatch(socialLoginAction(retrieveParams(params)));
  if (store.getState().userReducer.isLogged) {
    window.setTimeout(() => {
      /* istanbul ignore next */
      navigate('../dashboard/trips', { replace: true });
    }, 1000);
  }
  return (
    <Paper
      data-testid="paper_1"
      elevation={0}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <CircularProgress data-testid="circular_progress_1" size={100} />
    </Paper>
  );
};

export default GoogleLogin;
