/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import axios from '../../axios/axios.instance';
import * as types from '../types/login.types';

/* istanbul ignore next */
export const loggedInUser = () => async (dispatch) => {
  try {
    await dispatch({
      type: types.GET_LOGGEDIN_USER_PROFILE_PENDING,
    });
    const res = await axios(`/users/getOne`, { method: 'GET' });
    await dispatch({
      type: types.GET_LOGGEDIN_USER_PROFILE_SUCCESS,
      payload: res,
      error: null,
    });
  } catch (err) {
    await dispatch({
      type: types.GET_LOGGEDIN_USER_PROFILE_ERROR,
      payload: err,
    });
  }
};
