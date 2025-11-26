import mongoose, { Schema } from "mongoose";
import { INotification } from "./notification.interface";

const NotificationSchema = new Schema<INotification>(
  {
    type: {
      type: String,
      enum: ["friend_request", "friend_request_accepted", "message", "group_invite"],
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    data: { type: Schema.Types.Mixed },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
