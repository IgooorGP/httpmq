import express, { Application } from "express";
import { Server } from "http";
import morgan from "morgan";
import { createConnection } from "typeorm";
import { helloRouterV1 } from "~/src/api/v1/controllers/hello";
import * as settings from "~/src/config/settings";
import { logger } from "~/src/infra/logger";

/**
 * Setups routes, middlewares and other configurations required for the app server.
 *
 * @param {Application} app - express server app instance
 */
async function setupServer(app: Application) {
  logger.debug("[STARTUP]: Configuring Morgan's access log...");
  app.use(morgan(settings.MORGAN_ACCESS_FORMAT));

  logger.debug("[STARTUP]: Starting database connection with env variables...");
  await createConnection(settings.DATABASE);

  logger.debug("[STARTUP]: Configuring routes...");
  app.use("/api/v1/greetings", helloRouterV1);
}

/**
 * Creates and setups a new express server instance.
 *
 * @returns {Application} - a new server instance to run the app
 */
async function createServer(): Promise<Application> {
  const server = express();

  await setupServer(server);

  return server;
}

/**
 * Binds the server to the HOST and PORT specified on the settings file and starts listening for requests.
 *
 * @param {Application} app - express server instance
 */
function startServer(app: Application): Server {
  return app.listen(settings.APP_SERVER_BIND_PORT, settings.APP_SERVER_BIND_HOST, () => {
    logger.info(
      `Started server on http://${settings.APP_SERVER_BIND_HOST}:${settings.APP_SERVER_BIND_PORT} with NODE_ENV: ${settings.NODE_ENV}`
    );
  });
}

export { createServer, startServer };
