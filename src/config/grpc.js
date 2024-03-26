const path = require('path');

const protosDir = path.join(__dirname, '../datasources/protos');

module.exports = {
  grpc: {
    clients: {
    },
    server: {
      name: 'my-grpc-server',
      port: parseInt(process.env.GRPC_PORT || '6700', 10),
      get host() {
        return `0.0.0.0:${this.port}`;
      },
      proto: {
        packageName: 'myPackage',
        serviceName: 'MyService',
        protoPath: path.join(protosDir, 'myProto.proto'),
      },
    },
  },
};
