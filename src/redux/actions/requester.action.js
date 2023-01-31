/* eslint-disable prettier/prettier */
/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
import { toast } from 'react-toastify';
import {
  FETCH_REQUESTS_PENDING,
  FETCH_REQUESTS_SUCCESS,
  FETCH_REQUESTS_ERROR,
  DELETE_REQUESTS_PENDING,
  DELETE_REQUESTS_SUCCESS,
  DELETE_REQUESTS_ERROR,
  APPROVE_PENDING_REQUEST,
  APPROVE_REQUEST_SUCCESS,
  APPROVE_REQUEST_ERROR,
  REJECT_PENDING_REQUEST,
  REJECT_REQUEST_SUCCESS,
  REJECT_REQUEST_ERROR,
} from '../types/Requester.Types';
import axios from '../../axios/axios.instance';

export const retrieveRequests = (page, rowsPerPage) => async (dispatch) => {
  try {
    await dispatch({
      type: FETCH_REQUESTS_PENDING,
    });

    const res = await axios(`/trips/?page=${page + 1}&limit=${rowsPerPage}`, {
      method: 'GET',
    });
    /* istanbul ignore next */
    await dispatch({
      type: FETCH_REQUESTS_SUCCESS,
      payload: res.data,
      error: null,
    });
  } catch (err) {
    await dispatch({ type: FETCH_REQUESTS_ERROR, payload: err.response.data });
  }
};
/* istanbul ignore next */
export const deleteRequestAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_REQUESTS_PENDING,
    });
    const res = await axios(`/trips/${id}`, { method: 'DELETE' });
    dispatch({
      type: DELETE_REQUESTS_SUCCESS,
      payload: { id, res },
      error: null,
    });
    toast.success(res.data.message);
  } catch (err) {
    toast.error(err.response.data.message);
    dispatch({ type: DELETE_REQUESTS_ERROR, payload: err.response.data });
  }
};
/* istanbul ignore next */
export const approveRequestAction = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: APPROVE_PENDING_REQUEST });
    const res = await axios(`/trips/${id}`, {
      method: 'PATCH',
      data: { status }
    });
    dispatch({
      type: APPROVE_REQUEST_SUCCESS,
      payload: {id, res, status},
      error: null
    });
    toast.success(res.data.message);
  } catch (err) {
    toast.error(err.response.data.message);
    dispatch({ type: APPROVE_REQUEST_ERROR, payload: err.response.data });
  }
};
/* istanbul ignore next */
export const rejectRequestAction = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: REJECT_PENDING_REQUEST });
    const res = await axios(`/trips/${id}`, {
      method: 'PATCH',
      data: { status }
    });
    dispatch({
      type: REJECT_REQUEST_SUCCESS,
      payload: {id, res,status},
      error: null
    });
    toast.success(res.data.message);
  } catch (err) {
    toast.error(err.response.data.message);
    dispatch({ type: REJECT_REQUEST_ERROR, payload: err.response.data });
  }
};