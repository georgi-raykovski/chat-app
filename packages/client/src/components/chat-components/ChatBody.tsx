import React from 'react';
import { Message } from './Message';
import { IMessage } from './types';
import { StyledChatBody } from '../../styles';

interface IChatBodyProps {
  messages: IMessage[];
}

export const ChatBody = ({ messages }: IChatBodyProps) => {
  return (
    <StyledChatBody>
      {messages.map((message) => (
        <Message key={Math.random()} {...message} />
      ))}
    </StyledChatBody>
  );
};
