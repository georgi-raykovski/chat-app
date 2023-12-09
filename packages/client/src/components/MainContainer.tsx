import React from 'react';
import { Container } from '../styles';

interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  return <Container>{children}</Container>;
};
