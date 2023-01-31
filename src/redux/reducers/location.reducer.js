/* eslint-disable import/prefer-default-export */
import {
  GET_LOCATIONS,
  ERR_GETTING_LOCATIONS,
  GET_ONE_LOCATION,
  LOADING_LOCATIONS,
} from '../types/location.types';

const initialState = {
  data: [],
  loading: true,
  error: '',
  oneLocation: [],
};

/* istanbul ignore next */
export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    /* istanbul ignore next */
    case GET_LOCATIONS:
      return { ...state, data: action.payload, error: '', loading: false };
    /* istanbul ignore next */
    case ERR_GETTING_LOCATIONS:
      return { ...state, data: [], error: action.payload, loading: false };
    case LOADING_LOCATIONS:
      return { ...state, data: [], error: '', loading: true };
    case GET_ONE_LOCATION:
      return { ...state, oneLocation: action.payload };
    default:
      return state;
  }
};
