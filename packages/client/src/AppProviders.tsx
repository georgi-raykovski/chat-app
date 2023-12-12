import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MainContainer, MessagesProvider, SocketProvider, UsernameProvider } from './components';
import { GlobalStyles } from './styles';
import { useTheme } from './hooks';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const { currentTheme } = useTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <UsernameProvider>
        <SocketProvider>
          <MessagesProvider>
            <MainContainer>
              <GlobalStyles />
              {children}
            </MainContainer>
          </MessagesProvider>
        </SocketProvider>
      </UsernameProvider>
    </ThemeProvider>
  );
};
