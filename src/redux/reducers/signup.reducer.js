import { SIGNUP_FAILED, SIGNUP_SUCCESSFUL } from '../types/signup.types';

const initialState = {
  loading: false,
  error: {},
  data: {},
};

export const signupReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    /* istanbul ignore next */
    case SIGNUP_FAILED:
      /* istanbul ignore next */
      return { ...state, error: payload, loading: false };
    /* istanbul ignore next */
    case SIGNUP_SUCCESSFUL:
      return { ...state, error: {}, data: payload, loading: false };
    default:
      return state;
  }
};
