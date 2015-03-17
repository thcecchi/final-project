'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BoxscoreSchema = new Schema({
  event_id: String,
  date: String,
  time: String,
  home_team: String,
  away_team: String,
  home_points_scored: String,
  away_points_scored: String,
  active: Boolean
});

module.exports = mongoose.model('Boxscore', BoxscoreSchema);
