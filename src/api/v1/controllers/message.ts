/**
 * Routes for exposing messaging use cases of the application.
 */
import { Request, Response, Router } from "express";
import { NewMessageDtoSchema } from "~/src/core/bondaries/schemas/new-message";
import { sendMessageToDestination } from "~/src/core/services/messaging";
import { logger } from "~/src/infra/logger";

const messagingRouterV1 = Router();

const postNewMessage = async (req: Request, res: Response) => {
  logger.info(`Received new message creation dto: ${req.body}`);
  const newMessageDto = await NewMessageDtoSchema.parseAsync(req.body);

  await sendMessageToDestination(newMessageDto);
  return res.status(201).json({ message: "Message has been successfully posted!" });
};

messagingRouterV1.post("/message", postNewMessage);

export { messagingRouterV1 };
