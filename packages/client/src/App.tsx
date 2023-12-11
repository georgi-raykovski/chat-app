import React from 'react';
import { LoginForm, Chat, MainContainer } from './components';
import { GlobalStyles } from './styles';
import { ThemeProvider } from 'styled-components';
import { useTheme, useAuth } from './hooks';

// TODO Fine tune responsive design

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
