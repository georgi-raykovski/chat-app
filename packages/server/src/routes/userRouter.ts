import express from 'express';
import { userController } from '../controllers';
import { usersData } from './users';

export const userRouter = express.Router();

const { login, getUserById } = userController;

userRouter.post('/login', login);

userRouter.get('/', (_req, res) => res.send(usersData));

userRouter.get('/:id', getUserById);
