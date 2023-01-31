import axios from '../../axios/axios.instance';
import {
  CREATETRIP,
  CREATETRIP_FAILED,
  CREATETRIP_SUCCESS,
} from '../types/CreateTrip.type';
/* istanbul ignore next */
export const CreateTrip = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATETRIP,
      payload: 'loading',
    });
    const info = await axios.post('/trips', data);
    dispatch({
      type: CREATETRIP_SUCCESS,
      payload: info.data,
    });
    return info;
  } catch (error) {
    dispatch({
      type: CREATETRIP_FAILED,
      payload: error.response.data,
    });
    throw error.response.data;
  }
};
