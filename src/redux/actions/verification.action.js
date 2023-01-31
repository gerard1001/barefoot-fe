import { VERIFY_EMAIL, ERROR_VERIFYING } from '../types/verification.types';
import axios from '../../axios/axios.instance';

export const verifyEmail = (data) => ({
  type: VERIFY_EMAIL,
  payload: data,
  loading: false,
});
export const errorVerifyingEmail = (error) => ({
  type: ERROR_VERIFYING,
  payload: error,
  loading: false,
});

export const emailVerificationAction = (token) => async (dispatch) => {
  try {
    const res = await axios(`/users/verify-email/${token}`, {
      method: 'GET',
    });
    /* istanbul ignore next */
    if (res.status === 200) {
      dispatch(verifyEmail(res.data));
    } else {
      dispatch(errorVerifyingEmail(res.data));
    }
  } catch (error) {
    /* istanbul ignore next */
    dispatch(errorVerifyingEmail(error.response));
  }
};
