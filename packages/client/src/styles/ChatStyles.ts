import styled from 'styled-components';

interface StyledMessageProps {
  $isFromCurrentUser: boolean;
  $shouldOmitHeader: boolean;
  $zIndex: number;
}

export const ChatContainer = styled.section`
  height: 100vh;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  flex-direction: column;
`;

export const StyledChatHeader = styled.div`
  background-color: #ffa511;
  display: flex;
  justify-content: space-between;
  padding: 8px 15px;
  color: #fff;

  h2 {
    align-self: center;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 400px) {
    padding: 16px 30px;
  }
`;

export const StyledMessage = styled.div<StyledMessageProps>`
  ${(props) => (props.$zIndex ? `z-index: ${props.$zIndex};` : '')}
  width: 80%;
  padding-top: ${(props) => (props.$shouldOmitHeader ? '4px' : '8px')};
  align-self: ${(props) => (props.$isFromCurrentUser ? 'start' : 'end')};
  h3 {
    text-align: ${(props) => (props.$isFromCurrentUser ? 'left' : 'right')};
  }

  div {
    background-color: ${(props) => (props.$isFromCurrentUser ? '#1a82fd' : '#888888')};
  }

  @media (min-width: 400px) {
    padding-top: ${(props) => (props.$shouldOmitHeader ? '8px' : '16px')};
  }
`;

export const MessageBody = styled.div`
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  position: relative;
  z-index: 0;

  &:hover {
    .action-buttons {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }
  }

  i { 
    font-style: italic;
  }
`;

export const MessageHeader = styled.h3`
  padding: 6px 0;
`;

export const StyledChatBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 60%;
  overflow-y: auto;
  margin-bottom: 30px;

  &::-webkit-scrollbar {
    width: 10px; /* Set the width of the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-corner {
    background-color: #555;
  }

  @media (min-width: 400px) {
    padding: 0px 40px;
  }
`;

export const ActionButtons = styled.div`
  position: absolute;
  top: 100%;
  left: 15%;
  transform: translate(0%, -20%);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none; /* Disable pointer events when hidden */
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  z-index: 2;

  button {
    margin: 0 5px;
    padding: 5px 10px;
  }
`;

export const ChatMessageEditorContainer = styled.div`
  padding: 10px 20px;
  position: relative;
  display: flex;
  flex: 1;

  @media (min-width: 400px) {
    padding: 20px 40px;
  }
`;
