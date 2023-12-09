import React from 'react';
import { LoginForm, Chat } from './components';
import { GlobalStyles } from './styles';
import useAuth from './hooks/useAuth';

const App = () => {
  const { username, isUserLoggedIn, login, logout } = useAuth();

  return (
    <div className="App">
      <GlobalStyles />
      {!isUserLoggedIn && <LoginForm loginClickHandler={login} />}
      {isUserLoggedIn && <Chat username={username} logoutClickHandler={logout} />}
    </div>
  );
};

export default App;
