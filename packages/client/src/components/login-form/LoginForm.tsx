import React from 'react';
import { Input, Button, FlexContainer } from '../../styles';
import { useEnterPress } from '../../hooks';
import { LoginFormContainer, LoginFormSection } from './LoginFormStyles';

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

  const onEnter = useEnterPress(onClickHandler);

  return (
    <LoginFormSection>
      <FlexContainer className="login-form">
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
