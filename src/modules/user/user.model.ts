import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.interface";

const UserSchema= new Schema<IUser> (

    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
        profileImage: { type: String },
    },
    { timestamps: true }
)

export const UserModel= mongoose.model<IUser>("User", UserSchema)