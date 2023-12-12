import styled from 'styled-components';

export const ChatContainer = styled.section`
  height: 100vh;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  flex-direction: column;
`;
