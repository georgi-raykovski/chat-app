import React from 'react';
import { IMessage } from '../chat-components';
import { IProviderProps } from './types';
import { useSocket } from './SocketContext';

interface IMessagesContext {
  messages: IMessage[];
  sendEditMessageSignal: (messageId: number, newContent: string) => void;
  sendDeleteMessageSignal: (messageId: number) => void;
}

const defaultMessagesContextValue: IMessagesContext = {
  messages: [],
  sendEditMessageSignal: (messageId) => {},
  sendDeleteMessageSignal: (messageId) => {},
};

const MessagesContext = React.createContext(defaultMessagesContextValue);

export const MessagesProvider = ({ children }: IProviderProps) => {
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const socket = useSocket();

  const sendEditMessageSignal = React.useCallback(
    async (messageId: number, newContent: string) => {
      await socket?.emit('edit_message', messageId, newContent);
    },
    [socket]
  );

  const sendDeleteMessageSignal = React.useCallback(
    async (messageId: number) => {
      await socket?.emit('delete_message', messageId);
    },
    [socket]
  );

  React.useEffect(() => {
    fetch('http://localhost:3001/messages')
      .then((data) => data.json())
      .then((messages: IMessage[]) =>
        setMessages(messages.map((message) => ({ ...message, datetime: new Date(message.datetime) })))
      )
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  const editMessage = React.useCallback((editedMessage: IMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (editedMessage.id === message.id) {
          return {
            ...editedMessage,
            datetime: new Date(editedMessage.datetime),
          };
        }
        return message;
      })
    );
  }, []);

  React.useEffect(() => {
    socket?.on('message_edited', editMessage);

    return () => {
      socket?.off('message_edited', editMessage);
    };
  }, [editMessage, socket]);

  const handleNewMessage = React.useCallback((newMessage: IMessage) => {
    setMessages((prevValue) => [...prevValue, { ...newMessage, datetime: new Date(newMessage.datetime) }]);
  }, []);

  React.useEffect(() => {
    socket?.on('receive_message', handleNewMessage);

    return () => {
      socket?.off('receive_message', handleNewMessage);
    };
  }, [handleNewMessage, socket]);

  const deleteMessage = React.useCallback((deletedMessage: IMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (deletedMessage.id === message.id) {
          return {
            ...deletedMessage,
            datetime: new Date(deletedMessage.datetime),
          };
        }
        return message;
      })
    );
  }, []);

  React.useEffect(() => {
    socket?.on('message_deleted', deleteMessage);

    return () => {
      socket?.off('message_deleted', deleteMessage);
    };
  });

  return (
    <MessagesContext.Provider value={{ messages, sendEditMessageSignal, sendDeleteMessageSignal }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => React.useContext(MessagesContext);
