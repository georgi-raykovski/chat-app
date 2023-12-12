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
    socket.broadcast.emit('receive_message', message);
  });

  socket.on('edit_message', (messageId: string, newContent) => {
    const editedMessageIndex = messages.findIndex((message) => message.id === parseInt(messageId));
    const editedMessage = messages[editedMessageIndex];

    editedMessage.content = newContent;
    editedMessage.state.hasBeenEdited = true;
    editedMessage.datetime = new Date();

    socket.broadcast.emit('message_has_been_edited', { ...editedMessage });
  });
});

server.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
