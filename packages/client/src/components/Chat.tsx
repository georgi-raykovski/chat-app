import React from 'react';
import { ChatContainer } from '../styles';
import { ChatBody, ChatBodyRefType, ChatHeader, ChatMessageEditor, IMessage } from './chat-components';
import { mockMessages } from '../mocks';
import { scrollToBottom } from '../utils';

interface IChatProps {
  logoutClickHandler: () => void;
  switchTheme: () => void;
}

// TODO Add backend user/messages logic
export const Chat = ({ logoutClickHandler, switchTheme }: IChatProps) => {
  const [messages, setMessages] = React.useState<IMessage[]>(mockMessages);
  const chatBodyRef = React.useRef<ChatBodyRefType>(null);

  const onLogOutClick = () => {
    logoutClickHandler();
  };

  const createNewMessage = (message: IMessage) => {
    setMessages((prevValue) => [...prevValue, message]);
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
