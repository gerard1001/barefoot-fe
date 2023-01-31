import { waitFor } from '@testing-library/react';
import store from '../src/redux/store';
import '@testing-library/jest-dom';
import {
  errorGettingLocs,
  getAllLocations,
} from '../src/redux/actions/location.action';
import { ERR_GETTING_LOCATIONS } from '../src/redux/types/location.types';
// import { getUserLocation } from '../src/helpers/signup.helper';

// jest.useFakeTimers();

describe('LOCATION TESTS', () => {
  it('should test get all locations', async () => {
    await store.dispatch(getAllLocations());
    await waitFor(async () => {
      await store.getState().locationReducer;
      store.subscribe(() => {
        expect(store.getState().locationReducer.data.message).toEqual(
          'successfully found locations',
        );
      });
    });
  });

  it('should test redux action of getAllLocations', () => {
    const value = {
      message: 'logged in successfully',
      status: 404,
    };
    const expectation = {
      type: ERR_GETTING_LOCATIONS,
      payload: value,
      loading: false,
    };
    expect(errorGettingLocs(value)).toEqual(expectation);
  });
});
