/* eslint-disable import/prefer-default-export */
import { GET_ONE_TRIP, GET_ONE_TRIP_PENDING } from '../types/read_one.types';

const initialState = {
  trip: [],
  loading: '',
};

/* istanbul ignore next */
export const getTripReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ONE_TRIP_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_ONE_TRIP:
      return {
        ...state,
        trip: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
