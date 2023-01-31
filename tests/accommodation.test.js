import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { useForm } from 'react-hook-form';
import ControlledInputs from '../src/components/controlledInput';
import ControlledMultipleFileInput from '../src/components/controlledMultipleFileInput';
import { FETCH_ACCOMMODATIONS_SUCCESS } from '../src/redux/types/accommodation.types';
import { fetchAllAccommodations } from '../src/redux/reducers/accommodation.reducer';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  accommodations: [],
  allAccommodations: [],
  error: null,
  pending: false,
};
const Functional = () => {
  const { control } = useForm();
  return (
    <>
      <ControlledInputs name="name" control={control} label="Name" />
      <ControlledInputs
        name="description"
        control={control}
        label="Description"
      />
      <ControlledInputs name="services" control={control} label="Services" />
      <ControlledInputs name="amenities" control={control} label="Amenities" />
      <ControlledMultipleFileInput name="images" control={control} />
    </>
  );
};
describe('ACCOMMODATION TESTS', () => {
  it('should test accommodation form inputs', async () => {
    render(<Functional />);
    const nameInput = screen.getByLabelText('Name');
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(nameInput, { target: { value: 'Marriot' } });
    expect(nameInput).toHaveValue('Marriot');
    expect(fileInput).toBeInTheDocument();
  });
  describe('TEST ACCOMMODATION REDUCERS', () => {
    it('should return initial state', async () => {
      const reducer = fetchAllAccommodations(undefined, {});
      expect(reducer).toEqual(initialState);
    });
    it('should return accommodations when successful', () => {
      const action = {
        type: FETCH_ACCOMMODATIONS_SUCCESS,
      };
      const reducer = fetchAllAccommodations(initialState, action);
      expect(reducer).toEqual({
        ...initialState,
        accommodations: action.payload,
        allAccommodations: action.payload,
        pending: false,
      });
    });
  });
});
