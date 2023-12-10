import React from 'react';
import { USERNAME_KEY } from '../../hooks';

const defaultUsernameContextValue = {
  username: '',
  setUsernameValue: (newUsername: string) => {},
};

const UsernameContext = React.createContext(defaultUsernameContextValue);

const getInitialUsername = (): string => {
  return localStorage.getItem(USERNAME_KEY) ?? '';
};

interface IUsernameProviderProps {
  children: React.ReactNode;
}

export const UsernameProvider = ({ children }: IUsernameProviderProps) => {
  const [username, setUsername] = React.useState<string>(getInitialUsername);

  const setUsernameValue = (newUsername: string) => {
    setUsername(newUsername);
  };

  return <UsernameContext.Provider value={{ username, setUsernameValue }}>{children}</UsernameContext.Provider>;
};

export const useUsername = () => {
  return React.useContext(UsernameContext);
};
