import React from 'react';
import { Message } from './Message';
import { IMessage } from './types';
import { StyledChatBody } from '../../styles';
import { areDatesOneMinuteApart } from '../../utils/areDatesOneMinuteApart';

interface IChatBodyProps {
  messages: IMessage[];
}

const shouldOmitHeader = (firstMessage: IMessage, secondMessage: IMessage): boolean => {
  const fromSameUser = firstMessage.username === secondMessage.username;
  const areOneMinuteApart = areDatesOneMinuteApart(firstMessage.datetime, secondMessage.datetime);

  return (fromSameUser && !areOneMinuteApart);
};

export const ChatBody = ({ messages }: IChatBodyProps) => {
  return (
    <StyledChatBody>
      {messages.map((message, idx, messagesArray) => {
        const omitHeader = idx < 1 ? false : shouldOmitHeader(message, messagesArray[idx - 1]);
        // $hasOmittedHeader={index + 1 < messages.length && messages[index + 1].omittedHeader}

        return <Message key={Math.random()} {...message} omitHeader={omitHeader} />;
      })}
    </StyledChatBody>
  );
};
