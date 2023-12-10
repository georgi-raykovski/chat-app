import React from 'react';
import { LoginForm, Chat, MainContainer } from './components';
import { Button, GlobalStyles } from './styles';
import useAuth from './hooks/useAuth';
import { ThemeProvider } from 'styled-components';
import { useTheme } from './hooks/useTheme';

const App = () => {
  const { username, isUserLoggedIn, login, logout } = useAuth();
  const { currentTheme, onThemeSwitchHandler } = useTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <MainContainer>
        <GlobalStyles />
        <Button className="toggle" onClick={onThemeSwitchHandler}>
          Switch Theme
        </Button>
        {!isUserLoggedIn && <LoginForm loginClickHandler={login} />}
        {isUserLoggedIn && <Chat username={username} logoutClickHandler={logout} />}
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;
