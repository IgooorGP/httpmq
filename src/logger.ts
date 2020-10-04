/**
 * File with the logger class used by the application.
 */
import winston from "winston";
import { LOGGING_LEVEL } from "~/src/startup/settings";

const winstonLogFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.json(),
  winston.format.prettyPrint()
);

export const logger = winston.createLogger({
  format: winstonLogFormat,
  transports: [new winston.transports.Console({ level: LOGGING_LEVEL })],
});
