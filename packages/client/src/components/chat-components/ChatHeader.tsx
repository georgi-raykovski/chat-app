import React from 'react';
import { FadedSpan, Bold, StyledChatHeader, Button } from '../../styles';

interface IChatHeaderProps {
  username: string;
  onLogOutClick: () => void;
}

export const ChatHeader = ({ username, onLogOutClick }: IChatHeaderProps) => {
  return (
    <StyledChatHeader>
      <h2>
        <Bold>YearsChat</Bold>,<FadedSpan> logged in as {username} </FadedSpan>
      </h2>
      <Button onClick={onLogOutClick}>Log out</Button>
    </StyledChatHeader>
  );
};
 