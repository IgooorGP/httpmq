/**
 * Module with the logger constant used by the whole app.
 */
import winston from "winston";
import { APP_LOGGING_LEVEL } from "~/src/config/settings";

const winstonLogFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.json(),
  winston.format.prettyPrint()
);

export const logger = winston.createLogger({
  format: winstonLogFormat,
  transports: [new winston.transports.Console({ level: APP_LOGGING_LEVEL })],
});
