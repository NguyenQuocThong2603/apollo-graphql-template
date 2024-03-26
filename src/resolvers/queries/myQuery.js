async function myQuery(_, args, context, info) {
  const { dataSources } = context;
  const result = await dataSources.myQuery(args, context, info);
  return result;
}

module.exports = {
  myQuery,
};
