import { useState } from 'react';
import { useUsername } from '../components';

const USER_LOGGED_IN_KEY = 'userLoggedIn';
export const USERNAME_KEY = 'username';

const getInitialLoggedInState = (): boolean => {
  const userLoggedIn = localStorage.getItem(USER_LOGGED_IN_KEY) === 'true' ? true : false;
  return userLoggedIn ?? false;
};

export const useAuth = () => {
  const { username, setUsernameValue } = useUsername();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(getInitialLoggedInState);

  const login = (value: string) => {
    setUsernameValue(value);
    setIsUserLoggedIn(true);
    localStorage.setItem(USER_LOGGED_IN_KEY, 'true');
    localStorage.setItem(USERNAME_KEY, value);
  };

  const logout = () => {
    setUsernameValue('');
    setIsUserLoggedIn(false);
    localStorage.setItem(USER_LOGGED_IN_KEY, 'false');
    localStorage.setItem(USERNAME_KEY, '');
  };

  return { username, isUserLoggedIn, login, logout };
};
