import { Request, Response } from "express";
import { ChatModel } from "./chat.model";
import { AuthRequest } from "../../middleware/auth.middleware";

// Create 1-to-1 or group chat
export const createChat = async (req: AuthRequest, res: Response) => {
  try {
    const { members, isGroup, groupName } = req.body;
    const createdBy = req.userId;

    if (!members || members.length < 2) {
      return res.status(400).json({ message: "At least 2 members required" });
    }

    if (isGroup && (!groupName || members.length < 3)) {
      return res.status(400).json({ message: "Group chat needs a name & 3 members" });
    }

    const chat = await ChatModel.create({ members, isGroup, groupName, createdBy });
    res.status(201).json(chat);
  } catch (err) {
    console.error("createChat error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all chats of a user
export const getChats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const chats = await ChatModel.find({ members: userId }).populate("members", "name email");
    res.json(chats);
  } catch (err) {
    console.error("getChats error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
