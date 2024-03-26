const { makeExecutableSchema } = require('graphql-tools');

const express = require('express');
const { ApolloServer, gql } = require('apollo-server');

const utf8 = require('utf8');

const directives = require('./directives');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const dataSources = require('./datasources');
const { createLoaders } = require('./utils/loaders');
const { healthcheck } = require('./datasources/healthcheck');
const { connect } = require('./datasources/models');

const app = express();

app.get('/healthcheck', (req, res) => {
  const isHealthy = healthcheck();
  if (!isHealthy) {
    res.status(422).send({ isSuccess: false });
    return;
  }
  res.status(200).send({ isSuccess: true });
});

const reqContext = async ({ req }) => {
  const { query } = req.body;
  if (query && query.match(/GetServiceDefinition/)) {
    return {};
  }

  const meta = JSON.parse(utf8.decode(req.headers.meta || '{}'));

  const signature = JSON.parse(utf8.decode(req.headers.signature || '{}'));

  return ({
    signature,
    token: req.headers['access-token'],
    loaders: createLoaders(),
    meta,
  });
};

let schema = makeExecutableSchema({ typeDefs, resolvers });

schema = directives.reduce((curSchema, transformer) => transformer(curSchema), schema);

const server = new ApolloServer({
  schema,
  dataSources,
  context: reqContext,
  plugins: [
    {
      requestDidStart() {
        return {
          willSendResponse({ context: newContext, response }) {
            response.http.headers.append('audit', JSON.stringify(newContext.audit || {}));
          },
        };
      },
    },
  ],
  formatError: error => {
    logger.error('error', error.stack || error.mesage || error);
    return error;
  },
});

(async () => {
  await connect();
})();

server.applyMiddleware({ app, path: '/' });

module.exports = app;
