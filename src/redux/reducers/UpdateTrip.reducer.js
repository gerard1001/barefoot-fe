import {
  UPDATETRIP,
  UPDATERIP_FAILED,
  UPDATETRIP_SUCCESS,
} from '../types/UpdateTrip.type';
/* istanbul ignore next */
const initialState = {
  date: {},
  error: {},
  loading: false,
};
/* istanbul ignore next */
export const UpdateTrip = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATETRIP:
      return { ...state, loading: true };
    case UPDATETRIP_SUCCESS:
      return { ...state, error: payload, loading: false };
    case UPDATERIP_FAILED:
      return { ...state, error: {}, date: payload, loading: false };
    default:
      return state;
  }
};
