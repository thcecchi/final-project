'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BetSchema = new Schema({
  date: String,
  user1: String,
  user1picks: Array,
  user2: String,
  user2picks: Array,
  wager: Number,
  user1record: Array,
  user2record: Array,
  user1Total: String,
  user2Total: String,
  winner: String,
  loser: String
});

module.exports = mongoose.model('Bet', BetSchema);
