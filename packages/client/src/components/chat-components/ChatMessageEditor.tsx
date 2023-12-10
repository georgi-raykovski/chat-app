import React from 'react';
import { IMessage } from './types';
import { Button, ChatMessageEditorContainer, TextBox } from '../../styles';

interface IChatMessageEditorProps {
  createNewMessage: (message: IMessage) => void;
}

export const ChatMessageEditor = ({ createNewMessage }: IChatMessageEditorProps) => {
  return (
    <ChatMessageEditorContainer>
      <TextBox>
        <textarea placeholder="Type your message here..." />
      <Button className='editor-button'>Send</Button>
      </TextBox>

    </ChatMessageEditorContainer>
  );
};
