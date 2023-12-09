import { reset } from 'react-style-reset';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  ${reset}

  div.App {
    font-family: sans-serif;
    background-color: #e5f7e4;
  }
`;
