import React from 'react';
import { USERNAME_KEY } from '../../hooks';
import { IProviderProps } from './types';

const getInitialUsername = (): string => {
  return localStorage.getItem(USERNAME_KEY) ?? '';
};

const defaultUsernameContextValue = {
  username: getInitialUsername(),
  setUsername: (value: string) => {},
};

const UsernameContext = React.createContext(defaultUsernameContextValue);

export const UsernameProvider = ({ children }: IProviderProps) => {
  const [username, setUsername] = React.useState<string>(getInitialUsername);

  return <UsernameContext.Provider value={{ username, setUsername }}>{children}</UsernameContext.Provider>;
};

export const useUsername = () => React.useContext(UsernameContext);
