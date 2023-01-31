import { VERIFY_EMAIL, ERROR_VERIFYING } from '../types/verification.types';

const initialState = {
  data: {},
  loading: true,
  error: {},
};

export const emailVerificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_EMAIL:
      /* istanbul ignore next */
      return { ...state, data: action.payload, loading: false };

    case ERROR_VERIFYING:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
