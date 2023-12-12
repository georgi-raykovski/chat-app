import React from 'react';
import { LoginForm, Chat, MainContainer } from './components';
import { useAuth, useTheme } from './hooks';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles';

const App = () => {
  const { isUserLoggedIn, login, logout } = useAuth();
  const { currentTheme, onThemeSwitchHandler } = useTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <MainContainer>
        <GlobalStyles />
        {!isUserLoggedIn && <LoginForm loginClickHandler={login} switchTheme={onThemeSwitchHandler} />}
        {isUserLoggedIn && <Chat logoutClickHandler={logout} switchTheme={onThemeSwitchHandler} />}
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;
