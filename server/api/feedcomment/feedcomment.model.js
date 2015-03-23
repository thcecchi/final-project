'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedcommentSchema = new Schema({
  comment: String,
  info: String,
  active: Boolean,
  bet: String,
  user: String

});

module.exports = mongoose.model('Feedcomment', FeedcommentSchema);
