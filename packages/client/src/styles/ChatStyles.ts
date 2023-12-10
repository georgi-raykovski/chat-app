import styled from 'styled-components';

export const ChatContainer = styled.section`
  height: 100vh;
  color: ${({ theme }) => theme.textColor};
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
`
