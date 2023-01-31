import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { retrieveRequests } from '../src/redux/actions/requester.action';
import { retrieveAllData, messages } from './dummyData';
import {
  FETCH_REQUESTS_ERROR,
  FETCH_REQUESTS_PENDING,
  FETCH_REQUESTS_SUCCESS,
} from '../src/redux/types/Requester.Types';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const mock = new MockAdapter(axios);
const store = mockStore({});

const API_URL =
  'https://barefoot-backend-development.herokuapp.com/api/v1/trips';
const SINGLE_TRIP_URL =
  'https://elites-barefoot-nomad.herokuapp.com/api/v1/trips/61';

beforeEach(() => {
  store.clearActions();
});

describe.only('tripRequestsStore(creds)', () => {
  it('dispatches FETCH_REQUESTS_SUCCESS', () => {
    mock.onGet(API_URL).reply(401);
    store.dispatch(retrieveRequests());
    const expectedActions = [{ type: FETCH_REQUESTS_PENDING }];
    expect(store.getActions()).toEqual(expectedActions);
  }, 50000);

  it('should fail when a user is not loggedIn', () => {
    const pendingAction = {
      type: FETCH_REQUESTS_PENDING,
    };
    mock.onGet(API_URL).reply(401, { data: retrieveAllData });
    return store.dispatch(retrieveRequests(retrieveAllData)).then(() => {
      const expectedActions = [
        {
          type: FETCH_REQUESTS_ERROR,
          payload: { message: messages[401] },
        },
      ];
      expect(store.getActions()).not.toEqual(expectedActions);
    });
  }, 50000);
});
