/* eslint-disable prettier/prettier */
/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
import {
  ERROR_LOGIN,
  LOGIN_USER,
  GET_LOGGEDIN_USER_PROFILE_ERROR,
  GET_LOGGEDIN_USER_PROFILE_PENDING,
  GET_LOGGEDIN_USER_PROFILE_SUCCESS,
} from '../types/login.types';
import { ERROR_LOGOUT, LOGOUT_USER } from '../types/logout.types';
import { USER_LEAVING } from '../types/chat.types';

const initialState = {
  data: [],
  loading: true,
  isLogged: false,
  error: '',
  chatDisconnect: [],
};
/* istanbul ignore next */
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, data: action.payload, loading: false, isLogged: true };

    case ERROR_LOGIN:
      return {
        ...state,
        error: action.payload,
        isLogged: false,
        loading: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLogged: false,
        loading: true,
        data: action.payload,
        error: '',
      };
    case ERROR_LOGOUT:
      return {
        ...state,
        isLogged: true,
        loading: true,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
/* istanbul ignore next */
export const loggedInUserReducer = (state = initialState, action) => {
  /* istanbul ignore next */
  switch (action.type) {
    case GET_LOGGEDIN_USER_PROFILE_PENDING:
      return { ...state, data: [], loading: true };
    case GET_LOGGEDIN_USER_PROFILE_SUCCESS:
      return { ...state, data: action.payload, loading: false, isLogged: true };
    case GET_LOGGEDIN_USER_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLogged: false,
        loading: false,
      };
    default:
      return state;
  }
};

/* istanbul ignore next */
export const chatLeaving = (state = initialState, action) => {
  switch (action.type) {
    case USER_LEAVING:
      return { ...state, chatDisconnect: action.payload };

    default:
      return state;
  }
};
