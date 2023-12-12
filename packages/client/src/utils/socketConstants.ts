import { Socket } from 'socket.io-client';
import { IMessage } from '../components';

export type ClientSocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

export enum ServerToClientEventsEnum {
  RECEIVE_MESSAGE_EVENT = 'receive_message',
  MESSAGE_EDITED_EVENT = 'message_edited',
  MESSAGE_DELETED_EVENT = 'message_deleted',
}

export enum ClientToServerEventsEnum {
  CREATE_MESSAGE_EVENT = 'create_message',
  EDIT_MESSAGE_EVENT = 'edit_message',
  DELETE_MESSAGE_EVENT = 'delete_message',
}

export interface ServerToClientEvents {
  [ServerToClientEventsEnum.MESSAGE_DELETED_EVENT]: (deletedMessage: IMessage) => void;
  [ServerToClientEventsEnum.MESSAGE_EDITED_EVENT]: (editedMesage: IMessage) => void;
  [ServerToClientEventsEnum.RECEIVE_MESSAGE_EVENT]: (newMessage: IMessage) => void;
}

export interface ClientToServerEvents {
  [ClientToServerEventsEnum.CREATE_MESSAGE_EVENT]: (message: IMessage) => void;
  [ClientToServerEventsEnum.EDIT_MESSAGE_EVENT]: (messageId: string, newContent: string) => void;
  [ClientToServerEventsEnum.DELETE_MESSAGE_EVENT]: (messageId: string) => void;
}
