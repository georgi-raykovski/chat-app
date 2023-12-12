import React from 'react';
import { IMessage } from '../chat-components';

interface IMessagesContext {
  messages: IMessage[];
  createNewMessage: (newMessage: IMessage) => void;
  editMessage: (messageId: number, newContent: string) => void;
  startEditingMessage: (messageId: number) => void;
  stopEditingMessage: (messageId: number) => void;
  deleteMessage: (messageId: number) => void;
}

const defaultMessagesContextValue: IMessagesContext = {
  messages: [],
  createNewMessage: (newMessage) => {},
  editMessage: (messageId) => {},
  startEditingMessage: (messageId) => {},
  stopEditingMessage: (messageId) => {},
  deleteMessage: (messageId) => {},
};

const MessagesContext = React.createContext(defaultMessagesContextValue);

interface IMessagesProviderProps {
  children: React.ReactNode;
}

export const MessagesProvider = ({ children }: IMessagesProviderProps) => {
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const createNewMessage = React.useCallback((message: IMessage) => {
    setMessages((prevValue) => [...prevValue, message]);
  }, []);

  const editMessage = React.useCallback((messageId: number, newContent: string) => {
    setMessages((prevMessages: IMessage[]) => {
      const updatedMessages = prevMessages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              datetime: new Date(),
              content: newContent,
              state: {
                ...message.state,
                hasBeenEdited: true,
                isBeingEdited: false,
              },
            }
          : message
      );

      return updatedMessages;
    });
  }, []);

  const setEditingStateOfMessage = React.useCallback((messageId: number, state: boolean) => {
    setMessages((prevMessages: IMessage[]) => {
      const updatedMessages = prevMessages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              state: {
                ...message.state,
                isBeingEdited: state,
              },
            }
          : message
      );

      return updatedMessages;
    });
  }, []);

  const startEditingMessage = React.useCallback(
    (messageId: number) => {
      setEditingStateOfMessage(messageId, true);
    },
    [setEditingStateOfMessage]
  );

  const stopEditingMessage = React.useCallback(
    (messageId: number) => {
      setEditingStateOfMessage(messageId, false);
    },
    [setEditingStateOfMessage]
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

  return (
    <MessagesContext.Provider
      value={{ messages, createNewMessage, editMessage, startEditingMessage, stopEditingMessage, deleteMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => React.useContext(MessagesContext);
