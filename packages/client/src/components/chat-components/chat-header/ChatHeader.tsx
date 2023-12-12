import React from 'react';
import { FadedSpan, Bold, Button, FlexContainer } from '../../../styles';
import { useUsername } from '../../context';
import { StyledChatHeader } from './ChatHeaderStyles';

interface IChatHeaderProps {
  onLogOutClick: () => void;
  switchTheme: () => void;
}

export const ChatHeader = ({ onLogOutClick, switchTheme }: IChatHeaderProps) => {
  const { username } = useUsername();

  return (
    <StyledChatHeader>
      <h2>
        <Bold>YearsChat</Bold>,<FadedSpan> logged in as {username} </FadedSpan>
      </h2>
      <FlexContainer className="chat-header">
        <Button onClick={switchTheme}>Switch Theme</Button>
        <Button onClick={onLogOutClick}>Log out</Button>
      </FlexContainer>
    </StyledChatHeader>
  );
};
