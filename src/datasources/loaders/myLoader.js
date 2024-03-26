const _ = require('lodash');
const { createMergedSelectedFields } = require('graphql-fields-projection');

const MyModel = require('../models/MyModel');

async function myBatchFunction(keys) {
  const { ids, selectedFields } = createMergedSelectedFields(keys);
  const models = await MyModel.find({ _id: { $in: ids } }).select(selectedFields).lean();

  return _.map(ids, id => _.find(models, x => x._id.equals(id)));
}

module.exports = {
  myBatchFunction,
};
