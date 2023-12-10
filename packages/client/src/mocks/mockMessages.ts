import { IMessage } from '../components/chat-components';

export const mockMessages: IMessage[] = [
  {
    username: 'Georgi',
    datetime: new Date(),
    content: 'New message',
  },
  {
    username: 'Ivan',
    datetime: new Date(),
    content: 'New message 2',
  },
];
