import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import { MessageModel } from './message.model';
import { io } from '../../app/server';

// Send message
export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { chatId, text } = req.body;
    const sender = req.userId;

    if (!chatId || !text) {
      return res.status(400).json({ message: 'chatId and text required' });
    }

    const message = await MessageModel.create({ chatId, sender, text });

    // Notify all members via socket
    io.to(chatId.toString()).emit('new_message', message);

    res.status(201).json(message);
  } catch (err) {
    console.error('sendMessage error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get messages by chat
export const getMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { chatId } = req.params;
    const messages = await MessageModel.find({ chatId }).populate('sender', 'name email');
    res.json(messages);
  } catch (err) {
    console.error('getMessages error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
