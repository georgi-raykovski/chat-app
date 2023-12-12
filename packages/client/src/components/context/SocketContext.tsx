import React from 'react';
import { io } from 'socket.io-client';
import { IProviderProps } from './types';
import { ClientSocketType } from '../../utils';

const socket: ClientSocketType = io('http://localhost:3001');

const SocketContext = React.createContext<ClientSocketType | undefined>(undefined);

export const SocketProvider = ({ children }: IProviderProps) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => React.useContext(SocketContext);
