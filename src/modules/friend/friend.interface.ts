import { Document } from "mongoose";
import { IUser } from "../user/user.interface";

export interface IFriendRequest extends Document { 

    sender: string | IUser ;
    receiver: string  | IUser ;
    status: "pending" | "accepted" | "rejected";
    createdAt: Date;
    updatedAt: Date;

}