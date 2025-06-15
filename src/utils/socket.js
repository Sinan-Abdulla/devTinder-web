import io from 'socket.io-client';
import { BASE_URL } from './constants';


export const createSocketConnection = () => {
    if (localStorage.hostname === 'localhost') {
        return io(BASE_URL);
    } else {
        return io("/", { path: '/socket.io' });
    }
};