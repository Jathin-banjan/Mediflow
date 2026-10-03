import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    const socketInstance = io(socketUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true
    });

    socketInstance.on('connect', () => {
      console.log('⚡ Socket.IO Connected:', socketInstance.id);
      setConnected(true);

      if (user && user._id) {
        socketInstance.emit('join_user', user._id);
      }
    });

    socketInstance.on('disconnect', () => {
      console.log('⚡ Socket.IO Disconnected');
      setConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [user]);

  const joinQueueRoom = (queueId) => {
    if (socket && queueId) {
      socket.emit('join_queue', queueId);
    }
  };

  const leaveQueueRoom = (queueId) => {
    if (socket && queueId) {
      socket.emit('leave_queue', queueId);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, connected, joinQueueRoom, leaveQueueRoom }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
