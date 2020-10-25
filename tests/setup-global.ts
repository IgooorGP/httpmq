/**
 * Jest global setup function that is executed before all tests. Mainly used to setup
 * dotenv variables.
 */
import dotenv from "dotenv";

module.exports = async () => {
    dotenv.config({ path: "./.local.env" }); // must be loaded before anything else
};