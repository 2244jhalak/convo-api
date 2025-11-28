import { Response } from 'express';
import { NotificationModel } from './notification.model';
import { AuthRequest } from '../../middleware/auth.middleware';
import { io, onlineUsers } from '../../app/server';
import { INotification } from './notification.interface';

// Get all notifications for logged-in user
export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const notifications = await NotificationModel.find({ user: userId })
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    console.error('getNotifications error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark notification as read
export const markNotificationRead = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const notification = await NotificationModel.findOne({ _id: id, user: userId });
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    notification.read = true;
    await notification.save();

    res.json(notification);
  } catch (err) {
    console.error('markNotificationRead error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send notification (friend request, accept, message, group invite)
export const sendNotification = async (
  type: INotification['type'],
  to: string,
  data: any
) => {
  const notification = await NotificationModel.create({ type, user: to, data });

  // Socket.io real-time push
  const socketId = onlineUsers.get(to);
  if (socketId) {
    io.to(socketId).emit('notification', notification);
  }

  return notification;
};
