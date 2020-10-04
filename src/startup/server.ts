import express, { Application } from "express";
import morgan from "morgan";
import { logger } from "~/src/logger";
import * as settings from "~/src/startup/settings";
import { helloRouterV1 } from "~/src/api/v1/controllers/hello";

/**
 * Setups routes, middlewares and other configurations required for the application server.
 *
 * @param {Application} app - express server application instance
 */
function setupServer(app: Application) {
  app.use(morgan(settings.MORGAN_ACCESS_FORMAT));
  app.use("/api/v1/greetings", helloRouterV1);
}

/**
 * Creates and setups a new express server instance.
 *
 * @returns {Application} - a new server instance to run the application
 */
function createServer(): Application {
  const server = express();

  setupServer(server);

  return server;
}

/**
 * Binds the server to the HOST and PORT specified on the settings file and starts listening for requests.
 *
 * @param {Application} app - express server instance
 */
function startServer(app: Application) {
  app.listen(settings.APP_SERVER_BIND_PORT, settings.APP_SERVER_BIND_HOST, () => {
    logger.info(
      `Started server on http://${settings.APP_SERVER_BIND_HOST}:${settings.APP_SERVER_BIND_PORT} with NODE_ENV: ${settings.NODE_ENV}`
    );
  });
}

export { createServer, startServer };
