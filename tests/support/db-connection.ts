import { createConnection, getConnection } from "typeorm";
import * as uuid from "uuid";
import { DATABASE } from "~/src/config/settings";

const databaseConnection = {
  uniqueConnectionName: "",

  async create() {
    let settings = { ...DATABASE };
    this.uniqueConnectionName = `test-connection-${uuid.v4()}`;
    settings["name"] = this.uniqueConnectionName;

    return await createConnection(settings);
  },

  async close() {
    await getConnection(this.uniqueConnectionName).close();
  },

  async clear() {
    const connection = getConnection(this.uniqueConnectionName);
    // all tables except the migration table
    await connection.query("TRUNCATE TABLE message CASCADE");
    await connection.query("TRUNCATE TABLE queue CASCADE");
    await connection.query("TRUNCATE TABLE topic CASCADE");
  },
};

export default databaseConnection;
