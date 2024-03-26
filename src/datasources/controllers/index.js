const controllerOne = require('./controllerOne');
const controllerTwo = require('./controllerTwo');

module.exports = {
  ...controllerOne,
  ...controllerTwo,
};
