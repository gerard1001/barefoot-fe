import { toast } from 'react-toastify';
import axiosInstance from '../../axios/axios.instance';
import { ERROR_LOGOUT, LOGOUT_USER } from '../types/logout.types';

const logoutAction = (action) => ({
  type: LOGOUT_USER,
  payload: action,
});

const errorLogout = (action) => ({
  type: ERROR_LOGOUT,
  payload: action,
});

// eslint-disable-next-line import/prefer-default-export
export const logoutUser = () => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/users/logout');
    await dispatch(logoutAction(res));
  } catch (error) {
    await dispatch(errorLogout(error));
    toast.error('Error occured logging out');
  }
};
