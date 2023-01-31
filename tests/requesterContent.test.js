import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../src/redux/store';
import RequesterContent from '../src/view/requesterContent';

jest.mock('uuid', () => {
  let value = 0;
  return () => value++;
});
describe('REQUESTER MODALS TEST', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <RequesterContent />
        </Router>
      </Provider>,
    );
  });
  it('should not render modal by default', () => {
    const addAccomodation = screen.queryByRole('button', {
      name: '+ Add Accomodation',
    });
    expect(addAccomodation).not.toBeInTheDocument();
  });

  it('should open modal on create trip button click', () => {
    const createTripButton = screen.getByRole('button', {
      name: '+ CREATE TRIP',
    });
    fireEvent.click(createTripButton);
    const addAccomodationButton = screen.queryByRole('button', {
      name: '+ Add Accomodation',
    });
    const modalCloseIcon = screen.getByTestId('close-icon');
    expect(modalCloseIcon).toBeInTheDocument();
    expect(addAccomodationButton).toBeInTheDocument();
  });
  it('should close modal at close icon click', () => {
    const createTripButton = screen.getByRole('button', {
      name: '+ CREATE TRIP',
    });
    fireEvent.click(createTripButton);
    const closeIcon = screen.getByTestId('close-icon');
    fireEvent.click(closeIcon);
    expect(closeIcon).not.toBeInTheDocument();
  });
});
