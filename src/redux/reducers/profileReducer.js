/* eslint-disable import/prefer-default-export */
import {
  RETRIEVE_PROFILE,
  UPDATE_PROFILE,
  RETRIEVING_ERROR,
  UPDATING_ERROR,
} from '../types/profile.types';

const initialState = {
  loading: true,
  data: [],
  error: [],
  profile: '',
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_PROFILE:
      return { ...state, data: action.payload, loading: false };

    case UPDATE_PROFILE:
      return { ...state, profile: action.payload };

    case RETRIEVING_ERROR:
      return { ...state, error: action.payload };

    case UPDATING_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
