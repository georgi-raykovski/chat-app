import React from 'react';
import { LoginForm, Chat, MainContainer } from './components';
import { Theme, Button, GlobalStyles } from './styles';
import useAuth from './hooks/useAuth';
import { ThemeProvider } from 'styled-components';

// TODO Make Theme persist

const App = () => {
  const { username, isUserLoggedIn, login, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

  const onThemeSwitchHandler = () => {
    setIsDarkMode((value) => !value);
  };  

  const currentTheme = isDarkMode ? Theme['dark'] : Theme['light'];

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
