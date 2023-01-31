import * as React from 'react';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ResetPassword from '../src/view/ResetPassword';
import store from '../src/redux/store';
import { Reset } from '../src/redux/actions/ResetPassword.action';

describe('RESET PASSWORD TEST', () => {
  it('should renders Reset Password component', () => {
    const element = renderer
      .create(
        <Provider store={store}>
          <Router>
            <ResetPassword />
          </Router>
        </Provider>,
      )
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('should testing invalid empty password', () => {
    render(
      <Provider store={store}>
        <Router>
          <ResetPassword />
        </Router>
      </Provider>,
    );
    const email = screen.getByLabelText('password');
    fireEvent.change(email, { target: { value: '' } });
    const button = screen.getByRole('button', { name: 'Change Password' });
    fireEvent.click(button);
  });
  it('should testing valid password and comfirm password', () => {
    render(
      <Provider store={store}>
        <Router>
          <ResetPassword />
        </Router>
      </Provider>,
    );
    const password = screen.getByLabelText('password');
    fireEvent.change(password, { target: { value: 'Password123' } });
    const Confirmpassword = screen.getByLabelText('Confirm password');
    fireEvent.change(Confirmpassword, { target: { value: 'Password123' } });
    const button = screen.getByRole('button', { name: 'Change Password' });
    fireEvent.click(button);
    expect(Reset(password));
  });
  it('should testing Password and confirm password does not match', async () => {
    render(
      <Provider store={store}>
        <Router>
          <ResetPassword />
        </Router>
      </Provider>,
    );
    const password = screen.getByLabelText('password');
    fireEvent.change(password, { target: { value: 'Password12355' } });
    const Confirmpassword = screen.getByLabelText('Confirm password');
    fireEvent.change(Confirmpassword, { target: { value: 'Password123' } });
    const button = screen.getByRole('button', { name: 'Change Password' });
    fireEvent.click(button);
    waitFor(async () => {
      expect(
        'Password and confirm password does not match',
      ).toBeInTheDocument();
    });
  });

  test('show password', async () => {
    render(
      <Provider store={store}>
        <Router>
          <ResetPassword />
        </Router>
      </Provider>,
    );
    const visibilityIcon = screen.getByTestId('visibility-button');
    const password = screen.getByLabelText('password');
    fireEvent.change(password, { target: { value: 'Wordpass123' } });
    userEvent.click(visibilityIcon);
    await waitFor(() => {
      expect(password).toHaveAttribute('type', 'text');
    });
  });

  test.skip('show comfirm password', async () => {
    render(
      <Provider store={store}>
        <Router>
          <ResetPassword />
        </Router>
      </Provider>,
    );
    const visibilityIcon = screen.getByTestId('visibility-button1');
    const password = screen.getByLabelText('Confirm password');
    fireEvent.change(password, { target: { value: 'Wordpass123' } });
    userEvent.click(visibilityIcon);
    await waitFor(() => {
      expect(password).toHaveAttribute('type', 'text');
    });
  });
});
