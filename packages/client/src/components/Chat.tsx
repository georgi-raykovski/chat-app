import React from 'react';
import { ChatContainer } from '../styles';
import { ChatBody, ChatBodyRefType, ChatHeader, ChatMessageEditor, IMessage } from './chat-components';
import { scrollToBottom } from '../utils';
import { useMessages } from './context';
import { useSocket } from './context/SocketContext';

interface IChatProps {
  logoutClickHandler: () => void;
  switchTheme: () => void;
}

export const Chat = ({ logoutClickHandler, switchTheme }: IChatProps) => {
  const socket = useSocket();
  const { messages, createNewMessage } = useMessages();
  const chatBodyRef = React.useRef<ChatBodyRefType>(null);
  
  const handleNewMessage = React.useCallback(
    (newMessage: IMessage) => {
      createNewMessage({
        ...newMessage,
        datetime: new Date(newMessage.datetime),
      });
    },
    [createNewMessage]
  );

  const onLogOutClick = () => {
    logoutClickHandler();
  };

  React.useEffect(() => {
    scrollToBottom(chatBodyRef);
  }, [messages]);

  React.useEffect(() => {
    socket?.on('receive_message', handleNewMessage);

    return () => {
      socket?.off('receive_message', handleNewMessage);
    };
  }, [handleNewMessage, socket]);

  return (
    <ChatContainer>
      <ChatHeader onLogOutClick={onLogOutClick} switchTheme={switchTheme} />
      <ChatBody messages={messages} containerRef={chatBodyRef} />
      <ChatMessageEditor createNewMessage={createNewMessage} messagesLength={messages.length} />
    </ChatContainer>
  );
};
