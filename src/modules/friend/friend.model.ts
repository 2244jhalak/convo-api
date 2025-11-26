import mongoose, { Schema } from "mongoose";
import { IFriendRequest } from "./friend.interface";

const FriendSchema = new Schema<IFriendRequest> (

    {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }

)

export const FriendModel= mongoose.model<IFriendRequest>("FriendRequest", FriendSchema)