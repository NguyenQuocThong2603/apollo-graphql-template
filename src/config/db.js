module.exports = {
  database: process.env.DB_CONNECTION_STRING,
  mongoOptions: {
    maxPoolSize: 10,
  },
  // redis
  redisDbs: {
    authDb: process.env.REDIS_CONNECTION_STRING
      ? {
        url: process.env.REDIS_CONNECTION_STRING,
        db: parseInt(process.env.AUTHENTICATION_STORE, 10),
      } : {
        port: 6379,
        host: process.env.REDIS_URL,
        user: process.env.REDIS_USERNAME ? undefined : process.env.REDIS_USERNAME,
        password: process.env.REDIS_AUTH ? undefined : process.env.REDIS_AUTH,
        db: parseInt(process.env.AUTHENTICATION_STORE, 10),
        get tls() {
          return (process.env.NODE_ENV === 'test' || process.env.SKIP_TLS) ? undefined : { servername: this.host };
        },
        get socket() {
          return (process.env.NODE_ENV === 'test' || process.env.SKIP_TLS)
            ? undefined : { host: this.host, port: this.port, tls: true };
        },
      },
  },
};
