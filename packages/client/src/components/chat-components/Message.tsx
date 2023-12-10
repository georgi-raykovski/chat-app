import React from 'react';
import { IMessage } from './types';
import { useUsername } from '../context';
import { ActionButtons, Button, MessageBody, MessageHeader, StyledMessage } from '../../styles';

interface IMessageProps extends IMessage {}

const dataOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

export const Message = ({ content, datetime, username }: IMessageProps) => {
  const { username: currentUser } = useUsername();
  const isFromCurrentUser = currentUser === username;

  return (
    <StyledMessage isFromCurrentUser={isFromCurrentUser}>
      <MessageHeader>
        {username}, {datetime.toLocaleTimeString(undefined, dataOptions)}
      </MessageHeader>
      <MessageBody>
        {content} {isFromCurrentUser && 'same user'}
      <ActionButtons className="action-buttons">
        <Button type='button'>Edit</Button>
        <Button type='button'>Delete</Button>
      </ActionButtons>
      </MessageBody>
    </StyledMessage>
  );
};
