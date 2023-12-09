import React from 'react';
import { ChatContainer } from '../styles';

interface IChatProps {
  username: string;
  logoutClickHandler: () => void;
}

// TODO Style page
// TODO Add backend user/messages logic

export const Chat = ({ username, logoutClickHandler }: IChatProps) => {
  const onLogOutClick = React.useCallback(() => {
    logoutClickHandler();
  }, [logoutClickHandler]);

  return (
    <ChatContainer>
      <h2>Chat app</h2>
      <p>{username}</p>
      <button onClick={onLogOutClick}>Log out</button>
    </ChatContainer>
  );
};
