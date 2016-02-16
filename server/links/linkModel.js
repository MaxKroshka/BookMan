var mongoose = require('mongoose');

var LinkSchema = new mongoose.Schema({
 title: String,
 url: String,
 user: String,
 favicon: String
});

module.exports = mongoose.model('Link', LinkSchema);
