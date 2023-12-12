import React from 'react';
import { LoginForm, Chat, MainContainer, MessagesProvider } from './components';
import { GlobalStyles } from './styles';
import { ThemeProvider } from 'styled-components';
import { useTheme, useAuth } from './hooks';
import { io } from 'socket.io-client';
import { SocketProvider } from './components/context/SocketContext';

const socket = io('http://localhost:3001');

const App = () => {
  const { isUserLoggedIn, login, logout } = useAuth();
  const { currentTheme, onThemeSwitchHandler } = useTheme();

  socket.on('connect', () => {
    console.log('Connected to the server');
  });

  return (
    <ThemeProvider theme={currentTheme}>
      <SocketProvider>
        <MessagesProvider>
          <MainContainer>
            <GlobalStyles />
            {!isUserLoggedIn && <LoginForm loginClickHandler={login} switchTheme={onThemeSwitchHandler} />}
            {isUserLoggedIn && <Chat logoutClickHandler={logout} switchTheme={onThemeSwitchHandler} />}
          </MainContainer>
        </MessagesProvider>
      </SocketProvider>
    </ThemeProvider>
  );
};

export default App;
