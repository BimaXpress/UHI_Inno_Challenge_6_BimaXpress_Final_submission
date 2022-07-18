const redis = require("redis");
const { infoLogger, errorLogger } = require("../../../utils/logger");
const { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD } = require("../../../config");

const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  // password: REDIS_PASSWORD,
});

redisClient.on("connect", () => {
  infoLogger.info("Client connect to redis");
});

redisClient.on("ready", () => {
  infoLogger.info("Client connected to redis and ready to use");
});

redisClient.on("error", (err) => {
  errorLogger.error(err.message);
});

redisClient.on("end", () => {
  errorLogger.error("Client connect to redis");
});

redisClient.on("SIGINT", () => {
  redisClient.quit();
});

module.exports = redisClient;
