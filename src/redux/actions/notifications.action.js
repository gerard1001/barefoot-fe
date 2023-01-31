import { toast } from 'react-toastify';
import {
  FETCH_NOTIFICATIONS,
  MARK_ALL_NOTIFICATIONS,
  MARK_SINGLE_NOTIFICATION,
  UPDATE_NOTIFICATION,
} from '../types/notifications.type';
import axios from '../../axios/axios.instance';

export const fetchNotifications = (page, limit) => async (dispatch) => {
  try {
    await dispatch({
      type: `${FETCH_NOTIFICATIONS}_PENDING`,
    });
    const res = await axios(`/notifications?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
    await dispatch({
      type: `${FETCH_NOTIFICATIONS}_SUCCESS`,
      payload: {
        unread: res.data.data.unreadNotifications,
        Notifications: res.data.data.getnotification,
      },
      error: null,
    });
  } catch (error) {
    await dispatch({
      type: `${FETCH_NOTIFICATIONS}_ERROR`,
      payload: error.response.data,
    });
  }
};

export const markAllNotifications = () => async (dispatch) => {
  try {
    await dispatch({
      type: `${MARK_ALL_NOTIFICATIONS}_PENDING`,
    });
    const res = await axios('/notifications', { method: 'PATCH' });
    await dispatch({
      type: `${MARK_ALL_NOTIFICATIONS}_SUCCESS`,
      payload: res,
    });
    toast.success(res.message);
  } catch (err) {
    toast.error(err.response.data.message);

    await dispatch({
      type: `${MARK_ALL_NOTIFICATIONS}_ERROR`,
      payload: err.response.data,
    });
  }
};

export const readOneNotification = (id) => async (dispatch) => {
  const res = await axios(`/notifications/${id}`, { method: 'PATCH' });
  await dispatch({
    type: MARK_SINGLE_NOTIFICATION,
    payload: { id, res },
  });
};

export const newNotification = (payload) => async (dispatch) => {
  dispatch({
    type: UPDATE_NOTIFICATION,
    payload,
  });
};
