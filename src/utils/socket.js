import io from 'socket.io-client';
import { BASE_URL } from './constants'; // Make sure BASE_URL is "http://16.176.26.222"

export const createSocketConnection = () => {
    if (window.location.hostname === 'localhost') {
        return io(BASE_URL);
    } else {
        return io("http://16.176.26.222", {
            path: "/socket.io",
            transports: ["websocket"], // forces WS connection
        });
    }
};
