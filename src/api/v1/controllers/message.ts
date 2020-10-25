/**
 * Routes for exposing messaging use cases of the application.
 */
import { Request, Response, Router } from "express";
import { sendMessageToDestination } from "~/src/core/usecases";
import { logger } from "~/src/infra/logger";

const messagingRouterV1 = Router();

function postNewMessage(req: Request, res: Response) {
  const newMessageRequestDto = req.body;
  logger.info(`Received new message creation dto: ${newMessageRequestDto}`);

  sendMessageToDestination(newMessageRequestDto);
  return res.status(201).json({ message: "Message has been successfully posted!" });
}

messagingRouterV1.post("/message", postNewMessage);

export { messagingRouterV1 };
