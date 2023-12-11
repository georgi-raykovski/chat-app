import React from 'react';
import { LoginFormSection, LoginFormContainer, Input, Button, FlexContainer } from '../styles';

interface ILoginFormProps {
  loginClickHandler: (value: string) => void;
  switchTheme: () => void;
}

export const LoginForm = ({ loginClickHandler, switchTheme }: ILoginFormProps) => {
  const [inputValue, setInputValue] = React.useState<string>('');

  const onChangeInputHandler = (value: string) => {
    setInputValue(value);
  };

  const onClickHandler = React.useCallback(() => {
    if (inputValue.trim() !== '') {
      loginClickHandler(inputValue);
    }
  }, [inputValue, loginClickHandler]);

  const onEnter = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && e.shiftKey === false) {
        e.preventDefault();
        onClickHandler();
      }
    },
    [onClickHandler]
  );

  return (
    <LoginFormSection>
      <FlexContainer>
        <LoginFormContainer>
          <h1 className="login-form__header">Welcome to YearsChat!</h1>
          <p>Please enter your name below and click "Log in"</p>
        </LoginFormContainer>
        <LoginFormContainer className="login-form__input-container">
          <Input
            type="text"
            id="username"
            onChange={(event) => onChangeInputHandler(event.target.value)}
            onKeyDown={onEnter}
            value={inputValue}
            placeholder="Name"
          />
          <Button type="button" onClick={onClickHandler}>
            Log in
          </Button>
        </LoginFormContainer>
      </FlexContainer>
      <Button className="toggle" onClick={switchTheme}>
        Switch Theme
      </Button>
    </LoginFormSection>
  );
};
