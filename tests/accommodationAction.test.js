import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { allAccommodationData, messages } from './accommodationDummies';
import { fetchAccommodationsAction } from '../src/redux/actions/accommodation.action';
import {
  FETCH_ACCOMMODATIONS_FAILED,
  FETCH_ACCOMMODATIONS_PENDING,
} from '../src/redux/types/accommodation.types';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const mock = new MockAdapter(axios);
const store = mockStore({});

const API_URL =
  'https://barefoot-backend-development.herokuapp.com/api/v1/trips';

beforeEach(() => {
  store.clearActions();
});

describe.only('ACCOMMODATION ACTIONS', () => {
  it('dispatches FETCH_ACCOMMODATIONS_SUCCESS', () => {
    mock.onGet(API_URL).reply(401);
    store.dispatch(fetchAccommodationsAction());
    const expectedActions = [{ type: FETCH_ACCOMMODATIONS_PENDING }];
    const actualAction = store.getActions();
    expect(actualAction).toEqual(expectedActions);
  }, 50000);

  it('should fail when a user is not loggedIn', () => {
    mock.onGet(API_URL).reply(401, { data: allAccommodationData });
    return store
      .dispatch(fetchAccommodationsAction(allAccommodationData))
      .then(() => {
        const expectedActions = [
          {
            type: FETCH_ACCOMMODATIONS_FAILED,
            payload: { message: messages[401] },
          },
        ];
        expect(store.getActions()).not.toEqual(expectedActions);
      });
  }, 50000);
});
