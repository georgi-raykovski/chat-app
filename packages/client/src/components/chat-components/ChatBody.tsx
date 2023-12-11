import React from 'react';
import { Message } from './Message';
import { IMessage } from './types';
import { StyledChatBody } from '../../styles';
import { areDatesOneMinuteApart } from '../../utils';

interface IChatBodyProps {
  messages: IMessage[];
}

const shouldHeaderBeOmitted = (firstMessage: IMessage, secondMessage: IMessage): boolean => {
  const fromSameUser = firstMessage.username === secondMessage.username;
  const areOneMinuteApart = areDatesOneMinuteApart(firstMessage.datetime, secondMessage.datetime);

  return fromSameUser && !areOneMinuteApart;
};

const messagesMapper = (message: IMessage, idx: number, messagesArray: IMessage[]): JSX.Element => {
  const isFirstMessage = idx < 1;
  const shouldOmitHeader = isFirstMessage ? false : shouldHeaderBeOmitted(message, messagesArray[idx - 1]);
  const prevMessageIsFromAnotherUser = isFirstMessage ? false : message.username !== messagesArray[idx - 1].username;
  const includeZIdx = idx === 0 || shouldOmitHeader || prevMessageIsFromAnotherUser;

  const additionalProps = {
    shouldOmitHeader,
    ...(includeZIdx ? { zIdx: messagesArray.length - idx } : {}),
  };

  return <Message key={idx} {...message} {...additionalProps} />;
};

export const ChatBody = ({ messages }: IChatBodyProps) => {
  const mappedMessages = messages.map(messagesMapper);

  return <StyledChatBody>{mappedMessages}</StyledChatBody>;
};
