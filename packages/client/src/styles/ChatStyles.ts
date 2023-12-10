import styled from 'styled-components';

interface StyledMessageProps {
  isFromCurrentUser: boolean;
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
  padding: 16px 30px;
  color: #fff;

  h2 {
    align-self: center;
  }
`;

export const StyledMessage = styled.div<StyledMessageProps>`
  width: 80%;
  margin: 15px;
  align-self: ${(props) => (props.isFromCurrentUser ? 'start' : 'end')};
  h3 {
    text-align: ${(props) => (props.isFromCurrentUser ? 'left' : 'right')};
  }

  div {
    background-color: ${(props) => (props.isFromCurrentUser ? '#1a82fd' : '#888888')};
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
`;

export const MessageHeader = styled.h3`
  padding: 6px 0;
`;

export const StyledChatBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  max-height: 60%;
  overflow-y: scroll;
  margin-bottom: 30px;
  &::-webkit-scrollbar {
    width: 10px; /* Set the width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-corner {
    background-color: #555;
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
  padding: 20px 40px;
  position: relative;
  display: flex;
  flex: 1;
`
