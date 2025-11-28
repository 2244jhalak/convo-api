import { Document, Types } from 'mongoose';

export interface IMessage extends Document {
  chatId: Types.ObjectId;
  sender: Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
