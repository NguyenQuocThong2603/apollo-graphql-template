const query = require('./controllerTwoQuery');
const mutation = require('./controllerTwoMutation');

module.exports = {
  ...query,
  ...mutation,
};
