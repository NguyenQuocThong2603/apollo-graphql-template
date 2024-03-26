const { Schema } = require('mongoose');
const { databaseConn } = require('./connections');

const MyModelSchema = new Schema({
  name: String,
}, {
  timestamps: true,
});

module.exports = databaseConn.model('mymodels', MyModelSchema);
