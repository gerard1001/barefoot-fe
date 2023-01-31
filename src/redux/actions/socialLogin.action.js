import { LOGIN_USER } from '../types/login.types';
/* istanbul ignore next */
export const userLogin = (data) => ({
  type: LOGIN_USER,
  payload: data,
  isLogged: true,
  loading: false,
});

export const socialLoginAction = (data) => async (dispatch) => {
  const roleId = parseInt(data.role_id, 10);
  const userCredentials = {
    ...data,
    role_id: roleId,
  };
  localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
  dispatch(userLogin(data));
};
