import { reset } from 'react-style-reset';
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  ${reset}

  body {
    font-family: sans-serif;
    }
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.bodyBgColor};
  transition: background-color 0.5s ease;
`;
