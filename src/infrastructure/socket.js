import { io } from 'socket.io-client';
import { URL } from '../url';

const socket = io(URL, {
  reconnectionAttempts: 2,
  reconnectionDelay: 1000,
});

export default socket;
