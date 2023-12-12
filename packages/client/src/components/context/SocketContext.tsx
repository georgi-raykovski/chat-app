import React from 'react';
import { Socket, io } from 'socket.io-client';
import { IProviderProps } from './types';

const socket = io('http://localhost:3001');

const SocketContext = React.createContext<Socket | undefined>(undefined);

export const SocketProvider = ({ children }: IProviderProps) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => React.useContext(SocketContext);
