import express from 'express';
import { messages } from '../server';

export const messagesRouter = express.Router();

messagesRouter.get('/', (_req, res) => res.send(messages));
