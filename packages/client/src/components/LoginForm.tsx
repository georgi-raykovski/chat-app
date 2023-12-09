import React from 'react';
import { LoginFormSection, LoginFormContainer, Input, Button, FlexContainer } from '../styles';

interface ILoginFormProps {
  loginClickHandler: (value: string) => void;
}

export const LoginForm = ({ loginClickHandler }: ILoginFormProps) => {
  const [inputValue, setInputValue] = React.useState<string>('');

  const onChangeInputHandler = (value: string) => {
    setInputValue(value);
  };

  const onClickHandler = React.useCallback(() => {
    loginClickHandler(inputValue);
  }, [inputValue, loginClickHandler]);

  return (
    <LoginFormSection>
      <FlexContainer>
        <LoginFormContainer>
          <h1 className="header">Welcome to YearsChat!</h1>
          <p>Please enter your name below and click "Log in"</p>
        </LoginFormContainer>
        <LoginFormContainer className="input">
          <Input
            type="text"
            id="username"
            onChange={(event) => onChangeInputHandler(event.target.value)}
            value={inputValue}
            placeholder="Name"
          />
          <Button type="button" onClick={onClickHandler}>
            Log in
          </Button>
        </LoginFormContainer>
      </FlexContainer>
    </LoginFormSection>
  );
};
