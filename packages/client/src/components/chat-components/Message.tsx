import React from 'react';
import { IMessage } from './types';
import { useMessages, useUsername } from '../context';
import { ActionButtons, Button, EditMessageInput, MessageBody, MessageHeader, StyledMessage } from '../../styles';
import { useEnterPress } from '../../hooks';

interface IMessageProps extends IMessage {
  shouldOmitHeader: boolean;
  zIdx?: number;
}

const dataOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

export const Message = (props: IMessageProps) => {
  const { id, content, datetime, state, shouldOmitHeader, username, zIdx = 0 } = props;
  const { hasBeenDeleted, hasBeenEdited } = state;
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const { username: currentUser } = useUsername();
  const { sendEditMessageSignal, sendDeleteMessageSignal } = useMessages();

  const [messageContent, setMessageContent] = React.useState(content);
  const [isBeingEdited, setIsBeingEdited] = React.useState(false);

  const isFromCurrentUser = currentUser === username;
  const formattedDate = datetime.toLocaleTimeString(undefined, dataOptions);

  const onEditClickHandler = React.useCallback(() => {
    setIsBeingEdited(true);
  }, []);

  const onDiscardEditHandler = React.useCallback(() => {
    setIsBeingEdited(false);
    setMessageContent(content);
  }, [content]);

  const onFinishEditHandler = React.useCallback(() => {
    if (!messageContent) return;
    if (messageContent === content) {
      setIsBeingEdited(false);
      return;
    }

    sendEditMessageSignal(id, messageContent);
    setIsBeingEdited(false);
  }, [content, sendEditMessageSignal, id, messageContent]);

  const onEnter = useEnterPress(onFinishEditHandler);

  const onDeleteClickHandler = React.useCallback(() => {
    sendDeleteMessageSignal(id);
  }, [sendDeleteMessageSignal, id]);

  const onChangeInputHandler = React.useCallback((value: string) => {
    setMessageContent(value);
  }, []);

  React.useEffect(() => {
    if (isBeingEdited && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isBeingEdited]);

  const shouldShowHeader = !shouldOmitHeader || hasBeenEdited;

  return (
    <StyledMessage
      $isFromCurrentUser={isFromCurrentUser}
      $shouldOmitHeader={shouldOmitHeader}
      $zIndex={zIdx}
      $isBeingEdited={isBeingEdited}>
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
          <EditMessageInput
            ref={inputRef}
            type="text"
            value={messageContent}
            onKeyDown={onEnter}
            onChange={(e) => onChangeInputHandler(e.target.value)}
          />
        )}
        {!hasBeenDeleted && !isBeingEdited && isFromCurrentUser && (
          <ActionButtons className="action-buttons">
            <Button type="button" onClick={onEditClickHandler}>
              Edit
            </Button>
            <Button type="button" onClick={onDeleteClickHandler}>
              Delete
            </Button>
          </ActionButtons>
        )}
        {isBeingEdited && (
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
