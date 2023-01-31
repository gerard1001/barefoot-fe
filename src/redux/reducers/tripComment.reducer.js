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

const initialState = {
  commentRes: {
    message: 'no comments',
    data: {
      pagination: {
        totalItems: 0,
        totalpages: 0,
        currentpage: 0,
      },
      results: [],
    },
  },
  error: null,
  loading: true,
  loadingMore: false,
  loadingDelete: false,
  loadingEdit: false,
  loadingCreate: false,
};

/* istanbul ignore next */
const tripCommentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    /* istanbul ignore next */
    case RETRIEVED_TRIP_COMMENT:
      return {
        ...state,
        commentRes: payload,
        error: null,
        loadingDelete: false,
        loading: false,
      };

    /* istanbul ignore next */
    case RETRIEVED_MORE_TRIP_COMMENT:
      return {
        ...state,
        commentRes: {
          ...state.commentRes,
          data: {
            pagination: payload.data.pagination,
            results: [
              ...state.commentRes.data.results,
              ...payload.data.results,
            ],
          },
        },
        error: null,
        loadingMore: false,
      };

    /* istanbul ignore next */
    case EDIT_TRIP_COMMENT:
      return {
        ...state,
        commentRes: {
          ...state.commentRes,
          data: {
            ...state.commentRes.data,
            results: state.commentRes.data.results.map((comment) => {
              if (comment.id === payload.id) {
                return { ...comment, ...payload };
              }

              return comment;
            }),
          },
        },
        error: null,
        loadingEdit: false,
      };

    /* istanbul ignore next */
    case CREATE_TRIP_COMMENT:
      return {
        ...state,
        commentRes: {
          ...state.commentRes,
          data: {
            ...state.commentRes.data,
            results: [payload, ...state.commentRes.data.results],
          },
        },
        error: null,
        loadingCreate: false,
      };

    /* istanbul ignore next */
    case LOADING_TRIP_COMMENT:
      return {
        ...state,
        error: null,
        loading: true,
      };

    /* istanbul ignore next */
    case LOADING_MORE_TRIP_COMMENT:
      return {
        ...state,
        error: null,
        loadingMore: true,
      };

    /* istanbul ignore next */
    case LOADING_DELETE_TRIP_COMMENT:
      return {
        ...state,
        error: null,
        loadingDelete: true,
      };

    /* istanbul ignore next */
    case LOADING_EDIT_TRIP_COMMENT:
      return {
        ...state,
        error: null,
        loadingEdit: true,
      };

    /* istanbul ignore next */
    case LOADING_CREATE_TRIP_COMMENT:
      return {
        ...state,
        error: null,
        loadingCreate: true,
      };

    /* istanbul ignore next */
    case ERROR_TRIP_COMMENT:
      return {
        ...state,
        error: payload,
        loading: false,
        loadingMore: false,
        loadingDelete: false,
        loadingEdit: false,
        loadingCreate: false,
      };

    default:
      return state;
  }
};

export default tripCommentReducer;
