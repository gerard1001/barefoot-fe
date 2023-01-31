import { ASSIGNROLE, ASSIGNROLEERROR } from '../types/user_role_settings.types';

const initialState = {
  message: '',
  error: '',
};
/* istanbul ignore next */
export const assignRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ASSIGNROLE:
      return {
        ...state,
        message: action.payload,
      };
    case ASSIGNROLEERROR:
      /* istanbul ignore next */
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
