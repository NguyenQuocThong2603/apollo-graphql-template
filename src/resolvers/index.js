const custom = require('./custom');
const enumResolvers = require('./enums');
const queryResolver = require('./mutations');
const myResolver = require('./myResolver');
const mutationResolver = require('./mutations');

module.exports = {
  Query: queryResolver,
  Mutation: mutationResolver,
  ...enumResolvers,
  ...custom,
  MyResolver: myResolver,
};
