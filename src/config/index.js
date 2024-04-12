const container = require('./container');
const db = require('./db');
const grpc = require('./grpc');

const config = {
  ...container,
  ...db,
  ...grpc,
};

module.exports = config;
