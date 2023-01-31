/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider, useSelector } from 'react-redux';
import store from '../src/redux/store';
import Login from '../src/view/login';
import {
  errorLogin,
  userLogin,
  loginAction
} from '../src/redux/actions/login.action';
import { ERROR_LOGIN, LOGIN_USER } from '../src/redux/types/login.types';
import { userReducer } from '../src/redux/reducers/userReducer';
import { LOGOUT_USER } from '../src/redux/types/logout.types';

describe('testing login', () => {
  test('user email input', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');

    fireEvent.change(email, { target: { value: 'ishimwe@gmail.com' } });
    fireEvent.change(password, { target: { value: 'wordpass123' } });
    expect(email).toHaveValue('ishimwe@gmail.com');
    expect(password).toHaveValue('wordpass123');
  });

  test('show password', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    const visibilityIcon = screen.getByTestId('visibility-button');
    const password = screen.getByLabelText('Password');

    fireEvent.change(password, { target: { value: 'Wordpass123' } });
    userEvent.click(visibilityIcon);
    await waitFor(() => {
      expect(password).toHaveAttribute('type', 'text');
    });
  });

  test('show validation', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    const email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');
    const button = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(email, { target: { value: 'ishimwegmail.com' } });
    fireEvent.change(password, { target: { value: 'wordpass' } });

    userEvent.click(button);

    expect(await screen.findByText('Invalid email')).toBeVisible();
    expect(
      await screen.findByText('Must have at least one digit and capital letter')
    ).toBeVisible();
  });

  test('login in successful', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');
    const button = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(email, { target: { value: 'REQUESTER@gmail.com' } });
    fireEvent.change(password, { target: { value: 'REQUESTER2gmail' } });
    userEvent.click(button);
    waitFor(async () => {
      expect(screen.getByText('Invalid email')).not.toBeInTheDocument();
      expect(screen.getByText('Invalid password')).not.toBeInTheDocument();
    });
  });

  it('should load button on submit', () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');
    const button = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(email, { target: { value: 'REQUESTER@gmail.com' } });
    fireEvent.change(password, { target: { value: 'REQUESTER2gmail' } });
    userEvent.click(button);
    waitFor(() => {
      expect(button).toHaveValue('Login');
    });
  });

  it('should test redux action of userLogin', () => {
    const value = {
      message: 'logged in successfully',
      token: 'asdfasdfasdfa'
    };

    const expectation = {
      type: LOGIN_USER,
      payload: value,
      isLogged: true,
      loading: false
    };

    expect(userLogin(value)).toEqual(expectation);
  });

  it('should test redux action of errorLogin', () => {
    const value = {
      error: 'there was an error on the server'
    };

    const expectation = {
      type: ERROR_LOGIN,
      payload: value,
      isLogged: false,
      loading: false
    };

    expect(errorLogin(value)).toEqual(expectation);
  });

  it('should test loginAction', async () => {
    const userData = {
      email: 'REQUESTER@gmail',
      password: 'REQUESTER2gmail'
    };
    const expection = {
      type: LOGIN_USER,
      payload: userData,
      isLogged: true,
      loading: false
    };

    store.dispatch(loginAction(userData));
    await waitFor(() => {
      store.subscribe(() => {
        expect(store.getState().userReducer).toEqual(expection);
      });
    });
  });

  it('should test reducers', () => {
    const userData = {
      email: 'REQUESTER@gmail',
      password: 'REQUESTER2gmail'
    };
    const expection = {
      type: LOGIN_USER,
      payload: userData,
      isLogged: true,
      loading: false,
      error: ''
    };
    const initialState = {
      data: [],
      loading: true,
      isLogged: false,
      error: ''
    };

    expect(
      userReducer(initialState, {
        type: LOGIN_USER,
        payload: userData
      })
    ).toEqual({
      data: userData,
      loading: false,
      isLogged: true,
      error: ''
    });

    expect(
      userReducer(initialState, {
        type: ERROR_LOGIN,
        payload: userData
      })
    ).toEqual({
      data: [],
      loading: false,
      isLogged: false,
      error: userData
    });
  });

  it('should test user reducer', async () => {
    const initialState = {
      data: [],
      loading: true,
      isLogged: false,
      error: '',
    };

    const actio={
      type:LOGOUT_USER,
      payload:'message'
    }

    
     const st= {
        isLogged: false,
        loading: true,
        data: 'message',
        error: '',
      };

    expect(userReducer(initialState,actio)).toEqual(st);
  });
});
