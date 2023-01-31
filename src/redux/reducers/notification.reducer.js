import { Action } from 'history';
import {
  FETCH_NOTIFICATIONS,
  MARK_ALL_NOTIFICATIONS,
  MARK_SINGLE_NOTIFICATION,
  UPDATE_NOTIFICATION,
} from '../types/notifications.type';

const initialState = {
  notifications: [],
  error: null,
  pending: false,
  loading: false,
  unread: 0,
};
/* istanbul ignore next */
export const fetchNotifications = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_NOTIFICATIONS}_PENDING`:
      return { ...state, pending: true };
    case `${FETCH_NOTIFICATIONS}_SUCCESS`:
      return {
        ...state,
        pending: false,
        error: null,
        unread: action.payload.unread,
        notifications: action.payload.Notifications,
      };
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        pending: false,
        error: null,
        unread: state.unread + 1,
        notifications: [action.payload, ...state.notifications.results],
      };
    case `${FETCH_NOTIFICATIONS}_ERROR`:
      return { ...state, pending: false, error: action.payload };
    case MARK_SINGLE_NOTIFICATION:
      return {
        ...state,
        unread: state.unread - 1,
        notifications: {
          ...state.notifications,
          results: state.notifications.results.map((notification) =>
            notification.id === action.payload.id
              ? { ...notification, isRead: true }
              : { ...notification },
          ),
        },
      };
    case `${MARK_ALL_NOTIFICATIONS}_SUCCESS`:
      return {
        ...state,
        unread: 0,
        notifications: {
          ...state.notifications,
          results: state.notifications.results.map((notification) => ({
            ...notification,
            isRead: true,
          })),
        },
      };
    default:
      return { ...state };
  }
};
