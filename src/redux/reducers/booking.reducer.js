import {
  FETCH_ALL_BOOKINGS_PENDING,
  FETCH_ALL_BOOKINGS_SUCCESS,
  FETCH_ALL_BOOKINGS_FAILED,
  CREATE_BOOKING_PENDING,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_FAILED,
  FETCH_USER_BOOKINGS_FAILED,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_PENDING,
  UPDATE_BOOKING_FAILED,
  UPDATE_BOOKING_PENDING,
  UPDATE_BOOKING_SUCCESS,
  DELETE_BOOKING_FAILED,
  DELETE_BOOKING_SUCCESS,
} from '../types/booking.types';

const initialState = {
  booking: [],
  pending: false,
  error: null,
};

/* istanbul ignore next */
export const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOOKING_PENDING:
      return { ...state, pending: true, booking: [], error: null };
    case CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        pending: false,
        booking: action.payload,
        error: null,
      };
    case CREATE_BOOKING_FAILED:
      return {
        ...state,
        pending: false,
        booking: [],
        error: action.payload,
      };
    case FETCH_ALL_BOOKINGS_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case FETCH_ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        pending: false,
        booking: action.payload,
        error: null,
      };
    case FETCH_ALL_BOOKINGS_FAILED:
      return {
        ...state,
        pending: false,
        booking: [],
        error: action.payload,
      };
    case FETCH_USER_BOOKINGS_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case FETCH_USER_BOOKINGS_SUCCESS:
      return {
        ...state,
        pending: false,
        booking: action.payload,
        error: null,
      };
    case FETCH_USER_BOOKINGS_FAILED:
      return {
        ...state,
        pending: false,
        booking: [],
        error: action.payload,
      };
    case UPDATE_BOOKING_PENDING:
      return { ...state, pending: true, booking: [], error: null };
    case UPDATE_BOOKING_SUCCESS:
      return {
        ...state,
        pending: false,
        booking: action.payload,
        error: null,
      };
    case UPDATE_BOOKING_FAILED:
      return {
        ...state,
        pending: false,
        booking: [],
        error: action.payload,
      };
    case DELETE_BOOKING_SUCCESS:
      return {
        ...state,
        pending: false,
        booking: action.payload,
        error: null,
      };
    case DELETE_BOOKING_FAILED:
      return { ...state, pending: false, error: action.payload };
    default:
      return state;
  }
};
