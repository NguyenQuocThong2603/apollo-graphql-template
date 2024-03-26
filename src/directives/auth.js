const { getDirective, MapperKind, mapSchema } = require('@graphql-tools/utils');

const _ = require('lodash');
const { SchemaDirectiveVisitor } = require('apollo-server-express');

const { defaultFieldResolver,
  GraphQLDirective,
  DirectiveLocation,
  GraphQLList } = require('graphql');

const ROLE_MAP = {
  Admin: 'ADMIN',
};

function toGraphqlRole(role) {
  return ROLE_MAP[role];
}

class AuthDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: 'auth',
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {
        roles: {
          type: new GraphQLList(schema.getType('Role')),
        },
      },
    });
  }

  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  visitFieldDefinition(field) {
    const requiredRoles = this.args.roles;
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (...args) => {
      // Get the required Roles from the field first, falling back
      // to the objectType if no Role is required by the field:
      if (!requiredRoles) {
        return resolve.apply(this, args);
      }

      const context = args[2];
      const { signature } = context;
      const { roles } = signature;

      if (!(_.intersection(requiredRoles, roles.map(role => toGraphqlRole(role)))).length) {
        throw new Error('You are not authorized for this field');
      }

      const results = await resolve.apply(this, args);
      return results;
    };
  }
}

function authDirective(directiveName) {
  return schema => mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: fieldConfig => {
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        return {
          ...fieldConfig,
          async resolve(source, args, context, info) {
            const result = await resolve(source, args, context, info);
            if (typeof result === 'string') {
              return result.toUpperCase();
            }
            return result;
          },
        };
      }
    },
  });
}

module.exports = authDirective;
