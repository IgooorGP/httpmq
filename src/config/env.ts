/**
 * Application utilities.
 */
import { EnvIsNotBooleanException, EnvIsNotIntException, EnvNotFoundException } from "~/src/config/exceptions";

/**
 * Reads an env variable or throws an exception if its value was not found.
 *
 * @param {string} envName - name of the env variable to find or throw an exception
 * @returns {string} - the value of the env variable
 * @throws {EnvIsNotBooleanException} - if the env variable value was not found
 */
function readEnvironmentOrException(envName: string): string {
  const value = readEnvironment(envName, "");

  if (!value) throw new EnvNotFoundException(`Env variable ${envName} was not found!`);

  return value;
}

/**
 * Reads env variables from the environment where the process is running. Accepts a default value.
 *
 * @param {string} envName - name of the env variable to look for
 * @param {string} defaultValue - defualt value if the env was not found
 * @returns {string} - the value of the env variable. If it was not found, the default value is returned
 */
function readEnvironment(envName: string, defaultValue: string): string {
  return process.env[envName] ?? defaultValue;
}

/**
 * Reads an env variable and attempts to cast it to a boolean value. Accepts only 'true' and 'false'
 * (capitalization doesn't matter). If the cast fails, throws EnvIsNotBooleanException.
 *
 * @param {string} envName - name of the env variable to look and cast to boolean
 * @returns {boolean} - the boolean value of the env variable
 * @throws {EnvIsNotBooleanException} - if the cast of the env value to bool fails
 */
function readEnvironmentAsBoolean(envName: string): boolean {
  const valueStr = readEnvironment(envName, "");
  const boolPattern = /^(true|false)$/i; // case-insensitive

  if (!boolPattern.test(valueStr)) throw new EnvIsNotBooleanException(`Env ${envName} value ${valueStr} is not bool!`);

  return JSON.parse(valueStr);
}

/**
 * Reads an env variable and attempts to cast it to a boolean value. Accepts only 'true' and 'false'
 * (capitalization doesn't matter). If the cast fails, throws EnvIsNotBooleanException.
 *
 * @param {string} envName - name of the env variable to look and cast to boolean
 * @returns {boolean} - the boolean value of the env variable
 * @throws {EnvIsNotIntException} - if the cast of the env value to an int fails
 */
function readEnvironmentAsInt(envName: string): number {
  const valueStr = readEnvironment(envName, "");
  const intPattern = /^\d+$/;

  if (!intPattern.test(valueStr)) throw new EnvIsNotIntException(`Env ${envName} value ${valueStr} is not an int!`);

  return JSON.parse(valueStr);
}

export { readEnvironment, readEnvironmentOrException, readEnvironmentAsBoolean, readEnvironmentAsInt };
