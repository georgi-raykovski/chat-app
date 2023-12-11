import React from 'react';
import { IMessage } from './types';
import { useUsername } from '../context';
import { ActionButtons, Button, MessageBody, MessageHeader, StyledMessage } from '../../styles';

interface IMessageProps extends IMessage {
  shouldOmitHeader: boolean;
  zIdx?: number;
}

const dataOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

export const Message = ({ content, datetime, username, shouldOmitHeader, zIdx = 0 }: IMessageProps) => {
  const { username: currentUser } = useUsername();
  const isFromCurrentUser = currentUser === username;
  const formattedDate = datetime.toLocaleTimeString(undefined, dataOptions);

  return (
    <StyledMessage $isFromCurrentUser={isFromCurrentUser} $shouldOmitHeader={shouldOmitHeader} $zIndex={zIdx}>
      {!shouldOmitHeader && (
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
