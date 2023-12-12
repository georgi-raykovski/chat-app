import styled from 'styled-components';

interface StyledMessageProps {
  $isFromCurrentUser: boolean;
  $shouldOmitHeader: boolean;
  $zIndex: number;
  $isBeingEdited: boolean;
}

export const StyledMessage = styled.div<StyledMessageProps>`
  ${(props) => (props.$zIndex ? `z-index: ${props.$zIndex};` : '')}
  width: 80%;
  padding-top: ${(props) => (props.$shouldOmitHeader ? '4px' : '8px')};
  align-self: ${(props) => (props.$isFromCurrentUser ? 'start' : 'end')};
  h3 {
    text-align: ${(props) => (props.$isFromCurrentUser ? 'left' : 'right')};
  }

  div {
    background-color: ${({ $isBeingEdited, $isFromCurrentUser }) => {
      if ($isBeingEdited) return '#1a8ec1';
      return $isFromCurrentUser ? '#1a82fd' : '#888888';
    }};

    text-align: ${({ $isFromCurrentUser }) => ($isFromCurrentUser ? 'left' : 'right')};
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
//
export const MessageHeader = styled.h3`
  padding: 6px 0;
`;
