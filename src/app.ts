/**
 * Main entrypoint of the app: creates, configures and starts the server of the app.
 */
import { createServer, startServer } from "~/src/startup/server";

function main() {
  const server = createServer();

  startServer(server);
}

main();
