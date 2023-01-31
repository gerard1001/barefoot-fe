/* eslint-disable import/prefer-default-export */
import axiosInstance from '../../axios/axios.instance';
import { GET_ONE_TRIP, GET_ONE_TRIP_PENDING } from '../types/read_one.types';

export const getTrip = (id) => async (dispatch) => {
  await dispatch({
    type: GET_ONE_TRIP_PENDING,
  });
  const res = await axiosInstance.get(`/trips/${id}`);
  await dispatch({
    type: GET_ONE_TRIP,
    payload: res.data.trip,
  });
};
