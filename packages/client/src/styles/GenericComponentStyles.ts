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
  padding: 12px;
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
    left: 5%;
    top: 90%;
    z-index: 3;
  }

  &.editor-button {
    position: absolute;
    top: 95%;
    right: 1%;
    transform: translateY(-100%);
    padding: 8px 40px;
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

export const Bold = styled.b`
  font-weight: 600;
`

export const FadedSpan = styled.span`
  opacity: 0.8;
`

export const TextBox = styled.div`
  border: 1px solid green;
  padding: 10px;
  background-color: white;
  flex: 1;
  border-radius: 8px;
  position: relative;
  box-sizing: border-box;

  textarea {
    padding: 10px;
    border: none;
    outline: none;
    box-sizing: border-box;
    height: 80%;
    width: 100%;
    word-wrap: break-word;
    resize: none;
    white-space: pre-wrap;
    overflow: scroll;
  }
`;
