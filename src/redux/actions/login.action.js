/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import { LOGIN_USER, ERROR_LOGIN } from '../types/login.types';

import axios from '../../axios/axios.instance';

export const userLogin = (data) => {
  return {
    type: LOGIN_USER,
    payload: data,
    isLogged: true,
    loading: false,
  };
};

export const errorLogin = (error) => {
  return {
    type: ERROR_LOGIN,
    payload: error,
    isLogged: false,
    loading: false,
  };
};

export const loginAction = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const res = await axios('/users/login', {
        method: 'POST',
        data: {
          email,
          password,
        },
      });
      /* istanbul ignore next */
      if (res.status === 201) {
        localStorage.setItem('userCredentials', JSON.stringify(res.data));
        dispatch(userLogin(res.data));
      } else {
        dispatch(errorLogin(res.data));
      }
    } catch (error) {
      /* istanbul ignore next */
      dispatch(errorLogin(error.response));
    }
  };
};
