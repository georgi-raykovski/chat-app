import styled from 'styled-components';

export const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  transition: border-color 0.5s ease;

  &::placeholder {
    color: rgba(0, 0, 0, 0.7);
  }

  &:focus {
    outline: none;
    border-color: #ffa511; /* Adjust color to match your design */
    box-shadow: 0 0 5px rgba(255, 165, 17, 0.5); /* Optional: Add a subtle box-shadow */
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
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 32px;
  max-width: max-content;
`;
