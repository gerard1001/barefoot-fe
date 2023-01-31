/* eslint-disable import/no-named-as-default-member */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import DeleteIcon from '@mui/icons-material/Delete';
import { BrowserRouter as Router } from 'react-router-dom';
import RequesterTable from '../src/view/requester-table';
import { renderWithProviders } from './redux-config';
import store from '../src/redux/store';
import { FETCH_REQUESTS_ERROR } from '../src/redux/types/Requester.Types';
import { retrieveRequests } from '../src/redux/actions/requester.action';
import { requestsReducer } from '../src/redux/reducers/requesterDashboard';
import RequesterContent from '../src/view/requesterContent';

jest.mock('uuid', () => {
  let value = 0;
  return () => value++;
});
test('Render all requests', async () => {
  await renderWithProviders(
    <MemoryRouter>
      <RequesterContent />
    </MemoryRouter>,
  );

  expect(screen.findByText('trips'));
});

test('test pagination page', () => {
  const table = renderWithProviders(
    <MemoryRouter>
      <RequesterContent />
    </MemoryRouter>,
  );
  waitFor(() => expect(table).toHaveClass('MuiTablePagination-toolbar'));
});

test('test table cells', () => {
  const table = renderWithProviders(
    <MemoryRouter>
      <RequesterContent />
    </MemoryRouter>,
  );
  waitFor(() => expect(table).toHaveClass('MuiTableCell-root'));
});

it('should test redicer failing', () => {
  const initialState = {
    requests: [],
    pending: false,
    error: null,
  };
  const error = {
    message: 'you are not allowed to perfor this action',
  };
  waitFor(() =>
    expect(
      requestsReducer(initialState, {
        type: FETCH_REQUESTS_ERROR,
        requests: [],
        pending: false,
        error: error.message,
      }),
    ).toEqual({
      error: error.message,
      pending: false,
      requests: [],
    }),
  );
});
