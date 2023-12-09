import styled from 'styled-components';

export const LoginFormSection = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.25rem;

  .header {
    text-align: center;
  }
`;

export const LoginFormContainer = styled.div`
  &.input {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 40px;
    box-sizing: border-box;
    width: 100%;
  }
`;
