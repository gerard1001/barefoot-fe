/* eslint-disable import/no-duplicates */
/* eslint-disable no-restricted-globals */
import * as React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Welcome from '../src/components/landing/welcome';
import Header from '../src/components/landing/header';
import About from '../src/components/landing/about';
import Service from '../src/components/landing/service';
import FooterImage from '../src/components/landing/footerimages.component';
import {
  GETLOCATIONS,
  FETCHACCOMMODATIONS,
} from '../src/redux/actionTypes/actionTypes';
import { getLocation } from '../src/redux/actions/location.action';
import { getAccommodations } from '../src/redux/actions/accommodation.action';
import store from '../src/redux/store';
import accommodationReducer from '../src/redux/reducers/accommodation.reducer';
import LandingFooter from '../src/components/landing/footer';

describe('LANDING-PAGE TESTS', () => {
  const history = createMemoryHistory();
  it('should test the display of welcome text', () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Welcome />
        </Router>
      </Provider>,
    );

    const welcomeText = screen.getByText(/Life long memories just/i);
    expect(welcomeText).toBeInTheDocument();
  });

  it('should test the display of header', () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </Provider>,
    );

    const welcomeText = screen.getByText(/Home/i);
    expect(welcomeText).toBeInTheDocument();
  });

  it('should test the display of about section', () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <About />
        </Router>
      </Provider>,
    );

    const welcomeText = screen.getByText(/About/i);
    expect(welcomeText).toBeInTheDocument();
  });

  it('should test the display of services section', () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Service />
        </Router>
      </Provider>,
    );

    const welcomeText = screen.getByText(/Our popular services/i);
    expect(welcomeText).toBeInTheDocument();
  });

  it('should test the display of footer section', () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <LandingFooter />
        </Router>
      </Provider>,
    );

    const welcomeText = screen.getByText(/Contact/i);
    expect(welcomeText).toBeInTheDocument();
  });

  it('should test the display of footer images section', () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <FooterImage />
        </Router>
      </Provider>,
    );

    const images = screen.getByTestId('image-list');
    expect(images).toBeInTheDocument();
  });

  it('should test location action', async () => {
    const location = [];

    const expection = {
      locations: location,
    };

    store.dispatch(getLocation(location));
    await waitFor(() => {
      store.subscribe(() => {
        expect(store.getState().landingReducer).toEqual(expection);
      });
    });
  });

  it('should test accommodation reducer', async () => {
    const initialState = {
      accommodations: [],
    };
    const accommodation = [];

    const expection = {
      type: FETCHACCOMMODATIONS,
      payload: accommodation,
    };

    expect(
      accommodationReducer(initialState, {
        type: FETCHACCOMMODATIONS,
        payload: accommodation,
      }),
    ).toEqual({
      accommodations: accommodation,
    });
  });

  it('should test accommodation action', async () => {
    const value = [];
    const expectation = {
      accommodations: value,
    };

    store.dispatch(getAccommodations(value));
    await waitFor(() => {
      store.subscribe(() => {
        expect(store.getState().accommodationReducer).toEqual(expectation);
      });
    });
  });
});
