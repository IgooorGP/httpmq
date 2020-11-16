import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { QueueException } from "~/src/core/services/exceptions/services";

/**
 * Default handler for formatting friendly error responses.
 */
function errorHandlerMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof ZodError) {
    res.status(400).json({ message: "Sorry, but that's a bad request!", errors: error });
  } else if (error instanceof QueueException) {
    res.status(400).json({ message: error.message });
  } else {
    res.status(500).json({ message: "Ops... you caught the server off-guard! Try again later, please!" });
  }
}

export { errorHandlerMiddleware };
