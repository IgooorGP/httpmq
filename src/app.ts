/**
 * Main entrypoint of the app: creates, configures and starts the server of the application.
 */
import { createServer, startServer } from "~/src/startup/server";

function main() {
  const server = createServer();

  startServer(server);
}

main();
