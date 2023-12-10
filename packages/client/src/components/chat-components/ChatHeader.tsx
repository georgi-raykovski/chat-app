import React from 'react';
import { FadedSpan, Bold, StyledChatHeader, Button } from '../../styles';
import { useUsername } from '../context';

interface IChatHeaderProps {
  onLogOutClick: () => void;
}

export const ChatHeader = ({ onLogOutClick }: IChatHeaderProps) => {
  const { username } = useUsername();

  return (
    <StyledChatHeader>
      <h2>
        <Bold>YearsChat</Bold>,<FadedSpan> logged in as {username} </FadedSpan>
      </h2>
      <Button onClick={onLogOutClick}>Log out</Button>
    </StyledChatHeader>
  );
};
