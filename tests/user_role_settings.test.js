import * as React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
// import store from '../src/redux/store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import {
  assign,
  assignRoleAction,
  getAll,
  getRolesAction,
} from '../src/redux/actions/user_role_settings.action';
import UserSettingsModal from '../src/components/user_role';
import store from '../src/redux/store';
import {
  ASSIGNROLE,
  ASSIGN_MANAGER,
  GETALLROLES,
  GETUSERS,
  GET_DETAILED,
} from '../src/redux/types/user_role_settings.types';
import { assignRoleReducer } from '../src/redux/reducers/user_role_settings.reducer';
import { getUserReducer } from '../src/redux/reducers/get_users_reducer';
import Assignmanager from '../src/components/assign_manager';
import { assignManagerReducer } from '../src/redux/reducers/assign_manager.reducer';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const mock = new MockAdapter(axios);
const stor = mockStore({});

describe('USER_ROLE_SETTINGS TESTS', () => {
  const history = createMemoryHistory();

  it('should test the display of role settings modal', () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <UserSettingsModal />
        </Router>
      </Provider>,
    );

    const Text = screen.getByText(/Assign role to users/i);
    expect(Text).toBeInTheDocument();
  });

  it('should test the display of assign manager page', () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Assignmanager />
        </Router>
      </Provider>,
    );

    const Text = screen.getByText(/Assign manager to user/i);
    expect(Text).toBeInTheDocument();
  });

  it('should test assign role action', async () => {
    const value = {
      email: 'REQUESTER@gmail.com',
      role: 'MANAGER',
    };
    const mes = 'hey there';
    const expectation = {
      message: mes,
    };

    store.dispatch(assignRoleAction(mes));
    await waitFor(() => {
      store.subscribe(() => {
        expect(store.getState().assignRoleReducer).toEqual(expectation);
      });
    });
  });

  it('should test assign role', async () => {
    store.dispatch(assign());
    await waitFor(() => {
      store.subscribe(() => {
        expect(assignRoleAction()).toBeCalled();
      });
    });
  });

  it('should test get all roles action', async () => {
    const role = [1, 2];
    const initialState = {
      error: '',
      roles: role,
    };

    stor.dispatch(getRolesAction(role));
    await waitFor(() => {
      stor.subscribe(() => {
        expect(stor.getState().getRoleReducer).toEqual(initialState);
      });
    });
  });

  it('should test get all roles', async () => {
    stor.dispatch(getAll());
    await waitFor(() => {
      stor.subscribe(() => {
        expect(getRolesAction()).toBeCalled();
      });
    });
  });

  it('should test user role settings reducer', async () => {
    const initialState = {
      message: '',
      error: '',
    };

    expect(assignRoleReducer(initialState, {})).toEqual(initialState);
  });

  it('should test get users reducer', async () => {
    const ac = {
      type: GETUSERS,
      payload: [1, 2],
    };

    const act = {
      type: GET_DETAILED,
      payload: [1, 2],
    };

    const initialState = {
      error: '',
      users: [],
      detailed: [],
    };

    const st = {
      error: '',
      users: [1, 2],
      detailed: [],
    };

    const sta = {
      error: '',
      users: [],
      detailed: [1, 2],
    };

    expect(getUserReducer(initialState, ac)).toEqual(st);
    expect(getUserReducer(initialState, act)).toEqual(sta);
  });

  it('should test assign manager reducer', async () => {
    const initialState = {
      message: '',
    };

    const stat = {
      message: 'hello',
    };

    expect(
      assignManagerReducer(initialState, {
        type: ASSIGN_MANAGER,
        payload: 'hello',
      }),
    ).toEqual(stat);
  });
});
