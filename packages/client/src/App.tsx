import React from 'react';
import { LoginForm, Chat, MainContainer, UsernameProvider } from './components';
import { Button, GlobalStyles } from './styles';
import { ThemeProvider } from 'styled-components';
import { useTheme, useAuth } from './hooks';

// TODO Fine tune responsive design

const App = () => {
  const { isUserLoggedIn, login, logout } = useAuth();
  const { currentTheme, onThemeSwitchHandler } = useTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <UsernameProvider>
        <MainContainer>
          <GlobalStyles />
          <Button className="toggle" onClick={onThemeSwitchHandler}>
            Switch Theme
          </Button>
          {!isUserLoggedIn && <LoginForm loginClickHandler={login} />}
          {isUserLoggedIn && <Chat logoutClickHandler={logout} />}
        </MainContainer>
      </UsernameProvider>
    </ThemeProvider>
  );
};

export default App;
