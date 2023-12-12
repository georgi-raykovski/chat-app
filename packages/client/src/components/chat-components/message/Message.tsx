import React from 'react';
import { IMessage } from '../types';
import { useMessages, useUsername } from '../../context';
import { MessageBody, MessageHeader, StyledMessage } from './MessageStyles';
import { useEnterPress } from '../../../hooks';
import { MessageContent, ActionButtons } from '..';

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

  const [controlledContent, setControlledContent] = React.useState(content);
  const [isBeingEdited, setIsBeingEdited] = React.useState(false);

  const isFromCurrentUser = currentUser === username;
  const formattedDate = datetime.toLocaleTimeString(undefined, dataOptions);

  const onEditClickHandler = React.useCallback(() => {
    setIsBeingEdited(true);
  }, []);

  const onDiscardEditHandler = React.useCallback(() => {
    setIsBeingEdited(false);
    setControlledContent(content);
  }, [content]);

  const onFinishEditHandler = React.useCallback(() => {
    if (!controlledContent) return;
    if (controlledContent === content) {
      setIsBeingEdited(false);
      return;
    }

    sendEditMessageSignal(id, controlledContent);
    setIsBeingEdited(false);
  }, [content, sendEditMessageSignal, id, controlledContent]);

  const onEnter = useEnterPress(onFinishEditHandler);

  const onDeleteClickHandler = React.useCallback(() => {
    sendDeleteMessageSignal(id);
  }, [sendDeleteMessageSignal, id]);

  const onChangeInputHandler = React.useCallback((value: string) => {
    setControlledContent(value);
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
        <MessageContent
          controlledContent={controlledContent}
          hasBeenDeleted={hasBeenDeleted}
          initialContent={content}
          inputRef={inputRef}
          isBeingEdited={isBeingEdited}
          onChangeInputHandler={onChangeInputHandler}
          onEnter={onEnter}
        />
        <ActionButtons
          hasBeenDeleted={hasBeenDeleted}
          isBeingEdited={isBeingEdited}
          isFromCurrentUser={isFromCurrentUser}
          onDeleteClickHandler={onDeleteClickHandler}
          onDiscardEditHandler={onDiscardEditHandler}
          onEditClickHandler={onEditClickHandler}
          onFinishEditHandler={onFinishEditHandler}
        />
      </MessageBody>
    </StyledMessage>
  );
};
