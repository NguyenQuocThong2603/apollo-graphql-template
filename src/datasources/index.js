const controllers = require('./controllers');
const loaders = require('./loaders');
const utils = require('./utils/controllers');

module.exports = () => ({ ...controllers, loaders, utils });
