var mongoose = require('mongoose');

var LinkSchema = new mongoose.Schema({
 title: String,
 url: String,
 user: String,
 favicon: String,
 tab: String,
 favorite: { type: Boolean, default: false },
 reading: { type: Boolean, default: false },
 sticky: { type: Boolean, default: false }
});

module.exports = mongoose.model('Link', LinkSchema);
