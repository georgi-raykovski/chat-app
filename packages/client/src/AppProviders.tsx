import React from 'react';
import { MessagesProvider, SocketProvider, UsernameProvider } from './components';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <UsernameProvider>
      <SocketProvider>
        <MessagesProvider>{children}</MessagesProvider>
      </SocketProvider>
    </UsernameProvider>
  );
};
