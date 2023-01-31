/* eslint-disable import/prefer-default-export */
import { toast } from 'react-toastify';
import axiosInstance from '../../axios/axios.instance';
import {
  RETRIEVE_PROFILE,
  UPDATE_PROFILE,
  RETRIEVING_ERROR,
  UPDATING_ERROR,
} from '../types/profile.types';

const updateProfile = (data) => ({
  type: UPDATE_PROFILE,
  payload: data,
});

const updateError = (data) => ({
  type: UPDATING_ERROR,
  payload: data,
});

const retrieveProfile = (data) => ({
  type: RETRIEVE_PROFILE,
  payload: data,
});

const errorRetrieving = (data) => ({
  type: RETRIEVING_ERROR,
  payload: data,
});

export const retrieveAction = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get('/users/getOne');
    dispatch(retrieveProfile(res.data));
  } catch (error) {
    dispatch(errorRetrieving(error));
  }
};

export const updatingAction = (data) => async (dispatch) => {
  try {
    const res = await axiosInstance.patch('/users/profile', data);
    await dispatch(updateProfile(res.data));
    toast.success('Profile has been updated');
  } catch (error) {
    toast.error('Error in updating the profile');
    dispatch(updateError(error));
  }
};
