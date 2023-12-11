import React from 'react';
import { ChatContainer } from '../styles';
import { ChatHeader, ChatMessageEditor } from './chat-components';
import { ChatBody } from './chat-components/ChatBody';
import { IMessage } from './chat-components/types';
import { mockMessages } from '../mocks';

interface IChatProps {
  logoutClickHandler: () => void;
  switchTheme: () => void;
}

// TODO Add backend user/messages logic
export const Chat = ({ logoutClickHandler, switchTheme }: IChatProps) => {
  const [messages, setMessages] = React.useState<IMessage[]>(mockMessages);

  const onLogOutClick = () => {
    logoutClickHandler();
  };

  const createNewMessage = (message: IMessage) => {
    setMessages((prevValue) => [...prevValue, message]);
  };

  return (
    <ChatContainer>
      <ChatHeader onLogOutClick={onLogOutClick} switchTheme={switchTheme} />
      <ChatBody messages={messages} />
      <ChatMessageEditor createNewMessage={createNewMessage} />
    </ChatContainer>
  );
};
