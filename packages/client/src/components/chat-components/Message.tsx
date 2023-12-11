import React from 'react';
import { IMessage } from './types';
import { useUsername } from '../context';
import { ActionButtons, Button, MessageBody, MessageHeader, StyledMessage } from '../../styles';

interface IMessageProps extends IMessage {
  omitHeader?: boolean;
}

const dataOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

export const Message = ({ content, datetime, username, omitHeader = false }: IMessageProps) => {
  const { username: currentUser } = useUsername();
  const isFromCurrentUser = currentUser === username;
  const formattedDate = datetime.toLocaleTimeString(undefined, dataOptions);

  return (
    <StyledMessage $isFromCurrentUser={isFromCurrentUser} $omittedHeader={omitHeader}>
      {!omitHeader && (
        <MessageHeader>
          {username}, {formattedDate}
        </MessageHeader>
      )}
      <MessageBody>
        {content}
        <ActionButtons className="action-buttons">
          <Button type="button">Edit</Button>
          <Button type="button">Delete</Button>
        </ActionButtons>
      </MessageBody>
    </StyledMessage>
  );
};
