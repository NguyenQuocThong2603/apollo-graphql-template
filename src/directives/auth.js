const { getDirective, MapperKind, mapSchema } = require('@graphql-tools/utils');

const _ = require('lodash');
const { SchemaDirectiveVisitor } = require('apollo-server-express');

const {
  defaultFieldResolver,
  GraphQLList,
} = require('graphql');

const ROLE_MAP = {
  Admin: 'ADMIN',
};

function toGraphqlRole(role) {
  return ROLE_MAP[role];
}

function authDirective(schema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: fieldConfig => {
      const authDirectiveDef = getDirective(schema, fieldConfig, 'auth')?.[0];
      if (authDirectiveDef) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        const requiredRoles = schema.getType('Role');
        fieldConfig.resolve = async (...args) => {
          if (!requiredRoles) {
            return resolve.apply(this, args);
          }

          const context = args[2];
          const { signature } = context;
          const { roles } = signature;

          if (!(_.intersection(requiredRoles, roles?.map(role => toGraphqlRole(role)))).length) {
            throw new Error('You are not authorized for this field');
          }

          const results = await resolve.apply(this, args);
          return results;
        };
      }
    },
  });
}

module.exports = authDirective;
