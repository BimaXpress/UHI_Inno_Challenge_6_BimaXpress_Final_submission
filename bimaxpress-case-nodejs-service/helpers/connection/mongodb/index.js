const mongoose = require("mongoose");
const { infoLogger, errorLogger } = require("../../../utils/logger");
const { MONGO_URL, MONGO_DATABASE_NAME } = require("../../../config");

const mongoClient = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL, {
      dbName: MONGO_DATABASE_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
    infoLogger.info(`Mongodb connected ${conn.connection.host}`);
  } catch (error) {
    errorLogger.error(`Error ${error.message}`);
    process.exit(1);
  }
};

module.exports = mongoClient;
