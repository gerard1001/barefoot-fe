import { toast } from 'react-toastify';
import {
  FETCH_ALL_BOOKINGS_PENDING,
  FETCH_ALL_BOOKINGS_SUCCESS,
  FETCH_ALL_BOOKINGS_FAILED,
  CREATE_BOOKING_PENDING,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_FAILED,
  FETCH_USER_BOOKINGS_FAILED,
  FETCH_USER_BOOKINGS_PENDING,
  FETCH_USER_BOOKINGS_SUCCESS,
  UPDATE_BOOKING_FAILED,
  UPDATE_BOOKING_PENDING,
  UPDATE_BOOKING_SUCCESS,
  DELETE_BOOKING_FAILED,
  DELETE_BOOKING_SUCCESS,
} from '../types/booking.types';
import axiosInstance from '../../axios/axios.instance';
/* istanbul ignore next */
export const createBookingAction = (roomId, data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BOOKING_PENDING });
    const res = await axiosInstance.post(`/rooms/${roomId}/booking`, data);
    dispatch({
      type: CREATE_BOOKING_SUCCESS,
      payload: res.data,
      error: null,
    });
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({ type: CREATE_BOOKING_FAILED, payload: error.response.data });
  }
};
/* istanbul ignore next */
export const fetchAllBookingsAction = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_BOOKINGS_PENDING });
    const res = await axiosInstance.get(`/rooms/${roomId}/booking`);
    dispatch({
      type: FETCH_ALL_BOOKINGS_SUCCESS,
      payload: res.data,
      error: null,
    });
  } catch (error) {
    // toast.error(error.response.data.message);
    dispatch({ type: FETCH_ALL_BOOKINGS_FAILED, payload: error.response.data });
  }
};

/* istanbul ignore next */
export const fetchUserBookingsAction = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_BOOKINGS_PENDING });
    const res = await axiosInstance.get('/rooms/booking');
    dispatch({
      type: FETCH_USER_BOOKINGS_SUCCESS,
      payload: res.data,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_BOOKINGS_FAILED,
      payload: error.response.data,
    });
  }
};

/* istanbul ignore next */
export const updateBookingAction =
  (roomId, bookingId, data) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_BOOKING_PENDING });
      const res = await axiosInstance.patch(
        `/rooms/${roomId}/booking/${bookingId}`,
        data,
      );
      dispatch({
        type: UPDATE_BOOKING_SUCCESS,
        payload: res.data,
        error: null,
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({
        type: UPDATE_BOOKING_FAILED,
        payload: error.response.data,
      });
    }
  };

export const deleteBookingAction = (roomId, bookingId) => async (dispatch) => {
  try {
    const res = await axiosInstance.delete(
      `/rooms/${roomId}/booking/${bookingId}`,
    );
    dispatch({
      type: DELETE_BOOKING_SUCCESS,
      payload: res.data,
      pending: false,
      error: null,
    });
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({
      type: DELETE_BOOKING_FAILED,
      pending: false,
      payload: error.response.data,
    });
  }
};
