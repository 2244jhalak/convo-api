import { z } from "zod";

// Create chat validation
export const createChatSchema = z.object({
  members: z.array(z.string().length(24, "Valid user ID required")).min(2, "At least 2 members required"),
  isGroup: z.boolean(),
  groupName: z.string().optional(),
});

