const dotEnv = require('dotenv');

const NODE_ENV = 'dev';
if (NODE_ENV !== 'prod') {
  const configFile = `./.env.${NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  MONGO_URL: process.env.MONGO_URL,
  MONGO_DATABASE_NAME: process.env.MONGO_DATABASE_NAME,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  PORT: process.env.PORT,
  PROCESS_TYPE: process.env.PROCESS_TYPE,
  IS_ELASTIC_SEARCH: process.env.IS_ELASTIC_SEARCH,
  ELASTIC_SEARCH_HOST: process.env.ELASTIC_SEARCH_HOST,
  ELASTIC_SEARCH_PORT: process.env.ELASTIC_SEARCH_PORT,
  IS_REDIS: process.env.IS_REDIS,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  IS_KAFKA: process.env.IS_KAFKA,
  KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
  KAFKA_HOST: process.env.KAFKA_HOST,
  KAFKA_PORT: process.env.KAFKA_PORT,
};
