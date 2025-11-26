import { z } from "zod";

// Mark notification as read
export const markReadSchema = z.object({
  id: z.string().length(24, "Invalid Notification ID"),
});
