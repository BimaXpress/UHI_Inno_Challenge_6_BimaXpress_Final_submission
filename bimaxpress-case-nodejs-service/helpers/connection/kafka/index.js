const { Kafka } = require("kafkajs");
const { KAFKA_CLIENT_ID, KAFKA_HOST, KAFKA_PORT } = require("../../../config");

const clientId = KAFKA_CLIENT_ID;
const brokers = [`${KAFKA_HOST}:${KAFKA_PORT}`];

const kafkaClient = new Kafka({ clientId, brokers });

module.exports = kafkaClient;
