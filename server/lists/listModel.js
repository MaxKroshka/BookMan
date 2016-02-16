var mongoose = require('mongoose');

var ListSchema = new mongoose.Schema({
  name: String,
  user: String
});

module.exports = mongoose.model('List', ListSchema);