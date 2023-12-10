import React from 'react';
import { IMessage } from './types';
import { useUsername } from '../context';

interface IMessageProps extends IMessage {
}

const dataOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

export const Message = ({ content, datetime, username }: IMessageProps) => {
  const { username: currentUser } = useUsername();
  const isFromCurrentUser = currentUser === username

  return (
    <div>
      <h3>
        {username}, {datetime.toLocaleTimeString(undefined, dataOptions)}
      </h3>
      {content} {isFromCurrentUser && 'same user'}
    </div>
  );
};
