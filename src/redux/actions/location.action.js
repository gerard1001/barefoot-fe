import axios from '../../axios/axios.instance';
import { GETLOCATIONS } from '../actionTypes/actionTypes';

import {
  GET_LOCATIONS,
  ERR_GETTING_LOCATIONS,
  GET_ONE_LOCATION,
  LOADING_LOCATIONS,
} from '../types/location.types';
/* istanbul ignore next */
export const getLocs = (data) => ({
  type: GET_LOCATIONS,
  payload: data,
  loading: false,
});
export const errorGettingLocs = (error) => ({
  type: ERR_GETTING_LOCATIONS,
  payload: error,
  loading: false,
});

export const getAllLocations = () => async (dispatch) => {
  await axios('/locations', { method: 'GET' })
    .then((res) => {
      if (res.data.message === 'successfully found locations') {
        dispatch(getLocs(res.data));
      } else {
        /* istanbul ignore next */
        dispatch(errorGettingLocs(res.data));
      }
    })
    .catch((err) => {
      dispatch(errorGettingLocs(err));
    });
};

/* istanbul ignore next */
export const getLocation = (payload) => (dispatch) => {
  dispatch({
    type: GETLOCATIONS,
    payload,
  });
};

/* istanbul ignore next */
export const getLoc = () => async (dispatch) => {
  /* istanbul ignore next */
  await axios.get('/locations', { mostVisited: true }).then((res) => {
    dispatch(getLocation(res.data.data.results));
  });
};
/* istanbul ignore next */
export const oneLocation = (data) => ({
  type: GET_ONE_LOCATION,
  payload: data,
  loading: false,
});

/* istanbul ignore next */
export const getOneLocation = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/locations/${id}`);
    // dispatch
    dispatch(oneLocation(res));
  } catch (error) {
    // dispatch
    dispatch(errorGettingLocs(error));
  }
};

export const loadingLocs = () => ({
  type: LOADING_LOCATIONS,
});
