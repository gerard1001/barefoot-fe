import * as React from 'react';
import { screen, waitFor, fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import Signup from '../src/view/signup';
import '@testing-library/jest-dom';
import {
  SignupAction,
  signupFail,
  signupSucces,
} from '../src/redux/actions/signup.action';
import {
  SIGNUP_FAILED,
  SIGNUP_SUCCESSFUL,
} from '../src/redux/types/signup.types';

describe('SIGN UP TESTS', () => {
  it('should test user inputs', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Signup />
        </Router>
      </Provider>,
    );
    const fname = screen.getByLabelText('First Name');
    const lname = screen.getByLabelText('Last Name');
    const email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');

    fireEvent.change(fname, { target: { value: 'Eli' } });
    expect(fname).toHaveValue('Eli');
    fireEvent.change(lname, { target: { value: 'Hirwa' } });
    expect(lname).toHaveValue('Hirwa');
    fireEvent.change(email, { target: { value: 'hirwaeli@outlook.com' } });
    expect(email).toHaveValue('hirwaeli@outlook.com');
    fireEvent.change(password, { target: { value: 'Password111' } });
    expect(password).toHaveValue('Password111');
  });

  it('should show password inserted', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Signup />
        </Router>
      </Provider>,
    );
    const visibilityIcon = screen.getByTestId('visibility-button');
    const password = screen.getByLabelText('Password');

    fireEvent.change(password, { target: { value: 'Wordpass123' } });
    userEvent.click(visibilityIcon);
    await waitFor(() => {
      expect(password).toHaveAttribute('type', 'text');
    });
  });

  it('Should show validation errors', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Signup />
        </Router>
      </Provider>,
    );
    const fname = screen.getByLabelText('First Name');
    const lname = screen.getByLabelText('Last Name');
    const email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');
    const button = screen.getByRole('button', { name: 'Register' });

    fireEvent.change(fname, { target: { value: '' } });
    fireEvent.change(lname, { target: { value: '' } });
    fireEvent.change(email, { target: { value: 'hirwaelioutlook.com' } });
    fireEvent.change(password, { target: { value: '' } });

    userEvent.click(button);

    expect(await screen.findByText('First name is required')).toBeVisible();
    expect(await screen.findByText('Last name is required')).toBeVisible();
    expect(
      await screen.findByText('Please insert a valid email address'),
    ).toBeVisible();
    expect(await screen.findByText('Password is required')).toBeVisible();
  });

  it('should test redux action of signup success', () => {
    const value = {
      message: 'User registered successfully',
      token: 'asdfasdfasdfa',
    };
    const expectation = {
      type: SIGNUP_SUCCESSFUL,
      payload: value,
      loading: false,
    };
    expect(signupSucces(value)).toEqual(expectation);
  });

  it('should test redux action of error signing  up', () => {
    const value = {
      error: 'there was an error on the server',
    };

    const expectation = {
      type: SIGNUP_FAILED,
      payload: value,
      loading: false,
    };
    expect(signupFail(value)).toEqual(expectation);
  });
  it('should test SignupAction', async () => {
    const userData = {
      first_name: 'USER',
      last_name: 'USER',
      email: `USER${new Date().getMilliseconds()}@gmail.com`,
      password: 'USER123gmail',
      location_id: 1,
    };
    await store.dispatch(SignupAction(userData));
    await waitFor(async () => {
      await store.getState().signupReducer;
      store.subscribe(() => {
        // expect(store.getState().signupReducer.data.status).toEqual(201);
      });
    });
  });

  it('should test load button on submit', () => {
    render(
      <Provider store={store}>
        <Router>
          <Signup />
        </Router>
      </Provider>,
    );
    const fname = screen.getByLabelText('First Name');
    const lname = screen.getByLabelText('Last Name');
    const email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');
    const location = screen.getByTestId('location-input');
    const button = screen.getByRole('button', { name: 'Register' });

    fireEvent.change(fname, { target: { value: 'USER' } });
    fireEvent.change(lname, { target: { value: 'USER' } });
    fireEvent.change(email, {
      target: { value: `USER${new Date().getMilliseconds()}@gmail.com` },
    });
    fireEvent.change(password, { target: { value: 'USER1gmail' } });
    fireEvent.change(location, { target: { value: 'Kigali' } });

    userEvent.click(button);
    waitFor(() => {
      expect(button).toHaveValue('Login');
    });
  });
});
