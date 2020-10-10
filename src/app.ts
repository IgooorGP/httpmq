/**
 * Main entrypoint of the app: creates, configures and starts the server of the app.
 */
import { createServer, startServer } from "~/src/startup/server";
import "reflect-metadata";

async function main() {
  const server = await createServer();

  startServer(server);
}

main();
