import { Router } from "express";
import { sendMessage, getMessages } from "./message.controller";
import { verifyToken } from "../../middleware/auth.middleware";
import { validateSchema } from "../../middleware/validate.middleware";
import { getMessageSchema, sendMessageSchema } from "./message.validation";

const messageRouter = Router();

messageRouter.post("/", verifyToken,validateSchema({body: sendMessageSchema}), sendMessage);
messageRouter.get("/:chatId", verifyToken,validateSchema({params: getMessageSchema}), getMessages);

export default messageRouter;
