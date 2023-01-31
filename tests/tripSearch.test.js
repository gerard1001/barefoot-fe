import React from 'react';
import '@testing-library/jest-dom';

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import moxios from 'moxios';

import TripSearch from '../src/components/tripSearch';
import store from '../src/redux/store';
import axiosInstance from '../src/axios/axios.instance';
import {
  locationRes,
  locationResError,
  locationResWrongMsg,
  tripRes,
  tripResError,
} from './dummyData/tripSearchDummyData';

describe('TRIPSEARCH TEST ', () => {
  beforeEach(async () => {
    moxios.install(axiosInstance);
  });
  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });

  test('should test all components in document', async () => {
    moxios.stubRequest('/locations', locationRes);

    await act(async () =>
      render(
        <Provider store={store}>
          <TripSearch page={1} rowsPerPage={5} />
        </Provider>,
      ),
    );

    const inputDepartDate = screen.getByTestId('tripDate');
    const inputReturnDate = screen.getByTestId('returnDate');
    const inputStatus = screen.getByTestId('selectTripStatus');
    const inputDestination = screen.getByTestId('selectDestination');

    expect(inputDepartDate).toBeInTheDocument();
    expect(inputReturnDate).toBeInTheDocument();
    expect(inputStatus).toBeInTheDocument();
    expect(inputDestination).toBeInTheDocument();
  });
  test('should test reducer if error in fetching locations', async () => {
    moxios.stubRequest('/locations', locationResWrongMsg);
    await act(async () =>
      render(
        <Provider store={store}>
          <TripSearch page={1} rowsPerPage={5} />
        </Provider>,
      ),
    );
  });
  test('should test reducer if no location message', async () => {
    moxios.stubRequest('/locations', locationResError);
    await act(async () =>
      render(
        <Provider store={store}>
          <TripSearch page={1} rowsPerPage={5} />
        </Provider>,
      ),
    );
  });
  test('should test submit of search data', async () => {
    moxios.stubRequest(/\/search\?.*/, tripRes);
    await act(async () =>
      render(
        <Provider store={store}>
          <TripSearch page={1} rowsPerPage={5} />
        </Provider>,
      ),
    );

    const searchButton = screen.getByTestId('searchButton');

    await userEvent.click(searchButton);

    await waitFor(() => {
      expect(searchButton).toBeInTheDocument();
    });
  });
  test('should test submit of search data failure res', async () => {
    moxios.stubRequest(/\/search\?.*/, tripResError);
    await act(async () =>
      render(
        <Provider store={store}>
          <TripSearch page={1} rowsPerPage={5} />
        </Provider>,
      ),
    );

    const searchButton = screen.getByTestId('searchButton');
    await userEvent.click(searchButton);
    await waitFor(() => {
      expect(searchButton).toBeInTheDocument();
    });
  });
});
