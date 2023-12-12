import React from 'react';
import { IMessage } from '../chat-components';

interface IMessagesContext {
  messages: IMessage[];
  createNewMessage: (newMessage: IMessage) => void;
  editMessage: (messageIndex: number, newContent: string) => void;
  deleteMessage: (messageIndex: number) => void;
}

const defaultMessagesContextValue: IMessagesContext = {
  messages: [],
  createNewMessage: (newMessage) => {},
  editMessage: (messageIndex) => {},
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
        content: newContent,
        hasBeenEdited: true,
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
        isDeleted: true,
      };

      return updatedMessages;
    });
  }, []);

  return (
    <MessagesContext.Provider value={{ messages, createNewMessage, editMessage, deleteMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => React.useContext(MessagesContext);
