import React from 'react';
import { IMessage } from './types';

interface IChatMessageEditorProps {
  createNewMessage: (message: IMessage) => void;
}

export const ChatMessageEditor = ({ createNewMessage }: IChatMessageEditorProps) => {
  return <div>Message Editor</div>;
};
