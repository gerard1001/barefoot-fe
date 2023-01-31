import * as React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import store from '../src/redux/store';
import axiosInstance from '../src/axios/axios.instance';
import { userReducer } from '../src/redux/reducers/userReducer';
import { logoutUser } from '../src/redux/actions/logout.action';

const initialState = {
  data: [],
  loading: true,
  isLogged: false,
  error: '',
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('user logout', () => {
  let testStore;
  beforeEach(() => {
    testStore = mockStore(initialState);
    // import and pass your custom axios instance to this method
    moxios.install(axiosInstance);
  });
  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall(axiosInstance);
  });
  test('redux logout action', async () => {
    moxios.stubRequest('/users/logout', {
      status: 200,
      response: {
        message: 'user logged out',
      },
    });

    await testStore.dispatch(logoutUser());
    const action = testStore.getActions();
    expect(action[0].type).toBe('LOGOUT_USER');
  });

  test('redux logout error', async () => {
    moxios.stubRequest('/users/logout', {
      status: 500,
      response: {
        error: 'error occuring while logging out',
      },
    });
    await testStore.dispatch(logoutUser());
    const action = testStore.getActions();
    expect(action[0].type).toBe('ERROR_LOGOUT');
  });
});
