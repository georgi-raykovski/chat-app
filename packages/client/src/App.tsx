import React, { useState } from 'react';
import { LoginForm, Chat, MainContainer } from './components';
import { AvailableThemes, Button, GlobalStyles } from './styles';
import useAuth from './hooks/useAuth';
import { ThemeProvider } from 'styled-components';

const App = () => {
  const { username, isUserLoggedIn, login, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const onThemeSwitchHandler = () => {
    setIsDarkMode((value) => !value);
  };

  const currentTheme = isDarkMode ? AvailableThemes['dark'] : AvailableThemes['light'];

  return (
    <ThemeProvider theme={currentTheme}>
      <MainContainer>
        <GlobalStyles />
        <Button className='toggle' onClick={onThemeSwitchHandler}>Switch Theme</Button>
        {!isUserLoggedIn && <LoginForm loginClickHandler={login} />}
        {isUserLoggedIn && <Chat username={username} logoutClickHandler={logout} />}
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;
