import { Router } from "express";
import { verifyToken } from "../../middleware/auth.middleware";
import { validateSchema } from "../../middleware/validate.middleware";
import {
  idParamSchema,
  sendFriendRequestSchema,
} from "./friend.validation";

import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
} from "./friend.controller";

const friendRouter = Router();

// Send request
friendRouter.post(
  "/send",
  verifyToken,
  validateSchema({body: sendFriendRequestSchema}),
  sendFriendRequest
);

// Accept request
friendRouter.patch(
  "/accept/:id",
  verifyToken,
  validateSchema({params: idParamSchema}),
  acceptFriendRequest
);

// Reject request
friendRouter.patch(
  "/reject/:id",
  verifyToken,
  validateSchema({params: idParamSchema}),
  rejectFriendRequest
);

// Get all pending friend requests
friendRouter.get("/", verifyToken, getFriendRequests);

export default friendRouter;
