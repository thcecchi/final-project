'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BetSchema = new Schema({
  date: String,
  user1: String,
  user1picks: Array,
  user2: String,
  user2picks: Array,
  wager: Number
});

module.exports = mongoose.model('Bet', BetSchema);
