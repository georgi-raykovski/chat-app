import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import { messagesRouter, userRouter } from './routes';
import {
  ClientToServerEvents,
  ClientToServerEventsEnum,
  IMessage,
  ServerToClientEvents,
  ServerToClientEventsEnum,
} from '../../client';

const CLIENT_ORIGIN = 'http://localhost:3000';

const app = express();
const server = http.createServer(app);
const port = 3001;
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST', 'PUT'],
  },
});

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/messages', messagesRouter);

export const messages: IMessage[] = [];

const { CREATE_MESSAGE_EVENT, EDIT_MESSAGE_EVENT, DELETE_MESSAGE_EVENT } = ClientToServerEventsEnum;
const { MESSAGE_DELETED_EVENT, MESSAGE_EDITED_EVENT, RECEIVE_MESSAGE_EVENT } = ServerToClientEventsEnum;

io.on('connection', (socket) => {
  socket.on(CREATE_MESSAGE_EVENT, (message) => {
    messages.push(message);
    io.emit(RECEIVE_MESSAGE_EVENT, message);
  });

  socket.on(EDIT_MESSAGE_EVENT, (messageId, newContent) => {
    const editedMessageIndex = messages.findIndex((message) => message.id === messageId);
    const editedMessage = messages[editedMessageIndex];

    editedMessage.content = newContent;
    editedMessage.state.hasBeenEdited = true;
    editedMessage.datetime = new Date();

    io.emit(MESSAGE_EDITED_EVENT, { ...editedMessage });
  });

  socket.on(DELETE_MESSAGE_EVENT, (messageId) => {
    const deletedMessageIndex = messages.findIndex((message) => message.id === messageId);
    const deletedMessage = messages[deletedMessageIndex];

    deletedMessage.content = 'This message has been deleted.';
    deletedMessage.state.hasBeenDeleted = true;
    deletedMessage.datetime = new Date();

    io.emit(MESSAGE_DELETED_EVENT, { ...deletedMessage });
  });
});

server.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
