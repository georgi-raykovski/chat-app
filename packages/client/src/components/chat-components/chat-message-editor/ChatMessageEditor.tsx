import React from 'react';
import { Button, TextBox } from '../../../styles';
import { useMessages, useUsername } from '../../context';
import { useEnterPress } from '../../../hooks';
import { ChatMessageEditorContainer } from './ChatMessageEditorStyles';

interface IChatMessageEditorProps {
  messagesLength: number;
}

export const ChatMessageEditor = ({ messagesLength }: IChatMessageEditorProps) => {
  const [textareaValue, setTextareaValue] = React.useState<string>('');
  const { username } = useUsername();
  const { sendCreateMessageSignal } = useMessages();

  const onChangeHandler = React.useCallback((value: string) => {
    setTextareaValue(value);
  }, []);

  const onClickHandler = React.useCallback(async () => {
    if (!textareaValue) return;

    const newMessage = {
      id: (messagesLength + 1).toString(),
      content: textareaValue,
      datetime: new Date(),
      username,
      state: {
        hasBeenDeleted: false,
        hasBeenEdited: false,
      },
    };

    setTextareaValue('');
    await sendCreateMessageSignal(newMessage);
  }, [messagesLength, sendCreateMessageSignal, textareaValue, username]);

  const onEnter = useEnterPress(onClickHandler);

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
