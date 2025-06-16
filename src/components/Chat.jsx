import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const user = useSelector((store) => store.user);
    const userId = user?._id;
    const socketRef = useRef(null);


    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, { withCredentials: true });
        console.log(chat.data.messages);

        const chatMessages = chat?.data?.messages.map((msg) => ({
            sender: msg.senderId?.firstName || "Unknown",
            content: msg.text,
            timestamp: msg.createdAt || new Date().toLocaleTimeString(),
            seen: msg.seen || false,
        }));

        setMessages(chatMessages);
    };
    useEffect(() => {
        fetchChatMessages();
    }, []);


    useEffect(() => {
        if (!userId) return;

        const socket = createSocketConnection();
        socketRef.current = socket;

        socket.emit("jointChat", {
            firstName: user.firstName,
            userId,
            targetUserId,
        });

        socket.on("receivemessage", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]);

    const handleSend = () => {
        if (input.trim() === '') return;

        const message = {
            firstName: user.firstName,
            userId,
            targetUserId,
            sender: user.firstName,
            content: input,
            timestamp: new Date().toLocaleTimeString(),
            seen: true,
        };

        socketRef.current?.emit("sendmessage", message);
        setMessages((prev) => [...prev, message]);
        setInput('');
    };

    return (
        <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col text-white bg-gray-900'>
            <h1 className='p-5 border-b border-gray-600'>Chat</h1>

            <div className='flex-1 overflow-y-auto p-5 space-y-4'>
                {messages.map((msg, index) => (
                    <div key={index}
                        className={
                            "chat " +
                            (user.firstName === msg.sender ? "chat-end" : "chat-start")
                        }
                    >
                        <div className="chat-header">
                            {msg.sender}
                            <time className="text-xs opacity-50 ml-2">{msg.timestamp}</time>
                        </div>
                        <div className="chat-bubble">{msg.content}</div>
                        <div className="chat-footer opacity-50">{msg.seen ? 'Seen' : 'Delivered'}</div>
                    </div>
                ))}
            </div>

            <div className='p-2 border-t border-gray-600 flex items-center gap-1'>
                <input
                    className='flex-1 border border-gray-500 text-white rounded p-2 bg-black'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder='Type your message...'
                />
                <button className='btn btn-primary' onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
