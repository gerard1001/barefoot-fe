/* eslint-disable import/prefer-default-export */
import { ASSIGN_MANAGER } from '../types/user_role_settings.types';

const initialState = {
  message: '',
};

export const assignManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ASSIGN_MANAGER:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
};
