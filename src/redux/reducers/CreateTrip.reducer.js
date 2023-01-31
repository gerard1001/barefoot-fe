import {
  CREATETRIP,
  CREATETRIP_FAILED,
  CREATETRIP_SUCCESS,
} from '../types/CreateTrip.type';
/* istanbul ignore next */
const initialState = {
  loading: false,
  data: {},
  error: {},
};
/* istanbul ignore next */
export const CreateTripReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATETRIP:
      return { ...state, loading: true };
    case CREATETRIP_SUCCESS:
      return { ...state, error: payload, loading: false };
    case CREATETRIP_FAILED:
      return { ...state, error: {}, data: payload, loading: false };
    default:
      return state;
  }
};
