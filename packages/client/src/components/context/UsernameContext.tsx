import React from 'react';
import { USERNAME_KEY } from '../../hooks';

const getInitialUsername = (): string => {
  return localStorage.getItem(USERNAME_KEY) ?? '';
};

const defaultUsernameContextValue = {
  username: getInitialUsername(),
  setUsername: (value: string) => {},
};

const UsernameContext = React.createContext(defaultUsernameContextValue);

interface IUsernameProviderProps {
  children: React.ReactNode;
}

export const UsernameProvider = ({ children }: IUsernameProviderProps) => {
  const [username, setUsername] = React.useState<string>(getInitialUsername);

  return <UsernameContext.Provider value={{ username, setUsername }}>{children}</UsernameContext.Provider>;
};

export const useUsername = () => React.useContext(UsernameContext);
