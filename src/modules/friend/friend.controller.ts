import { Response } from "express";
import { FriendModel } from "./friend.model";
import { UserModel } from "../user/user.model";
import { io, onlineUsers } from "../../app/server";
import { AuthRequest } from "../../middleware/auth.middleware";

// SEND FRIEND REQUEST
export const sendFriendRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.userId;

    if (!senderId) return res.status(401).json({ message: "Unauthorized" });

    if (receiverId === senderId)
      return res.status(400).json({ message: "Cannot send request to yourself" });

    const exists = await FriendModel.findOne({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    if (exists)
      return res.status(400).json({ message: "Request already sent" });

    const request = await FriendModel.create({
      sender: senderId,
      receiver: receiverId,
    });

    // SOCKET → send notification to receiver
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("notification", {
        type: "friend_request",
        from: senderId,
        requestId: request._id,
      });
    }

    res.status(201).json(request);
  } catch (err) {
    console.error("sendFriendRequest error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const acceptFriendRequest = async (req: AuthRequest, res: Response) => {
  try {
    const requestId = req.params.id;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const request = await FriendModel.findOne({
      _id: requestId,
      receiver: userId,
      status: "pending",
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "accepted";
    await request.save();

    await UserModel.findByIdAndUpdate(request.sender, {
      $addToSet: { friends: userId },
    });
    await UserModel.findByIdAndUpdate(userId, {
      $addToSet: { friends: request.sender },
    });

    // SOCKET → notify sender that request was accepted
    const senderSocketId = onlineUsers.get(request.sender.toString());
    if (senderSocketId) {
      io.to(senderSocketId).emit("notification", {
        type: "friend_request_accepted",
        from: userId,
        requestId,
      });
    }

    res.json(request);
  } catch (err) {
    console.error("acceptFriendRequest error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



export const rejectFriendRequest = async (req: AuthRequest, res: Response) => {
  try {
    const requestId = req.params.id;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const request = await FriendModel.findOne({
      _id: requestId,
      receiver: userId,
      status: "pending",
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "rejected";
    await request.save();

    // SOCKET → notify sender that request was rejected
    const senderSocketId = onlineUsers.get(request.sender.toString());
    if (senderSocketId) {
      io.to(senderSocketId).emit("notification", {
        type: "friend_request_rejected",
        from: userId,
        requestId,
      });
    }

    res.json(request);
  } catch (err) {
    console.error("rejectFriendRequest error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getFriendRequests = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const requests = await FriendModel.find({
      receiver: userId,
      status: "pending",
    }).populate("sender", "name email");

    res.json(requests);
  } catch (err) {
    console.error("getFriendRequests error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

