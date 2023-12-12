import React from 'react';
import { LoginForm, Chat, MainContainer, MessagesProvider } from './components';
import { GlobalStyles } from './styles';
import { ThemeProvider } from 'styled-components';
import { useTheme, useAuth } from './hooks';

const App = () => {
  const { isUserLoggedIn, login, logout } = useAuth();
  const { currentTheme, onThemeSwitchHandler } = useTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <MessagesProvider>
        <MainContainer>
          <GlobalStyles />
          {!isUserLoggedIn && <LoginForm loginClickHandler={login} switchTheme={onThemeSwitchHandler} />}
          {isUserLoggedIn && <Chat logoutClickHandler={logout} switchTheme={onThemeSwitchHandler} />}
        </MainContainer>
      </MessagesProvider>
    </ThemeProvider>
  );
};

export default App;
