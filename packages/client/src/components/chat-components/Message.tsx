import React from 'react';
import { IMessage } from './types';
import { useMessages, useUsername } from '../context';
import { ActionButtons, Button, MessageBody, MessageHeader, StyledMessage } from '../../styles';

interface IMessageProps extends IMessage {
  shouldOmitHeader: boolean;
  idx: number;
  zIdx?: number;
}

const dataOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

export const Message = (props: IMessageProps) => {
  const { content, datetime, idx, state, shouldOmitHeader, username, zIdx = 0 } = props;
  const { hasBeenDeleted, hasBeenEdited, isBeingEdited } = state;

  const { username: currentUser } = useUsername();
  const { editMessage, startEditingMessage, stopEditingMessage, deleteMessage } = useMessages();

  const [messageContent, setMessageContent] = React.useState(content);

  const isFromCurrentUser = currentUser === username;
  const formattedDate = datetime.toLocaleTimeString(undefined, dataOptions);

  const onEditClickHandler = React.useCallback(() => {
    startEditingMessage(idx);
  }, [idx, startEditingMessage]);

  const onDiscardEditHandler = React.useCallback(() => {
    stopEditingMessage(idx);
    setMessageContent(content)
  }, [content, idx, stopEditingMessage]);

  const onFinishEditHandler = React.useCallback(() => {
    if(!messageContent) return;

    editMessage(idx, messageContent);
  }, [editMessage, idx, messageContent]);

  const onDeleteClickHandler = React.useCallback(() => {
    deleteMessage(idx);
  }, [deleteMessage, idx]);

  const onChangeInputHandler = React.useCallback((value: string) => {
    setMessageContent(value);
  }, []);

  const shouldShowHeader = !shouldOmitHeader || hasBeenEdited;

  return (
    <StyledMessage $isFromCurrentUser={isFromCurrentUser} $shouldOmitHeader={shouldOmitHeader} $zIndex={zIdx}>
      {shouldShowHeader && (
        <MessageHeader>
          {username},{hasBeenEdited && !hasBeenDeleted && 'Edited at '}
          {formattedDate}
        </MessageHeader>
      )}
      <MessageBody>
        {hasBeenDeleted && <i>{content}</i>}
        {!hasBeenDeleted && !isBeingEdited && content}
        {isBeingEdited && !hasBeenDeleted && (
          <input type="text" value={messageContent} onChange={(e) => onChangeInputHandler(e.target.value)} />
        )}
        {!hasBeenDeleted && !isBeingEdited && (
          <ActionButtons className="action-buttons">
            <Button type="button" onClick={onEditClickHandler}>
              Edit
            </Button>
            <Button type="button" onClick={onDeleteClickHandler}>
              Delete
            </Button>
          </ActionButtons>
        )}
        {state.isBeingEdited && (
          <ActionButtons className="action-buttons">
            <Button type="button" onClick={onFinishEditHandler}>
              ✔︎
            </Button>
            <Button type="button" onClick={onDiscardEditHandler}>
              ✕
            </Button>
          </ActionButtons>
        )}
      </MessageBody>
    </StyledMessage>
  );
};
