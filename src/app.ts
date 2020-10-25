/**
 * Main entrypoint of the app: creates, configures and starts the server of the app.
 */
import "reflect-metadata";
import { createServer, startServer } from "~/src/startup/server";

async function main() {
  const server = await createServer();

  startServer(server);
}

main();