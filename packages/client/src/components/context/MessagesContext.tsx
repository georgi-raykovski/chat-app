import React from 'react';
import { IMessage } from '../chat-components';
import { IProviderProps } from './types';
import { useSocket } from './SocketContext';

interface IMessagesContext {
  messages: IMessage[];
  createNewMessage: (newMessage: IMessage) => void;
  sendEditMessageSignal: (messageId: number, newContent: string) => void;
  deleteMessage: (messageId: number) => void;
}

const defaultMessagesContextValue: IMessagesContext = {
  messages: [],
  createNewMessage: (newMessage) => {},
  sendEditMessageSignal: (messageId) => {},
  deleteMessage: (messageId) => {},
};

const MessagesContext = React.createContext(defaultMessagesContextValue);

export const MessagesProvider = ({ children }: IProviderProps) => {
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const socket = useSocket();

  const createNewMessage = React.useCallback((message: IMessage) => {
    setMessages((prevValue) => [...prevValue, message]);
  }, []);

  const sendEditMessageSignal = React.useCallback(
    async (messageId: number, newContent: string) => {
      await socket?.emit('edit_message', messageId, newContent);
    },
    [socket]
  );

  const deleteMessage = React.useCallback((messageId: number) => {
    setMessages((prevMessages: IMessage[]) => {
      const updatedMessages = prevMessages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              datetime: new Date(),
              content: 'This message has been deleted.',
              state: {
                ...message.state,
                hasBeenDeleted: true,
              },
            }
          : message
      );

      return updatedMessages;
    });
  }, []);

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
        console.log(message, editedMessage);

        if (editedMessage.id === message.id) {
          console.log('hello');

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
    socket?.on('message_has_been_edited', editMessage);

    return () => {
      socket?.off('message_has_been_edited', editMessage);
    };
  }, [editMessage, socket]);

  return (
    <MessagesContext.Provider value={{ messages, createNewMessage, sendEditMessageSignal, deleteMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => React.useContext(MessagesContext);
