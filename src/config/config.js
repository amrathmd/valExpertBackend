/*const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string()
            .valid("production", "development", "test"),
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required().description("Mongo DB url"),
        JWT_SECRET_KEY: Joi.string().required(),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    jwtsecretkey: envVars.JWT_SECRET_KEY,
    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
};
*/

const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid("production", "development", "test"),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    JWT_SECRET_KEY: Joi.string().required(),
    REDIS_HOST: Joi.string().default("localhost"), // Redis server host, default to localhost
    REDIS_PORT: Joi.number().default(6379), // Redis server port, default to 6379
    // Add more Redis-related configuration variables if needed
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtsecretkey: envVars.JWT_SECRET_KEY,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    // Add more Redis configuration options if needed
  },
};
