import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import { QueryPayload } from './types';
import { userRouter } from './routes';

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

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id} said ${message}`);
  });
});

server.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
