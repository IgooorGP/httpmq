/**
 * Configuration exceptions like env values not being found on runtime.
 */
class EnvNotFoundException extends Error {}
class EnvIsNotBooleanException extends Error {}
class EnvIsNotIntException extends Error {}

export { EnvNotFoundException, EnvIsNotBooleanException, EnvIsNotIntException };
