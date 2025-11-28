import { Document } from 'mongoose';

export interface IUser extends Document {

    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    friends: string[];
    profileImage?: string;
    createdAt: Date;
    updatedAt: Date

}