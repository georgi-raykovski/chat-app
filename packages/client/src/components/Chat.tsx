import React from 'react';
import { ChatContainer } from '../styles';
import { ChatBody, ChatBodyRefType, ChatHeader, ChatMessageEditor } from './chat-components';
import { scrollToBottom } from '../utils';
import { useMessages } from './context';

interface IChatProps {
  logoutClickHandler: () => void;
  switchTheme: () => void;
}

// TODO Add backend user/messages logic
export const Chat = ({ logoutClickHandler, switchTheme }: IChatProps) => {
  const { messages, createNewMessage } = useMessages();
  const chatBodyRef = React.useRef<ChatBodyRefType>(null);

  const onLogOutClick = () => {
    logoutClickHandler();
  };

  React.useEffect(() => {
    scrollToBottom(chatBodyRef);
  }, [messages]);

  return (
    <ChatContainer>
      <ChatHeader onLogOutClick={onLogOutClick} switchTheme={switchTheme} />
      <ChatBody messages={messages} containerRef={chatBodyRef} />
      <ChatMessageEditor createNewMessage={createNewMessage} />
    </ChatContainer>
  );
};
