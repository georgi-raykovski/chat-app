import React from 'react';
import { LoginForm, Chat } from './components';
import { useTheme, useAuth } from './hooks';

const App = () => {
  const { isUserLoggedIn, login, logout } = useAuth();
  const { onThemeSwitchHandler } = useTheme();

  return (
    <>
      {!isUserLoggedIn && <LoginForm loginClickHandler={login} switchTheme={onThemeSwitchHandler} />}
      {isUserLoggedIn && <Chat logoutClickHandler={logout} switchTheme={onThemeSwitchHandler} />}
    </>
  );
};

export default App;
