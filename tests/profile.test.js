import * as React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import { useForm } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import store from '../src/redux/store';
import ControlledInputs from '../src/components/controlledInput';
import {
  retrieveAction,
  updatingAction,
} from '../src/redux/actions/profile.action';
import Profile from '../src/view/profile';
import axiosInstance from '../src/axios/axios.instance';
import {
  RETRIEVE_PROFILE,
  UPDATE_PROFILE,
  RETRIEVING_ERROR,
  UPDATING_ERROR,
} from '../src/redux/types/profile.types';
import { profileReducer } from '../src/redux/reducers/profileReducer';
import ControlledDate from '../src/components/controlledDate';
import ControlledSwitch from '../src/components/controlledSwitch';
import ControlledFile from '../src/components/controlledFileInput';
import ControlledSelect from '../src/components/controlledSelect';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  loading: true,
  data: [],
  error: [],
  profile: '',
};

const Functional = () => {
  const { control } = useForm();
  return (
    <>
      <ControlledInputs name="firstName" control={control} label="First name" />
      <ControlledDate
        name="dateOfBirth"
        label="Date of birth"
        control={control}
      />
      <ControlledSwitch
        name="appNotification"
        label="App notification"
        control={control}
      />
      <ControlledFile name="profilePicture" control={control} />
      <ControlledSelect
        name="location"
        inputValue="Location"
        control={control}
        label="Location"
        menu={<MenuItem>Kigali</MenuItem>}
        currentLocation={
          <MenuItem key="x" value="Use my current location" fontSize="20">
            Use my current location
          </MenuItem>
        }
      />
    </>
  );
};

describe('profile page test', () => {
  let testStore;
  beforeEach(async () => {
    // await store.dispatch(retrieveAction())
    testStore = mockStore(initialState);
    // otherStore = mockStore(initialProfile);
    // import and pass your custom axios instance to this method
    moxios.install(axiosInstance);
  });

  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall(axiosInstance);
  });

  test('redux retrieve profile action', async () => {
    // Match against an exact URL value
    moxios.stubRequest('/users/getOne', {
      status: 200,
      response: {
        message: 'found all users',
        results: {
          user: {
            first_name: 'ishimwe',
            last_name: 'gabin',
            profile: {
              age: 20,
              bio: 'developer',
            },
          },
        },
      },
    });
    await testStore.dispatch(retrieveAction());
    const actualAction = testStore.getActions();
    expect(actualAction[0].type).toEqual('RETRIEVE_PROFILE');
  });

  test('it should throw an error in retrieving', async () => {
    moxios.stubRequest('/users/getOne', {
      status: 500,
      response: {
        error: 'there was an error on server',
      },
    });
    await testStore.dispatch(retrieveAction());
    const actualAction = testStore.getActions();
    expect(actualAction[0].type).toEqual('RETRIEVING_ERROR');
  });

  test('update action', async () => {
    moxios.stubRequest('/users/profile', {
      status: 200,
      response: {
        message: 'Profile updated',
        data: {
          user: {
            first_name: 'gabin',
            last_name: 'ishimwe',
            profile: {
              age: 19,
              date_of_birth: '02/02/2002',
              occupation: 'software engineer',
            },
          },
        },
      },
    });
    const formData = new FormData();
    formData.append('first_name', 'gabin');
    formData.append('last_name', 'ishimwe');
    formData.append('date_of_birth', '02/02/2002');
    formData.append('occupation', 'software engineer');
    await testStore.dispatch(updatingAction(formData));
    const actualAction = testStore.getActions();
    expect(actualAction[0].type).toEqual('UPDATE_PROFILE');
  });

  test('update error action', async () => {
    moxios.stubRequest('/users/profile', {
      status: 500,
      response: {
        error: {
          message: 'server error',
        },
      },
    });
    const formData = new FormData();
    formData.append('first_name', 'gabin');
    formData.append('last_name', 'ishimwe');
    formData.append('date_of_birth', '02/02/2002');
    formData.append('occupation', 'software engineer');
    await testStore.dispatch(updatingAction(formData));
    const actualAction = testStore.getActions();
    expect(actualAction[0].type).toEqual('UPDATING_ERROR');
  });

  test('retrieve profile reducer', async () => {
    const expectation = {
      data: {
        user: {
          first_name: 'ishimwe',
          last_name: 'gabin',
          profile: {
            age: 20,
            bio: 'developer',
          },
        },
      },
      error: [],
      profile: '',
      loading: false,
    };
    const action = {
      type: RETRIEVE_PROFILE,
      payload: {
        user: {
          first_name: 'ishimwe',
          last_name: 'gabin',
          profile: {
            age: 20,
            bio: 'developer',
          },
        },
      },
    };
    expect(profileReducer(initialState, action)).toEqual(expectation);
  });
  test('update profile reducer', async () => {
    const expectation = {
      data: [],
      error: [],
      profile: {
        user: {
          first_name: 'shema',
          last_name: 'alain',
          profile: {
            age: 21,
            bio: 'developer',
          },
        },
      },
      loading: true,
    };
    const action = {
      type: UPDATE_PROFILE,
      payload: {
        user: {
          first_name: 'shema',
          last_name: 'alain',
          profile: {
            age: 21,
            bio: 'developer',
          },
        },
      },
    };
    expect(profileReducer(initialState, action)).toEqual(expectation);
  });
  test('retrieve profile error reducer', async () => {
    const expectation = {
      data: [],
      error: {
        status: 500,
        error: {
          message: 'server not working',
        },
      },
      profile: '',
      loading: true,
    };
    const action = {
      type: RETRIEVING_ERROR,
      payload: {
        status: 500,
        error: {
          message: 'server not working',
        },
      },
    };
    expect(profileReducer(initialState, action)).toEqual(expectation);
  });
  test('retrieve profile error reducer', async () => {
    const expectation = {
      data: [],
      error: {
        status: 500,
        error: {
          message: 'server not working',
        },
      },
      profile: '',
      loading: true,
    };
    const action = {
      type: UPDATING_ERROR,
      payload: {
        status: 500,
        error: {
          message: 'server not working',
        },
      },
    };
    expect(profileReducer(initialState, action)).toEqual(expectation);
  });

  test('should check class', async () => {
    const form = render(
      <Provider store={store}>
        <Router>
          <ToastContainer />
          <Profile />
        </Router>
      </Provider>,
    );

    waitFor(() => expect(form).toHaveClass('MuiInputLabel-root'));
  });

  test('shoudl test react hook form inputs', async () => {
    render(<Functional />);
    const input = screen.getByLabelText('First name');
    const switchInput = screen.getByLabelText('App notification');
    const date = screen.getByLabelText('Date of birth');
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(input, { target: { value: 'ishimwe' } });
    expect(input).toHaveValue('ishimwe');
    expect(switchInput).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(fileInput).toBeInTheDocument();
  });
});
