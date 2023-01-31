import {
  CREATE_ROOM_PENDING,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILED,
  FETCH_ROOM_PENDING,
  FETCH_ROOM_SUCCESS,
  FETCH_ROOM_FAILED,
} from '../types/room.types';

const initialState = {
  room: {},
  pending: false,
  error: null,
};

/* istanbul ignore next */
export const createRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROOM_PENDING:
      return { ...state, pending: true, room: {}, error: null };
    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        pending: false,
        room: action.payload,
        error: null,
      };
    case CREATE_ROOM_FAILED:
      return { ...state, pending: false, room: {}, error: action.payload };
    default:
      return state;
  }
};

export const fetchRoomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOM_PENDING:
      return { ...state, pending: true, room: {}, error: null };
    case FETCH_ROOM_SUCCESS:
      return {
        ...state,
        pending: false,
        room: action.payload,
        error: null,
      };
    case FETCH_ROOM_FAILED:
      return {
        ...state,
        pending: false,
        room: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
