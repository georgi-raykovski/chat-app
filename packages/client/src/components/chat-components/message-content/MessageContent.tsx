import React from 'react';
import { EditMessageInput } from './MessageContentStyles';

interface IMessageContentProps {
  hasBeenDeleted: boolean;
  initialContent: string;
  isBeingEdited: boolean;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  controlledContent: string;
  onEnter: React.KeyboardEventHandler<HTMLInputElement>;
  onChangeInputHandler: (value: string) => void;
}

export const MessageContent = ({
  hasBeenDeleted,
  controlledContent,
  initialContent,
  inputRef,
  isBeingEdited,
  onChangeInputHandler,
  onEnter,
}: IMessageContentProps) => {
  return (
    <>
      {hasBeenDeleted && <i>{initialContent}</i>}
      {!hasBeenDeleted && !isBeingEdited && initialContent}
      {isBeingEdited && !hasBeenDeleted && (
        <EditMessageInput
          ref={inputRef}
          type="text"
          value={controlledContent}
          onKeyDown={onEnter}
          onChange={(e) => onChangeInputHandler(e.target.value)}
        />
      )}
    </>
  );
};
