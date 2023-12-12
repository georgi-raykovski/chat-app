import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import { messagesRouter, userRouter } from './routes';
import { IMessage } from '../../client';

const app = express();
const server = http.createServer(app);
const port = 3001;
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/messages', messagesRouter);

export const messages: IMessage[] = [];

io.on('connection', (socket) => {
  socket.on('create_message', (message: IMessage) => {
    messages.push(message);
    io.emit('receive_message', message);
  });

  socket.on('edit_message', (messageId: string, newContent: string) => {
    const editedMessageIndex = messages.findIndex((message) => message.id === parseInt(messageId));
    const editedMessage = messages[editedMessageIndex];

    editedMessage.content = newContent;
    editedMessage.state.hasBeenEdited = true;
    editedMessage.datetime = new Date();

    io.emit('message_edited', { ...editedMessage });
  });

  socket.on('delete_message', (messageId: string) => {
    const deletedMessageIndex = messages.findIndex((message) => message.id === parseInt(messageId));
    const deletedMessage = messages[deletedMessageIndex];

    deletedMessage.content = 'This message has been deleted.';
    deletedMessage.state.hasBeenDeleted = true;
    deletedMessage.datetime = new Date();

    io.emit('message_deleted', { ...deletedMessage });
  });
});

server.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
