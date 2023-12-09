import { useState, useEffect } from 'react';

const USER_LOGGED_IN_KEY = 'userLoggedIn';
const USERNAME_KEY = 'username';

const useAuth = () => {
  const [username, setUsername] = useState<string>('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  const login = (value: string) => {
    setUsername(value);
    setIsUserLoggedIn(true);
    localStorage.setItem(USER_LOGGED_IN_KEY, 'true');
    localStorage.setItem(USERNAME_KEY, value);
  };

  const logout = () => {
    setUsername('');
    setIsUserLoggedIn(false);
  };

  useEffect(() => {
    const userLoggedIn = localStorage.getItem(USER_LOGGED_IN_KEY) === 'true';
    setIsUserLoggedIn(userLoggedIn);

    if (userLoggedIn) {
      setUsername(localStorage.getItem(USERNAME_KEY) ?? '');
    }
  }, []);

  return { username, isUserLoggedIn, login, logout };
};

export default useAuth;
