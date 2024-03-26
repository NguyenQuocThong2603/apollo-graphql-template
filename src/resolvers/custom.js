const { GraphQLDate, GraphQLJSONObject, GraphQLDateTime } = require('graphql-scalars');

module.exports = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  JSONObject: GraphQLJSONObject,
};
