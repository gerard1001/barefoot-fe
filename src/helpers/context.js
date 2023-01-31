import { io } from 'socket.io-client';
import { createContext } from 'react';

export const socket = io('https://barefoot-backend-development.herokuapp.com', {
  autoConnect: false,
  auth: {
    token: '',
  },
});

export const socketContext = createContext();
