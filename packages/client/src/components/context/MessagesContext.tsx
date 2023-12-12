import React from 'react';
import { IMessage } from '../chat-components';

interface IMessagesContext {
  messages: IMessage[];
  createNewMessage: (newMessage: IMessage) => void;
  editMessage: (messageIndex: number, newContent: string) => void;
  startEditingMessage: (messageIndex: number) => void;
  stopEditingMessage: (messageIndex: number) => void;
  deleteMessage: (messageIndex: number) => void;
}

const defaultMessagesContextValue: IMessagesContext = {
  messages: [],
  createNewMessage: (newMessage) => {},
  editMessage: (messageIndex) => {},
  startEditingMessage: (messageIndex) => {},
  stopEditingMessage: (messageIndex) => {},
  deleteMessage: (messageIndex) => {},
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

  const editMessage = React.useCallback((messageIdx: number, newContent: string) => {
    setMessages((prevMessages: IMessage[]) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[messageIdx] = {
        ...updatedMessages[messageIdx],
        datetime: new Date(),
        content: newContent,
        state: {
          ...updatedMessages[messageIdx].state,
          hasBeenEdited: true,
          isBeingEdited: false,
        },
      };

      return updatedMessages;
    });
  }, []);

  const startEditingMessage = React.useCallback((messageIdx: number) => {
    setMessages((prevMessages: IMessage[]) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[messageIdx] = {
        ...updatedMessages[messageIdx],
        state: {
          ...updatedMessages[messageIdx].state,
          isBeingEdited: true,
        },
      };

      return updatedMessages;
    });
  }, []);

  const stopEditingMessage = React.useCallback((messageIdx: number) => {
    setMessages((prevMessages: IMessage[]) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[messageIdx] = {
        ...updatedMessages[messageIdx],
        state: {
          ...updatedMessages[messageIdx].state,
          isBeingEdited: false,
        },
      };

      return updatedMessages;
    });
  }, []);

  const deleteMessage = React.useCallback((messageIdx: number) => {
    setMessages((prevMessages: IMessage[]) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[messageIdx] = {
        ...updatedMessages[messageIdx],
        content: 'This message has been deleted.',
        state: {
          ...updatedMessages[messageIdx].state,
          hasBeenDeleted: true,
        },
      };

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
