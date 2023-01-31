import { requestsReducer } from '../src/redux/reducers/requesterDashboard';
import {
  FETCH_REQUESTS_ERROR,
  FETCH_REQUESTS_PENDING,
  FETCH_REQUESTS_SUCCESS,
} from '../src/redux/types/Requester.Types';

describe('Trip requests Reducer', () => {
  const initialState = {
    requests: [],
    pending: false,
    error: null,
    message: '',
    loading: false,
  };
  it('should return the initial state', () => {
    const reducer = requestsReducer(undefined, {});
    expect(reducer).toEqual(initialState);
  });
  it('should be pending when trip requests are retrieved', () => {
    const action = {
      type: FETCH_REQUESTS_PENDING,
    };
    const reducer = requestsReducer(initialState, action);
    expect(reducer).toEqual({
      ...initialState,
      pending: true,
    });
  }, 5000);
  it('should return success when trip requests are retrieved', () => {
    const action = {
      type: FETCH_REQUESTS_SUCCESS,
    };
    const reducer = requestsReducer(initialState, action);
    expect(reducer).toEqual({
      ...initialState,
      requests: action.payload,
      pending: false,
    });
  }, 5000);
});
