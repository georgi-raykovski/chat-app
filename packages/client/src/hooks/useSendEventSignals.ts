import React from 'react';
import { ClientSocketType, ClientToServerEventsEnum } from '../utils';
import { IMessage } from '../components';

export const useSendEventSignals = (socket?: ClientSocketType) => {
  const sendEditMessageSignal = React.useCallback(
    async (messageId: string, newContent: string) => {
      try {
        await socket?.emit(ClientToServerEventsEnum.EDIT_MESSAGE_EVENT, messageId, newContent);
      } catch (e) {
        console.error(`Error sending ${ClientToServerEventsEnum.EDIT_MESSAGE_EVENT} signal:`, e);
      }
    },
    [socket]
  );

  const sendDeleteMessageSignal = React.useCallback(
    async (messageId: string) => {
      try {
        await socket?.emit(ClientToServerEventsEnum.DELETE_MESSAGE_EVENT, messageId);
      } catch (e) {
        console.error(`Error sending ${ClientToServerEventsEnum.DELETE_MESSAGE_EVENT} signal:`, e);
      }
    },
    [socket]
  );

  const sendCreateMessageSignal = React.useCallback(
    async (newMessage: IMessage) => {
      try {
        await socket?.emit(ClientToServerEventsEnum.CREATE_MESSAGE_EVENT, newMessage);
      } catch (e) {
        console.error(`Error sending ${ClientToServerEventsEnum.CREATE_MESSAGE_EVENT} signal:`, e);
      }
    },
    [socket]
  );

  return { sendCreateMessageSignal, sendDeleteMessageSignal, sendEditMessageSignal };
};
