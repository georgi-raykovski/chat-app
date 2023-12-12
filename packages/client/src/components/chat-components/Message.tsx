import React from 'react';
import { IMessage } from './types';
import { useMessages, useUsername } from '../context';
import { ActionButtons, Button, MessageBody, MessageHeader, StyledMessage } from '../../styles';

interface IMessageProps extends IMessage {
  shouldOmitHeader: boolean;
  idx: number;
  zIdx?: number;
}

interface IEditState {
  isBeingEdited: boolean;
  hasBeenEdited: boolean;
}

const dataOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

export const Message = (props: IMessageProps) => {
  const {
    content,
    datetime,
    hasBeenEdited,
    idx,
    isDeleted: hasBeenDeleted,
    shouldOmitHeader,
    username,
    zIdx = 0,
  } = props;

  const { username: currentUser } = useUsername();
  const { editMessage, deleteMessage } = useMessages();

  const [isDeleted, setIsDeleted] = React.useState<boolean>(hasBeenDeleted);

  const initialEditState = React.useMemo(
    () => ({
      hasBeenEdited,
      isBeingEdited: false,
    }),
    [hasBeenEdited]
  );

  const [editState, setEditState] = React.useState<IEditState>(initialEditState);
  const [messageContent, setMessageContent] = React.useState<string>(content);

  const isFromCurrentUser = currentUser === username;
  const formattedDate = datetime.toLocaleTimeString(undefined, dataOptions);

  const onEditClickHandler = React.useCallback(() => {
    setEditState({
      hasBeenEdited: false,
      isBeingEdited: true,
    });
  }, []);

  const onDeleteClickHandler = React.useCallback(() => {
    deleteMessage(idx);
    setIsDeleted(true);
  }, [deleteMessage, idx]);

  const onChangeInputHandler = React.useCallback((value: string) => {
    setMessageContent(value);
  }, []);

  const onDiscardEditHandler = React.useCallback(() => {
    setMessageContent(content);
    setEditState(initialEditState);
  }, [content, initialEditState]);

  const onFinishEditHandler = React.useCallback(() => {
    editMessage(idx, messageContent);
    setEditState({
      hasBeenEdited: true,
      isBeingEdited: false,
    });
  }, [editMessage, idx, messageContent]);

  const shouldShowHeader = !shouldOmitHeader || editState.hasBeenEdited;

  React.useEffect(() => {
    setMessageContent(content);
  }, [content]);

  React.useEffect(() => {
    setIsDeleted(hasBeenDeleted);
  }, [hasBeenDeleted]);

  React.useEffect(() => {
    setEditState({
      isBeingEdited: false,
      hasBeenEdited,
    });
  }, [hasBeenEdited]);

  return (
    <StyledMessage $isFromCurrentUser={isFromCurrentUser} $shouldOmitHeader={shouldOmitHeader} $zIndex={zIdx}>
      {shouldShowHeader && (
        <MessageHeader>
          {username},{editState.hasBeenEdited && 'Edited at '}
          {formattedDate}
        </MessageHeader>
      )}
      <MessageBody>
        {isDeleted && <i>{messageContent}</i>}
        {!isDeleted && !editState.isBeingEdited && messageContent}
        {editState.isBeingEdited && !isDeleted && (
          <input type="text" value={messageContent} onChange={(e) => onChangeInputHandler(e.target.value)} />
        )}
        {!isDeleted && !editState.isBeingEdited && (
          <ActionButtons className="action-buttons">
            <Button type="button" onClick={onEditClickHandler}>
              Edit
            </Button>
            <Button type="button" onClick={onDeleteClickHandler}>
              Delete
            </Button>
          </ActionButtons>
        )}
        {editState.isBeingEdited && (
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
