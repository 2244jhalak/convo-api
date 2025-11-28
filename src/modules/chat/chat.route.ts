import { Router } from 'express';
import { createChat, getChats } from './chat.controller';
import { verifyToken } from '../../middleware/auth.middleware';
import { validateSchema } from '../../middleware/validate.middleware';
import { createChatSchema } from './chat.validation';

const chatRouter = Router();

chatRouter.post('/', verifyToken,validateSchema({body: createChatSchema}), createChat);
chatRouter.get('/', verifyToken, getChats);

export default chatRouter;
