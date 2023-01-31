import {
  CREATE_TRIP_COMMENT,
  EDIT_TRIP_COMMENT,
  ERROR_TRIP_COMMENT,
  LOADING_CREATE_TRIP_COMMENT,
  LOADING_DELETE_TRIP_COMMENT,
  LOADING_EDIT_TRIP_COMMENT,
  LOADING_MORE_TRIP_COMMENT,
  LOADING_TRIP_COMMENT,
  RETRIEVED_MORE_TRIP_COMMENT,
  RETRIEVED_TRIP_COMMENT,
} from '../types/tripComment.types';
import AxiosInstance from '../../axios/axios.instance';

export const retievedTripComment = (payload) => ({
  type: RETRIEVED_TRIP_COMMENT,
  payload,
});
export const retievedTripMoreComment = (payload) => ({
  type: RETRIEVED_MORE_TRIP_COMMENT,
  payload,
});
export const editedTripComment = (payload) => ({
  type: EDIT_TRIP_COMMENT,
  payload,
});
export const createdTripComment = (payload) => ({
  type: CREATE_TRIP_COMMENT,
  payload,
});
export const loadingTripComment = () => ({
  type: LOADING_TRIP_COMMENT,
});
export const loadingMoreTripComment = () => ({
  type: LOADING_MORE_TRIP_COMMENT,
});
export const loadingDeleteTripComment = () => ({
  type: LOADING_DELETE_TRIP_COMMENT,
});
export const loadingEditTripComment = () => ({
  type: LOADING_EDIT_TRIP_COMMENT,
});
export const loadingCreateTripComment = () => ({
  type: LOADING_CREATE_TRIP_COMMENT,
});
export const errorTripComment = (payload) => ({
  type: ERROR_TRIP_COMMENT,
  payload,
});

export const getTripCommentsAction =
  (page = 1, limit = 10, tripId) =>
  async (dispatch) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);

    dispatch(loadingTripComment());
    await AxiosInstance.get(`/trips/${tripId}/comment?${params}`)
      .then((res) => {
        dispatch(retievedTripComment(res.data));
      })
      .catch((error) => {
        dispatch(errorTripComment(error.response.data));
      });
  };

export const getTripMoreCommentsAction =
  (page = 2, limit = 10, tripId) =>
  async (dispatch) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);

    dispatch(loadingMoreTripComment());
    await AxiosInstance.get(`/trips/${tripId}/comment?${params}`)
      .then(async (res) => {
        dispatch(retievedTripMoreComment(res.data));
      })
      .catch((error) => {
        dispatch(errorTripComment(error.response.data));
      });
  };

export const deleteTripCommentAction =
  (tripId, commentId, page, limit, callback) => async (dispatch) => {
    const params = new URLSearchParams();
    params.append('page', 1);
    params.append('limit', limit * page);

    dispatch(loadingDeleteTripComment());
    await AxiosInstance.delete(`/trips/${tripId}/comment/${commentId}`)
      .then(async () => {
        dispatch(loadingTripComment());
        await AxiosInstance.get(`/trips/${tripId}/comment?${params}`)
          .then((res) => {
            // set the current page that we changed above
            res.data.data.pagination.currentpage = page;
            dispatch(retievedTripComment(res.data));
          })
          .catch((error) => {
            dispatch(errorTripComment(error.response.data));
          });
      })
      .catch((error) => {
        dispatch(errorTripComment(error.response.data));
      });
    callback();
  };

export const editTripCommentAction =
  (tripId, commentId, comment, callback) => async (dispatch) => {
    dispatch(loadingEditTripComment());
    await AxiosInstance.patch(`/trips/${tripId}/comment/${commentId}`, {
      comment,
    })
      .then(async (res) => {
        dispatch(editedTripComment(res.data.findEdited));
      })
      .catch((error) => {
        dispatch(errorTripComment(error.response.data));
      });
    callback();
  };

export const createTripCommentAction =
  (tripId, comment) => async (dispatch) => {
    dispatch(loadingCreateTripComment());
    await AxiosInstance.post(`/trips/${tripId}/comment`, {
      comment,
    })
      .then(async (res) => {
        dispatch(createdTripComment(res.data.sendComment));
      })
      .catch((error) => {
        dispatch(errorTripComment(error.response.data));
      });
  };
