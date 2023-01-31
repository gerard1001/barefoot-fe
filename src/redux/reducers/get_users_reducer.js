import { GETUSERS, GET_DETAILED } from '../types/user_role_settings.types';

const initialState = {
  error: '',
  users: [],
  detailed: [],
};

export const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETUSERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_DETAILED:
      return {
        ...state,
        detailed: action.payload,
      };
    default:
      return state;
  }
};
