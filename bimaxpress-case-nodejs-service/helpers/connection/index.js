const redisClient = require("./redis");
const mongoClient = require("./mongodb");
const elasticClient = require("./elastic");
const kafkaClient = require("./kafka");
// const firebaseDb = require("./firebase");

module.exports = {
  redisClient,
  mongoClient,
  elasticClient,
  kafkaClient,
  // firebaseDb,
};
