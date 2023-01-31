import mockAxios from 'axios';
import { sendEmail } from '../src/redux/actions/Forgot.action';
import {
  FORGOTPASSWORD,
  FORGOTPASSWORD_SUCCESS,
  FORGOTPASSWORD_FAILED,
} from '../src/redux/types/ForgotType';
import { forgot } from '../src/redux/reducers/ForgotReducer';

const initialState = {
  loading: false,
  error: {},
  data: {},
};
describe('FORGOT REDUCER', () => {
  it('Should reset pass', async () => {
    expect(forgot(undefined, {})).toEqual(initialState);
  });
});
