import { IMessage } from '../components/chat-components';

export const mockMessages: IMessage[] = [
  {
    id: '1',
    username: 'Georgi',
    datetime: new Date(),
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap ",
    state: {
      hasBeenDeleted: false,
      hasBeenEdited: false,
    },
  },
];
