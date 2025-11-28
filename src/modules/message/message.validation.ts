import { z } from 'zod';

// Send message validation
export const sendMessageSchema = z.object({
  chatId: z.string().length(24, 'Valid chat ID required'),
  text: z.string().min(1, 'Message cannot be empty'),
});

// Get message validation
export const getMessageSchema = z.object({
  chatId: z.string().length(24, 'Valid chat ID required'),
});