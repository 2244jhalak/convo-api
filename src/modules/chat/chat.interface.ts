import { Document, Types } from 'mongoose';

export interface IChat extends Document {
  members: Types.ObjectId[];
  isGroup: boolean;
  groupName?: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
