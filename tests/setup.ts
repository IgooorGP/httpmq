import dotenv from "dotenv";
dotenv.config({ path: "./.local.env" }); // must be loaded before anything else

import { createConnection, getConnection } from "typeorm";
import { DATABASE } from "~/src/config/settings";

const databaseConnection = {
  async create() {
    let settings = { ...DATABASE };
    settings["name"] = "test_connection";

    return await createConnection(settings);
  },

  async close() {
    await getConnection("test_connection").close();
  },

  async clear() {
    const connection = getConnection("test_connection");
    await connection.synchronize(true); // drops the db
  },
};

export default databaseConnection;
