import { toast } from 'react-toastify';
import axios from '../../axios/axios.instance';
/* istanbul ignore next */
export const Rating = async (pathId, rate) => {
  try {
    const data = await axios.put(`/accommodations/${pathId}/rate`, { rate });
    toast.success(data.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
