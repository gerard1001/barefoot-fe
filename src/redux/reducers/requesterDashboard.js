/* eslint-disable array-callback-return */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */
/* istanbul ignore next */
import {
  FETCH_REQUESTS_PENDING,
  FETCH_REQUESTS_SUCCESS,
  FETCH_REQUESTS_ERROR,
  DELETE_REQUESTS_ERROR,
  DELETE_REQUESTS_PENDING,
  DELETE_REQUESTS_SUCCESS,
  APPROVE_PENDING_REQUEST,
  APPROVE_REQUEST_SUCCESS,
  APPROVE_REQUEST_ERROR,
  REJECT_PENDING_REQUEST,
  REJECT_REQUEST_ERROR,
  REJECT_REQUEST_SUCCESS,
  CREATETRIP,
  CREATETRIP_FAILED,
  CREATETRIP_SUCCESS,
  UPDATETRIP,
  UPDATETRIP_SUCCESS,
  UPDATERIP_FAILED,
} from '../types/Requester.Types';
/* istanbul ignore next */
const initialState = {
  requests: [],
  error: null,
  pending: false,
  message: '',
  loading: false,
};
/* istanbul ignore next */
export const requestsReducer = (state = initialState, action) => {
  /* istanbul ignore next */
  switch (action.type) {
    case FETCH_REQUESTS_PENDING:
      return { ...state, pending: true, requests: [], error: null };
    case FETCH_REQUESTS_SUCCESS:
      return {
        ...state,
        pending: false,
        requests: action.payload,
        error: null,
      };
    case FETCH_REQUESTS_ERROR:
      return { ...state, pending: false, error: action.payload };

    case CREATETRIP:
      return { ...state, pending: true };
    case CREATETRIP_SUCCESS:
      return {
        ...state,
        requests: {
          ...state.requests,
          data: {
            ...state.requests.data,
            results: state.requests.data.results.map((request) => request),
          },
        },
        pending: false,
      };
    case CREATETRIP_FAILED:
      return { ...state, error: action.payload, pending: false };

    case UPDATETRIP:
      return { ...state, pending: true };
    case UPDATETRIP_SUCCESS:
      return {
        ...state,
        requests: {
          ...state.requests,
          data: {
            ...state.requests.data,
            results: state.requests.data.results.map((request) => {
              if (request.id === action.payload.id) {
                return {
                  ...action.payload.updateInfo.data.data.updated[1][0],
                  arrivalLocations:
                    action.payload.updateInfo.data.data.updateArrivalLocations,
                };
              }
              return request;
            }),
          },
        },
        pending: false,
      };
    case UPDATERIP_FAILED:
      return { ...state, error: action.payload, pending: false };

    case DELETE_REQUESTS_PENDING:
      return { ...state, loading: true };

    case DELETE_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.res,
        requests: {
          ...state.requests,
          data: {
            ...state.requests.data,
            results: state.requests.data.results.filter(
              (result) => result.id !== action.payload.id,
            ),
          },
        },
        error: null,
      };
    /* istanbul ignore next */
    case DELETE_REQUESTS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case APPROVE_PENDING_REQUEST:
      return { ...state, loading: true };
    /* istanbul ignore next */
    case APPROVE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        requests: {
          ...state.requests,
          data: {
            ...state.requests.data,
            results: state.requests.data.results.map((result) =>
              result.id === action.payload.id
                ? { ...result, status: action.payload.status }
                : result,
            ),
          },
        },
        error: null,
      };
    case APPROVE_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };

    case REJECT_PENDING_REQUEST:
      return { ...state, loading: true };

    case REJECT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        requests: {
          ...state.requests,
          data: {
            ...state.requests.data,
            results: state.requests.data.results.map((result) =>
              result.id === action.payload.id
                ? { ...result, status: action.payload.status }
                : result,
            ),
          },
        },
        error: null,
      };
    case REJECT_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
