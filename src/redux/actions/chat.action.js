import {
  RECEIVE_CHATS,
  RECEIVE_CHAT_ERROR,
  SEND_CHATS,
  SEND_CHAT_ERROR,
  SOCKET_CONNECT,
  USER_LEAVING,
} from '../types/chat.types';

export const sendMessage = (data) => ({
  type: SEND_CHATS,
  payload: data,
});
export const receiveMessage = (data) => ({
  type: RECEIVE_CHATS,
  payload: data,
});
export const sendMessageError = (data) => ({
  type: SEND_CHAT_ERROR,
  payload: data,
});
export const recieveMessageError = (data) => ({
  type: RECEIVE_CHAT_ERROR,
  payload: data,
});

export const chatLeave = (data) => ({
  type: USER_LEAVING,
  payload: data,
});

export const socketConnecting = (data) => ({
  type: SOCKET_CONNECT,
  payload: data,
});
