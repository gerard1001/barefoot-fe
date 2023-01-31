/* eslint-disable import/prefer-default-export */
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import rootReducer from '../src/redux/reducers/rootReducer';

export const renderWithProviders = (ui, { reduxState } = {}) => {
  const store = createStore(
    rootReducer,
    reduxState || {},
    applyMiddleware(thunk),
  );
  return render(<Provider store={store}>{ui}</Provider>);
};
