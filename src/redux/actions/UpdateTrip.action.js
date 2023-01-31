import { toast } from 'react-toastify';
import axios from '../../axios/axios.instance';
import {
  UPDATETRIP,
  UPDATETRIP_SUCCESS,
  UPDATERIP_FAILED,
} from '../types/UpdateTrip.type';
/* istanbul ignore next */
export const updateTrip = (data, id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATETRIP,
      payload: 'loading',
    });
    const updateInfo = await axios.put(`/trips/${id}`, data);
    dispatch({
      type: UPDATETRIP_SUCCESS,
      payload: { id, updateInfo },
    });
    return updateInfo;
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATERIP_FAILED,
      payload: error.response,
    });
    throw error.response.data;
  }
};
