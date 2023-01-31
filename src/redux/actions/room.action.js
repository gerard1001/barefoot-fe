import { toast } from 'react-toastify';
import {
  CREATE_ROOM_PENDING,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILED,
  FETCH_ROOM_PENDING,
  FETCH_ROOM_SUCCESS,
  FETCH_ROOM_FAILED,
} from '../types/room.types';
import axiosInstance from '../../axios/axios.instance';

/* istanbul ignore next */
export const createRoomAction = (room, accId) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ROOM_PENDING });
    const res = await axiosInstance.post(
      `/accommodations/${accId}/rooms`,
      room,
    );
    dispatch({
      type: CREATE_ROOM_SUCCESS,
      payload: res.data,
      error: null,
    });
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({ type: CREATE_ROOM_FAILED, payload: error.response.data });
  }
};

export const fetchSingleRoomAction = (roomId, accId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ROOM_PENDING });
    const res = await axiosInstance.get(
      `/accommodations/${accId}/room/${roomId}`,
    );
    dispatch({
      type: FETCH_ROOM_SUCCESS,
      payload: res.data,
      error: null,
    });
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({ type: FETCH_ROOM_FAILED, payload: error.response.data });
  }
};
