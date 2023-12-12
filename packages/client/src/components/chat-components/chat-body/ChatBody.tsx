import React from 'react';
import { Message } from '..';
import { ChatBodyRefType, GetMessagePropReqsParams, GetMessagePropReqsReturnType, IMessage } from '../types';
import { areDatesOneMinuteApart } from '../../../utils';
import { StyledChatBody } from './ChatBodyStyles';

interface IChatBodyProps {
  messages: IMessage[];
  containerRef: React.MutableRefObject<ChatBodyRefType>;
}

const getMessagePropRequirements = ({
  firstMessage,
  secondMessage,
  isFirstMessage,
}: GetMessagePropReqsParams): GetMessagePropReqsReturnType => {
  if (isFirstMessage) {
    return {
      shouldOmitHeader: false,
      prevMessageIsOneMinuteApart: false,
      prevMessageIsFromAnotherUser: false,
    };
  }

  const fromSameUser = firstMessage.username === secondMessage.username;
  const areOneMinuteApart = areDatesOneMinuteApart(firstMessage.datetime, secondMessage.datetime);
  const prevMessageIsFromAnotherUser = firstMessage.username !== secondMessage.username;

  return {
    shouldOmitHeader: fromSameUser && !areOneMinuteApart,
    prevMessageIsOneMinuteApart: areOneMinuteApart,
    prevMessageIsFromAnotherUser,
  };
};

const messagesMapper = (message: IMessage, idx: number, messagesArray: IMessage[]): JSX.Element => {
  const isFirstMessage = idx < 1;
  const previousMessage = messagesArray[idx - 1];

  const { shouldOmitHeader, prevMessageIsOneMinuteApart, prevMessageIsFromAnotherUser } = getMessagePropRequirements({
    firstMessage: message,
    secondMessage: previousMessage,
    isFirstMessage,
  });
  const includeZIdx = isFirstMessage || shouldOmitHeader || prevMessageIsFromAnotherUser || prevMessageIsOneMinuteApart;

  const additionalProps = {
    shouldOmitHeader,
    ...(includeZIdx ? { zIdx: messagesArray.length - idx } : {}),
  };

  return <Message key={idx} {...message} {...additionalProps} />;
};

export const ChatBody = ({ messages, containerRef }: IChatBodyProps) => {
  const mappedMessages = messages.map(messagesMapper);

  return <StyledChatBody ref={containerRef}>{mappedMessages}</StyledChatBody>;
};
