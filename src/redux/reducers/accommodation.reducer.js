/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { FETCHACCOMMODATIONS } from '../actionTypes/actionTypes';
import {
  FETCH_ACCOMMODATIONS_PENDING,
  FETCH_ACCOMMODATIONS_SUCCESS,
  FETCH_ACCOMMODATIONS_FAILED,
  CREATE_ACCOMMODATION_PENDING,
  CREATE_ACCOMMODATION_SUCCESS,
  CREATE_ACCOMMODATION_FAILED,
  FETCH_SINGLE_ACCOMMODATION_FAILED,
  FETCH_SINGLE_ACCOMMODATION_SUCCESS,
  FETCH_SINGLE_ACCOMMODATION_PENDING,
  DELETE_ACCOMMODATION_PENDING,
  DELETE_ACCOMMODATION_SUCCESS,
  DELETE_ACCOMMODATION_FAILED,
  UPDATE_ACCOMMODATION_PENDING,
  UPDATE_ACCOMMODATION_SUCCESS,
  UPDATE_ACCOMMODATION_FAILED,
  FILTER_ACCOMMODATION,
  FETCH_COMMENTS,
  CREATE_COMMENTS,
  UPDATE_COMMENTS,
  DELETE_COMMENTS,
  LIKE_ACCOMMODATION,
  LIKE_ACCOMMODATION_FAILED,
} from '../types/accommodation.types';

const initialState1 = {
  accommodations: [],
};

const accommodationReducer = (state = initialState1, action) => {
  switch (action.type) {
    case FETCHACCOMMODATIONS:
      return {
        ...state,
        accommodations: action.payload,
      };
    default:
      return state;
  }
};

export default accommodationReducer;

const initialState = {
  accommodations: [],
  error: null,
  pending: false,
  loading: false,
  comments: [],
  like: null,
};
const initialStateAllAccommodation = {
  accommodations: [],
  allAccommodations: [],
  error: null,
  pending: false,
};

const initialDeleteState = {
  pending: false,
  message: '',
  error: '',
};
const initialLikeState = {
  likes: '',
  loading: false,
  error: null,
};
/* istanbul ignore next */
export const fetchSingleAccommodationReducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case FETCH_SINGLE_ACCOMMODATION_PENDING:
      return { ...state, pending: true, accommodations: {} };
    case FETCH_SINGLE_ACCOMMODATION_SUCCESS:
      return { ...state, pending: false, accommodations: action.payload };
    case FETCH_SINGLE_ACCOMMODATION_FAILED:
      return {
        ...state,
        pending: false,
        accommodations: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
/* istanbul ignore next */
export const createAccommodationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ACCOMMODATION_PENDING:
      return { ...state, pending: true, accommodations: [], error: null };
    case CREATE_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        pending: false,
        accommodations: {
          ...state.accommodations,
          data: {
            ...state.accommodations.data,
            data: action.payload.data.data,
          },
        },
        error: null,
      };
    case CREATE_ACCOMMODATION_FAILED:
      return {
        ...state,
        pending: false,
        accommodations: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
/* istanbul ignore next */
export const fetchAllAccommodations = (
  state = initialStateAllAccommodation,
  action,
) => {
  switch (action.type) {
    case FETCH_ACCOMMODATIONS_PENDING:
      return {
        ...state,
        pending: true,
        accommodations: [],
        allAccommodations: [],
        error: null,
      };
    case FETCH_ACCOMMODATIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        accommodations: action.payload,
        allAccommodations: action.payload,
        error: null,
      };
    case LIKE_ACCOMMODATION:
      return {
        ...state,
        accommodations: {
          ...state.accommodations,
          data: {
            ...state.accommodations.data,
            results: state.accommodations.data.results.map((accommodation) =>
              accommodation.id === action.payload.accommodationId
                ? action.payload.res.data.data.like
                  ? { ...accommodation, likes: accommodation.likes + 1 }
                  : { ...accommodation, likes: accommodation.likes - 1 }
                : accommodation,
            ),
          },
        },
        error: null,
        likes: true,
      };
    case LIKE_ACCOMMODATION_FAILED:
      return {
        ...state,
        accommodations: null,
        like: null,
        error: action.payload,
      };
    case FILTER_ACCOMMODATION:
      return {
        ...state,
        pending: false,
        accommodations: {
          ...state.allAccommodations,
          data: {
            ...state.allAccommodations.data,
            results: state.allAccommodations.data.results.filter((accom) => {
              if (action.payload.length === 0) {
                return true;
              }

              for (let i = 0; i < action.payload.length; i++) {
                if (accom.id === action.payload[i]) {
                  return true;
                }
              }

              return false;
            }),
          },
        },
        error: null,
      };
    case FETCH_ACCOMMODATIONS_FAILED:
      return {
        ...state,
        pending: false,
        accommodations: [],
        allAccommodations: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
/* istanbul ignore next */
export const deleteAccommodationReducer = (
  state = initialDeleteState,
  action,
) => {
  switch (action.type) {
    case DELETE_ACCOMMODATION_PENDING:
      return { ...state, pending: true, error: null };
    case DELETE_ACCOMMODATION_SUCCESS:
      return { ...state, pending: false, message: action.payload, error: null };
    case DELETE_ACCOMMODATION_FAILED:
      return { ...state, pending: false, error: action.payload, message: '' };
    default:
      return state;
  }
};
/* istanbul ignore next */
export const updateAccommodationReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACCOMMODATION_PENDING:
      return { ...state, pending: true, accommodations: [], error: null };
    case UPDATE_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        pending: false,
        accommodations: {
          ...state.accommodations,
          data: {
            ...state.accommodations.data,
            data: action.payload,
          },
        },
        error: null,
      };
    case UPDATE_ACCOMMODATION_FAILED:
      return {
        ...state,
        pending: false,
        accommodations: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
/* istanbul ignore next */
export const fetchCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_COMMENTS}_SUCCESS`:
      return {
        ...state,
        comments: action.payload,
      };
    case `${FETCH_COMMENTS}_FAILED`:
      return {
        ...state,
        error: action.payload,
      };
    case `${CREATE_COMMENTS}_PENDING`:
      return { ...state, pending: true };
    case `${CREATE_COMMENTS}_SUCCESS`:
      return {
        ...state,
        comments: {
          ...state.comments,
          data: {
            ...state.comments.data,
            results: [action.payload.data, ...state.comments.data.results],
          },
        },
        pending: false,
      };
    case `${CREATE_COMMENTS}_FAILED`:
      return { ...state, pending: false };
    case `${UPDATE_COMMENTS}_PENDING`:
      return { ...state, loading: true };
    case `${UPDATE_COMMENTS}_SUCCESS`:
      return {
        ...state,
        comments: {
          ...state.comments,
          data: {
            ...state.comments.data,
            results: state.comments.data.results.map((comment) =>
              comment.id === action.payload.commentId
                ? { ...comment, comment: action.payload.comment }
                : comment,
            ),
          },
        },
        loading: false,
      };
    case `${UPDATE_COMMENTS}_FAILED`:
      return { ...state, loading: false };
    case `${DELETE_COMMENTS}_SUCCESS`:
      return {
        ...state,
        comments: {
          ...state.comments,
          data: {
            ...state.comments.data,
            results: state.comments.data.results.filter(
              (comment) => comment.id !== action.payload.commentId,
            ),
          },
        },
      };
    case `${DELETE_COMMENTS}_FAILED`:
      return state;
    default:
      return state;
  }
};

/* istanbul ignore next */
export const likeAccommodationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_ACCOMMODATION:
      return {
        ...state,
        accommodations: {
          ...state.accommodations,
          data: {
            ...state.accommodations.data,
            results: state.accommodations.data.results.map((accommodation) =>
              action.payload.like === true
                ? { ...accommodation, likes: accommodation.likes + 1 }
                : accommodation,
            ),
          },
        },
        error: null,
      };
    case LIKE_ACCOMMODATION_FAILED:
      return { ...state, likes: null, error: action.payload };
    default:
      return state;
  }
};
