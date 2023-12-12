import React from 'react';
import { IMessage } from './types';
import { Button, ChatMessageEditorContainer, TextBox } from '../../styles';
import { useUsername } from '../context';
import { useEnterPress } from '../../hooks';
import { useSocket } from '../context/SocketContext';

interface IChatMessageEditorProps {
  createNewMessage: (message: IMessage) => void;
  messagesLength: number;
}

export const ChatMessageEditor = ({ createNewMessage, messagesLength }: IChatMessageEditorProps) => {
  const socket = useSocket();
  const [textareaValue, setTextareaValue] = React.useState<string>('');
  const { username } = useUsername();

  const onChangeHandler = React.useCallback((value: string) => {
    setTextareaValue(value);
  }, []);

  const onClickHandler = React.useCallback(async () => {
    if (!textareaValue) return;

    const newMessage = {
      id: messagesLength + 1,
      content: textareaValue,
      datetime: new Date(),
      username,
      state: {
        hasBeenDeleted: false,
        hasBeenEdited: false,
        isBeingEdited: false,
      },
    };

    createNewMessage(newMessage);
    await socket?.emit('create_message', newMessage);

    setTextareaValue('');
  }, [createNewMessage, messagesLength, socket, textareaValue, username]);

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
