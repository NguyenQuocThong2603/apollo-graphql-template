const { databaseConn } = require('./connections');
const { status: healthcheck } = require('../healthcheck');
const MyModel = require('./MyModel');

const connect = async () => {
  try {
    await Promise.all([
      databaseConn.asPromise(),
    ]);
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error('Connection to database failed', err);
    healthcheck.mongodb = false;
  }
};

module.exports = {
  connect,
  MyModel,
};
