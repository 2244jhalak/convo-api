import { Document, Types } from 'mongoose';

export interface INotification extends Document {
  type: 'friend_request' | 'friend_request_accepted' | 'message' | 'group_invite';
  user: Types.ObjectId;           // receiver
  data: {
    senderId?: Types.ObjectId;
    chatId?: Types.ObjectId;
    groupName?: string;
    message?: string;
  };
  read: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
