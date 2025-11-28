// app.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter} from '../modules/user/user.route';
import { globalErrorHandler } from '../middleware/error.middleware';
import { notFound } from '../middleware/notFound.middleware';
import { logger } from '../middleware/logger.middleware';
import friendRouter from '../modules/friend/friend.route';
import notificationRouter from '../modules/notification/notification.route';
import chatRouter from '../modules/chat/chat.route';
import messageRouter from '../modules/message/message.route';

const app: Application = express();

app.use(
  cors({
    origin: ['http://localhost:5173'], 
  })
);
app.use(express.json());
app.use(logger);
app.use('/api/auth', userRouter);
app.use('/api/request', friendRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/chat', chatRouter);
app.use('/api/messages', messageRouter);

app.get('/', (req: Request,res: Response) => {
    res.send('Express is running');
});

app.use(notFound);
app.use(globalErrorHandler);


export default app;




