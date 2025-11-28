import { Router } from 'express';
import { getNotifications, markNotificationRead } from './notification.controller';
import { verifyToken } from '../../middleware/auth.middleware';
import { validateSchema } from '../../middleware/validate.middleware';
import { markReadSchema } from './notification.validation';

const notificationRouter = Router();

// Get all notifications
notificationRouter.get('/', verifyToken, getNotifications);

// Mark as read
notificationRouter.patch(
  '/read/:id',
  verifyToken,
  validateSchema({ params: markReadSchema }),
  markNotificationRead
);

export default notificationRouter;
