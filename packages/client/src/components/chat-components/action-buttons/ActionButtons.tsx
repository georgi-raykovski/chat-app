import React from 'react';
import { Button } from '../../../styles';
import { StyledActionButtons } from './ActionButtonsStyles';

interface IActionButtonsProps {
  hasBeenDeleted: boolean;
  isBeingEdited: boolean;
  isFromCurrentUser: boolean;
  onEditClickHandler: () => void;
  onDeleteClickHandler: () => void;
  onFinishEditHandler: () => void;
  onDiscardEditHandler: () => void;
}

export const ActionButtons = ({
  hasBeenDeleted,
  isBeingEdited,
  isFromCurrentUser,
  onDeleteClickHandler,
  onDiscardEditHandler,
  onEditClickHandler,
  onFinishEditHandler,
}: IActionButtonsProps) => {
  return (
    <>
      {!hasBeenDeleted && !isBeingEdited && isFromCurrentUser && (
        <StyledActionButtons className="action-buttons">
          <Button type="button" onClick={onEditClickHandler}>
            Edit
          </Button>
          <Button type="button" onClick={onDeleteClickHandler}>
            Delete
          </Button>
        </StyledActionButtons>
      )}
      {isBeingEdited && (
        <StyledActionButtons className="action-buttons">
          <Button type="button" onClick={onFinishEditHandler}>
            ✔︎
          </Button>
          <Button type="button" onClick={onDiscardEditHandler}>
            ✕
          </Button>
        </StyledActionButtons>
      )}
    </>
  );
};
