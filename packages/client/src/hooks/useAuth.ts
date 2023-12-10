import { useState } from 'react';

const USER_LOGGED_IN_KEY = 'userLoggedIn';
const USERNAME_KEY = 'username';

const getInitialUsername = (): string => {
  return localStorage.getItem(USERNAME_KEY) ?? '';
};

const getInitialLoggedInState = (): boolean => {
  const userLoggedIn = localStorage.getItem(USER_LOGGED_IN_KEY) === 'true' ? true : false;
  return userLoggedIn ?? false;
};

const useAuth = () => {
  const [username, setUsername] = useState<string>(getInitialUsername);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(getInitialLoggedInState);

  const login = (value: string) => {
    setUsername(value);
    setIsUserLoggedIn(true);
    localStorage.setItem(USER_LOGGED_IN_KEY, 'true');
    localStorage.setItem(USERNAME_KEY, value);
  };

  const logout = () => {
    setUsername('');
    setIsUserLoggedIn(false);
    localStorage.setItem(USER_LOGGED_IN_KEY, 'false');
    localStorage.setItem(USERNAME_KEY, '');
  };

  return { username, isUserLoggedIn, login, logout };
};

export default useAuth;
