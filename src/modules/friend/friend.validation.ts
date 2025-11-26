import { z } from "zod";

// ---------------------------------
// Friend Request creation (body)
export const sendFriendRequestSchema = z.object({
  receiverId: z.string().length(24, "Valid receiver ID required"),
});

// ---------------------------------
// Accept / Reject request (params)
export const idParamSchema = z.object({
  id: z.string().length(24, "Invalid MongoDB ObjectId"),
});
