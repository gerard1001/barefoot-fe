import { toast } from 'react-toastify';
import axiosInstance from '../../axios/axios.instance';
import {
  ASSIGNROLE,
  ASSIGNROLEERROR,
  ASSIGN_MANAGER,
  GETALLROLES,
  GETUSERS,
  GET_DETAILED,
} from '../types/user_role_settings.types';

export const assignRoleAction = (payload) => ({
  type: ASSIGNROLE,
  payload,
});

/* istanbul ignore next */
export const assignRoleActionError = (payload) => ({
  type: ASSIGNROLEERROR,
  payload,
});

export const getRolesAction = (payload) => ({
  type: GETALLROLES,
  payload,
});
/* istanbul ignore next */
export const assign = (data) => async (dispatch) => {
  try {
    await axiosInstance.patch('/users/assignRole', data).then((res) => {
      dispatch(assignRoleAction(res.data.message));
      toast.success(res.data.message);
    });
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(assignRoleActionError(error.response.data.message));
  }
};
/* istanbul ignore next */
export const getAll = () => async (dispatch) => {
  try {
    await axiosInstance.get('/users/getRoles').then((res) => {
      dispatch(getRolesAction(res.data.data));
    });
  } catch (error) {}
};
/* istanbul ignore next */
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axiosInstance(`/users`, { method: 'GET' });
    const users = res.data.data.map((user) => user.email);
    await dispatch({
      type: GETUSERS,
      payload: users,
    });
    await dispatch({
      type: GET_DETAILED,
      payload: res.data.data,
    });
  } catch (err) {}
};
/* istanbul ignore next */
export const assignManager = (data) => async (dispatch) => {
  try {
    const res = await axiosInstance.put(`/users/assign-to-manager`, data);
    dispatch({
      type: ASSIGN_MANAGER,
    });
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.message);
  }
};
