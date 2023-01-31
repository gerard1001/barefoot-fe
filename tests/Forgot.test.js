import * as React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider, useSelector } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../src/redux/store';
import Forgot from '../src/view/Forgot';
import { sendEmail } from '../src/redux/actions/Forgot.action';

describe('FORGOT PASSWORD', () => {
  it('should renders forgot component', () => {
    const element = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Forgot />
          </Router>
        </Provider>,
      )
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('should testing invalid empty Email', () => {
    render(
      <Provider store={store}>
        <Router>
          <Forgot />
        </Router>
      </Provider>,
    );
    const email = screen.getByLabelText('Email');
    fireEvent.change(email, { target: { value: ' ' } });
    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);
    const validation = screen.findByText('Email required');
  });
  it('should testing valid Email', () => {
    render(
      <Provider store={store}>
        <Router>
          <Forgot />
        </Router>
      </Provider>,
    );
    const email = screen.getByLabelText('Email');
    fireEvent.change(email, { target: { value: 'REQUESTER@gmail.com' } });
    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);
    const validation = screen.findByText(
      'Password reset link has been sent to your email',
    );
    expect(sendEmail(email));
  });
});
