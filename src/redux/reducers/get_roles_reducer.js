import {
  ASSIGNROLE,
  ASSIGNROLEERROR,
  GETALLROLES,
} from '../types/user_role_settings.types';

const initialState = {
  error: '',
  roles: [],
};

export const getRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLROLES:
      /* istanbul ignore next */
      return {
        ...state,
        roles: action.payload,
      };
    default:
      return state;
  }
};
