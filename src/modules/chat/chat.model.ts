import mongoose, { Schema } from 'mongoose';
import { IChat } from './chat.interface';

const ChatSchema = new Schema<IChat>(
  {
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    isGroup: { type: Boolean, default: false },
    groupName: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const ChatModel = mongoose.model<IChat>('Chat', ChatSchema);
