const { Server } = require('ugrpc');
const config = require('../config');
const controllers = require('./controllers');
const { status } = require('../datasources/healthcheck');

const server = new Server({
  ...config.grpc.server,
  controllers,
  healthcheckStatus: status,
});

function stopGrpcServer() {
  return server.stopServer();
}

async function startGrpcServer() {
  logger.info(`🚀 Starting grpc server ${config.grpc.server.port}`);
  await server.startServer();
  return server;
}

module.exports = {
  startGrpcServer,
  stopGrpcServer,
};
