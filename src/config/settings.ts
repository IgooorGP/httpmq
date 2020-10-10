/**
 * General settings require to set the app up.
 */
import { readEnvironment, readEnvironmentAsInt, readEnvironmentOrException } from "~/src/config/env";
import morganJson from "morgan-json";
import { ConnectionOptions } from "typeorm";

const APP_SERVER_BIND_PORT: number = readEnvironmentAsInt("APP_SERVER_BIND_PORT");
const APP_SERVER_BIND_HOST: string = readEnvironmentOrException("APP_SERVER_BIND_HOST");
const NODE_ENV: string = readEnvironment("NODE_ENV", "development");
const APP_LOGGING_LEVEL: string = readEnvironment("APP_LOGGING_LEVEL", "info");
const MORGAN_ACCESS_FORMAT: any = morganJson({
  "http-version": ":http-version",
  "remote-addr": ":remote-addr",
  "remote-user": ":remote-user",
  "http-method": ":method",
  "request-path": ":url",
  "status-code": ":status",
  "response-length": ":res[content-length]",
  "response-time": ":response-time ms",
  "user-agent": ":user-agent",
  "datetime": ":date[iso]",
});

const DATABASE: ConnectionOptions = {
  type: readEnvironmentOrException("DATABASE_ENGINE") as any, // must be "postgres" | "mysql" | ...
  host: readEnvironmentOrException("DATABASE_HOST"),
  port: readEnvironmentAsInt("DATABASE_PORT"),
  database: readEnvironmentOrException("DATABASE_NAME"),
  username: readEnvironmentOrException("DATABASE_USER"),
  password: readEnvironmentOrException("DATABASE_PASSWORD"),
};

export { APP_SERVER_BIND_HOST, APP_SERVER_BIND_PORT, NODE_ENV, APP_LOGGING_LEVEL, MORGAN_ACCESS_FORMAT, DATABASE };
