import React from 'react';
import { IMessage } from './types';
import { Button, ChatMessageEditorContainer, TextBox } from '../../styles';
import { useUsername } from '../context';

interface IChatMessageEditorProps {
  createNewMessage: (message: IMessage) => void;
}

export const ChatMessageEditor = ({ createNewMessage }: IChatMessageEditorProps) => {
  const [textareaValue, setTextareaValue] = React.useState<string>('');
  const { username } = useUsername();

  const onChangeHandler = React.useCallback((value: string) => {
    setTextareaValue(value);
  }, []);

  const onClickHandler = React.useCallback(() => {
    if (!textareaValue) return;

    createNewMessage({
      content: textareaValue,
      datetime: new Date(),
      username,
      isDeleted: false,
      hasBeenEdited: false,
    });

    setTextareaValue('');
  }, [createNewMessage, textareaValue, username]);

  const onEnter = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && e.shiftKey === false) {
        e.preventDefault();
        onClickHandler();
      }
    },
    [onClickHandler]
  );

  return (
    <ChatMessageEditorContainer>
      <TextBox>
        <textarea
          placeholder="Type your message here..."
          value={textareaValue}
          onChange={(e) => onChangeHandler(e.target.value)}
          onKeyDown={onEnter}
        />
        <Button className="editor-button" onClick={onClickHandler}>
          Send
        </Button>
      </TextBox>
    </ChatMessageEditorContainer>
  );
};
