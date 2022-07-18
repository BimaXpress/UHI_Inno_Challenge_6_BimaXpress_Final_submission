const { Client } = require("@elastic/elasticsearch");
const { ELASTIC_SEARCH_HOST, ELASTIC_SEARCH_PORT } = require("../../../config");

const elasticClient = new Client({
  node: `http://${ELASTIC_SEARCH_HOST}:${ELASTIC_SEARCH_PORT}`,
});

module.exports = elasticClient;
