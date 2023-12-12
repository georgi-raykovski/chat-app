import styled from 'styled-components';

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
