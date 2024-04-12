async function myMutation(_, args, context, info) {
  const { dataSources } = context;
  const result = await dataSources.myMutation(args, context, info);
  return result;
}

module.exports = {
  MyMutation: myMutation,
};
