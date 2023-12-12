import React from 'react';
import { useUsername } from '../components';

const USER_LOGGED_IN_KEY = 'userLoggedIn';
export const USERNAME_KEY = 'username';
const LOGIN_URL = 'http://localhost:3001/users/login';

const getInitialLoggedInState = (): boolean => {
  const userLoggedIn = localStorage.getItem(USER_LOGGED_IN_KEY) === 'true' ? true : false;
  return userLoggedIn ?? false;
};

export const useAuth = () => {
  const { username, setUsername } = useUsername();
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState<boolean>(getInitialLoggedInState);

  const login = React.useCallback(
    async (value: string) => {
      setUsername(value);
      setIsUserLoggedIn(true);
      localStorage.setItem(USER_LOGGED_IN_KEY, 'true');
      localStorage.setItem(USERNAME_KEY, value);

      await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: value }),
      }).catch((e) => console.log('Error during signup: ', e));
    },
    [setUsername]
  );

  const logout = React.useCallback(() => {
    setUsername('');
    setIsUserLoggedIn(false);
    localStorage.setItem(USER_LOGGED_IN_KEY, 'false');
    localStorage.setItem(USERNAME_KEY, '');
  }, [setUsername]);

  return { username, isUserLoggedIn, login, logout };
};
