const DataLoader = require('dataloader');
const { loaders } = require('../../datasources')();

function createLoaders() {
  return {
    myLoader: new DataLoader(keys => loaders.myBatchFunction(keys)),
  };
}

module.exports = {
  createLoaders,
};
