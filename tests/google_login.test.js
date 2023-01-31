import React from 'react';
import '@testing-library/jest-dom';

import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../src/redux/store';
import GoogleLogin from '../src/view/google_login';

describe('testing google login', () => {
  test('render all components', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[
            '?email=REQUESTER%40gmail.com&first_name=REQUESTER&last_name=2&profile_picture=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAATXAJwbW4OXW4ALj44H5hLfyJlt66tMhpwqB3M4HJov%3Ds96-c&role_id=4',
          ]}
        >
          <GoogleLogin />
        </MemoryRouter>
        ,
      </Provider>,
    );

    const paper = getByTestId('paper_1');
    const progress = getByTestId('circular_progress_1');

    expect(paper).toBeInTheDocument();
    expect(progress).toBeInTheDocument();
  });
});
