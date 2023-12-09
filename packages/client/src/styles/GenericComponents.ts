import styled from 'styled-components';

export const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;
export const Button = styled.button`
  font-size: 1rem;
  padding: 12px 0;
  background-color: #ffa511;
  border-radius: 8px;
  border-width: 0;
  color: #fff;
  cursor: pointer;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 32px;
  max-width: max-content;
`;
