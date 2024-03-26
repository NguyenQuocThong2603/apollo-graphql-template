const query = require('./controllerOneQuery');
const mutation = require('./controllerOneMutation');

module.exports = {
  ...query,
  ...mutation,
};
