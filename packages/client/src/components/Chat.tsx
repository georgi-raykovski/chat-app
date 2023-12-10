import React from 'react';
import { ChatContainer } from '../styles';
import { ChatHeader } from './chat-components';

interface IChatProps {
  username: string;
  logoutClickHandler: () => void;
}

// TODO Add backend user/messages logic
// TODO chat header
// TODO chat body
// TODO chat text field

export const Chat = ({ username, logoutClickHandler }: IChatProps) => {
  const onLogOutClick = React.useCallback(() => {
    logoutClickHandler();
  }, [logoutClickHandler]);

  return (
    <ChatContainer>
      <ChatHeader username={username} onLogOutClick={onLogOutClick} />
    </ChatContainer>
  );
};
