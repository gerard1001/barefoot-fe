import * as React from 'react';
import {
  screen,
  waitFor,
  fireEvent,
  act,
  render,
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../src/redux/store';
import '@testing-library/jest-dom';
import {
  emailVerificationAction,
  errorVerifyingEmail,
  verifyEmail,
} from '../src/redux/actions/verification.action';
import {
  ERROR_VERIFYING,
  VERIFY_EMAIL,
} from '../src/redux/types/verification.types';

describe('EMAIL VERIFICATION TESTS', () => {
  it('should test redux action of susscess verification', () => {
    const res = {
      message: 'Verified successfully',
      status: 201,
    };

    const expectation = {
      type: VERIFY_EMAIL,
      payload: res,
      loading: false,
    };

    expect(verifyEmail(res)).toEqual(expectation);
  });

  it('should test redux action of verification error', () => {
    const value = {
      error: 'there was an error on the server',
    };

    const expectation = {
      type: ERROR_VERIFYING,
      payload: value,
      loading: false,
    };

    expect(errorVerifyingEmail(value)).toEqual(expectation);
  });

  it('should test email verification fail', async () => {
    await store.dispatch(emailVerificationAction('rlijifjifjfijifj'));
    await waitFor(async () => {
      store.subscribe(() => {
        expect(
          store.getState().emailVerificationReducer.error.data.status,
        ).toEqual(500);
      });
    });
  });
});
// describe('EMAIL VERIFICATION SUCCESS', () => {
//   it('should successfully verify email', async () => {
//     const token =
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY1MjY5Nzk4NywiZXhwIjoxNjUyNzg0Mzg3fQ.XlfpnHOQU1JZOfLDBWbyq6qqmhJDjwLOJ6bR2iPjB-8';
//     await store.dispatch(emailVerificationAction(token));
//     await waitFor(async () => {
//       store.subscribe(() => {
//         expect(store.getState().emailVerificationReducer.data.status).toEqual(
//           200,
//         );
//       });
//     });
//   });
// });
