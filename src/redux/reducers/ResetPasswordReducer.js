import {
  RESETPASSWORD,
  RESETPASSWORD_FAILED,
  RESETPASSWORD_SUCCESS,
} from '../types/ResetPasswordType';

const initialState = {
  loading: false,
  error: {},
  data: {},
};

export const Reset = (state = initialState, { type, payload }) => {
  switch (type) {
    case RESETPASSWORD: {
      return { ...state, loading: true };
    }
    /* istanbul ignore next */
    case RESETPASSWORD_FAILED: {
      return { ...state, error: payload, loading: false };
    }
    case RESETPASSWORD_SUCCESS: {
      /* istanbul ignore next */
      return { ...state, data: payload, loading: false };
    }
    default: {
      return state;
    }
  }
};
