/* eslint-disable consistent-return */
/* eslint-disable semi */
/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import { GETLOCATIONS } from '../actionTypes/actionTypes';

const initialState = {
  locations: [],
};

const landingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETLOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    default:
      return state;
  }
};

export default landingReducer;
