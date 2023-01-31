import axios from '../../axios/axios.instance';
import {
  RESETPASSWORD,
  RESETPASSWORD_FAILED,
  RESETPASSWORD_SUCCESS,
} from '../types/ResetPasswordType';

export const Reset = (password, token) => async (dispatch) => {
  try {
    dispatch({
      type: RESETPASSWORD,
      payload: 'loading',
    });
    const data = await axios.patch(`/users/reset-password/${token}`, {
      password,
    });
    /* istanbul ignore next */
    dispatch({
      type: RESETPASSWORD_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: RESETPASSWORD_FAILED,
      payload: error.response.data,
    });
  }
};
