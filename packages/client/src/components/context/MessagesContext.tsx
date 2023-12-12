import React from 'react';
import { IMessage } from '../chat-components';
import { IProviderProps } from './types';
import { useSocket } from './SocketContext';
import { ServerToClientEventsEnum } from '../../utils';
import { useSendEventSignals } from '../../hooks';

interface IMessagesContext {
  messages: IMessage[];
  sendCreateMessageSignal: (newMessage: IMessage) => void;
  sendEditMessageSignal: (messageId: string, newContent: string) => void;
  sendDeleteMessageSignal: (messageId: string) => void;
}

const defaultMessagesContextValue: IMessagesContext = {
  messages: [],
  sendCreateMessageSignal(newMessage) {},
  sendEditMessageSignal: (messageId) => {},
  sendDeleteMessageSignal: (messageId) => {},
};

const MessagesContext = React.createContext(defaultMessagesContextValue);

export const MessagesProvider = ({ children }: IProviderProps) => {
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const socket = useSocket();

  const { sendCreateMessageSignal, sendDeleteMessageSignal, sendEditMessageSignal } = useSendEventSignals(socket);

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
    socket?.on(ServerToClientEventsEnum.MESSAGE_EDITED_EVENT, editMessage);

    return () => {
      socket?.off(ServerToClientEventsEnum.MESSAGE_EDITED_EVENT, editMessage);
    };
  }, [editMessage, socket]);

  const handleNewMessage = React.useCallback((newMessage: IMessage) => {
    setMessages((prevValue) => [...prevValue, { ...newMessage, datetime: new Date(newMessage.datetime) }]);
  }, []);

  React.useEffect(() => {
    socket?.on(ServerToClientEventsEnum.RECEIVE_MESSAGE_EVENT, handleNewMessage);

    return () => {
      socket?.off(ServerToClientEventsEnum.RECEIVE_MESSAGE_EVENT, handleNewMessage);
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
    socket?.on(ServerToClientEventsEnum.MESSAGE_DELETED_EVENT, deleteMessage);

    return () => {
      socket?.off(ServerToClientEventsEnum.MESSAGE_DELETED_EVENT, deleteMessage);
    };
  }, [deleteMessage, socket]);

  return (
    <MessagesContext.Provider
      value={{ messages, sendCreateMessageSignal, sendEditMessageSignal, sendDeleteMessageSignal }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => React.useContext(MessagesContext);
