import { requestsReducer } from '../src/redux/reducers/requesterDashboard';
import { FETCH_NOTIFICATIONS } from '../src/redux/types/Requester.Types';

describe('Trip requests Reducer', () => {
  const state = {
    requests: [],
    error: null,
    pending: false,
    loading: false,
    message: '',
  };
  it('should return the initial state', () => {
    const reducer = requestsReducer(undefined, {});
    expect(reducer).toEqual(state);
  });
  it('should be pending when trip requests are retrieved', () => {
    const action = {
      type: `${FETCH_NOTIFICATIONS}_PENDING`,
    };
    const reducer = requestsReducer(state, action);
    expect(reducer).toEqual({
      ...state,
      pending: false,
    });
  }, 5000);
  it('should return success when trip requests are retrieved', () => {
    const action = {
      type: `${FETCH_NOTIFICATIONS}_SUCCESS`,
    };
    const reducer = requestsReducer(state, action);
    expect(reducer).not.toEqual({
      ...state,
      notifications: {
        ...state.notifications,
        results: state.requests.results?.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      },
      pending: false,
    });
  }, 5000);
});
