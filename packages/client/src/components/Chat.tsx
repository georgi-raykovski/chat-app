import React from 'react';
import { ChatContainer } from '../styles';
import { ChatHeader, ChatMessageEditor } from './chat-components';
import { ChatBody } from './chat-components/ChatBody';
import { IMessage } from './chat-components/types';
import { mockMessages } from '../mocks';

interface IChatProps {
  logoutClickHandler: () => void;
}

// TODO Add backend user/messages logic
// TODO chat body
// TODO chat text field

export const Chat = ({ logoutClickHandler }: IChatProps) => {
  const [messages, setMessages] = React.useState<IMessage[]>(mockMessages);

  const onLogOutClick = React.useCallback(() => {
    logoutClickHandler();
  }, [logoutClickHandler]);

  const createNewMessage = (message: IMessage) => {
    setMessages((prevValue) => [...prevValue, message]);
  };

  return (
    <ChatContainer>
      <ChatHeader onLogOutClick={onLogOutClick} />
      <ChatBody messages={messages} />
      <ChatMessageEditor createNewMessage={createNewMessage} />
    </ChatContainer>
  );
};
