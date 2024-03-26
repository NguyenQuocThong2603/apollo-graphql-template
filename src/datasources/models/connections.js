const mongoose = require('mongoose');
const { database, mongoOptions } = require('../../config');

const databaseConn = mongoose.createConnection(database, mongoOptions);

module.exports = {
  databaseConn,
};
