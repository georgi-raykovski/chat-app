import styled from 'styled-components';

export const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: ${({ theme }) => theme.input.border};
  transition: all 0.5s ease;
  background-color: ${({ theme }) => theme.input.bgColor};
  color: ${({ theme }) => theme.textColor};

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholderColor};
  }

  &:focus {
    outline: none;
    border-color: #ffa511;
    box-shadow: 0 0 5px rgba(255, 165, 17, 0.5);
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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e59400;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  &.toggle {
    position: absolute;
    padding: 12px;
    left: 5%;
    top: 90%;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 32px;
  max-width: max-content;
`;
