import {
  FORGOTPASSWORD,
  FORGOTPASSWORD_FAILED,
  FORGOTPASSWORD_SUCCESS,
} from '../types/ForgotType';

const initialState = {
  loading: false,
  error: {},
  data: {},
};

/* istanbul ignore next */
// eslint-disable-next-line import/prefer-default-export
export const forgot = (state = initialState, { type, payload }) => {
  switch (type) {
    case FORGOTPASSWORD:
      return { ...state, loading: true };
    case FORGOTPASSWORD_FAILED:
      return { ...state, error: payload, loading: false };
    case FORGOTPASSWORD_SUCCESS:
      return { ...state, error: {}, data: payload, loading: false };
    default:
      return state;
  }
};
