const custom = require('./custom');
const enumResolvers = require('./enums');
const queryResolver = require('./queries');
const myType = require('./myType');
const mutationResolver = require('./mutations');

module.exports = {
  Query: queryResolver,
  Mutation: mutationResolver,
  ...enumResolvers,
  ...custom,
  MyType: myType,
};
