import React from 'react';
import { Message } from './Message';
import { IMessage } from './types';

interface IChatBodyProps {
  messages: IMessage[];
}

export const ChatBody = ({ messages }: IChatBodyProps) => {
  return (
    <div>
      {messages.map((message) => (
        <Message key={Math.random()} {...message} />
      ))}
    </div>
  );
};
