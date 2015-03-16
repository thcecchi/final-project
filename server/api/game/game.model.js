'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
  event_id: String,
  date: String,
  time: String,
  home_team: String,
  away_team: String,
  home_points_scored: String,
  away_points_scored: String,
  active: Boolean
});

GameSchema.path('event_id').set(function (v) {
  this.slug = slugify(v);
  this._id = idify(this.slug);
  return v;
});

function slugify (v) {
  return (v || '').replace(/\s+/g, '')
}

function idify (v) {
  return 'mycustomid_' + v
}

var A = mongoose.model('A', GameSchema);

mongoose.connection.on('open', function () {
  var a = new A({ event_id: 'try 1' });
  console.log(a); // { title: 'try 1', _id: 'mycustomid_try1', slug: 'try1' }

  // a.save(function (err, a) {
  //   if (err) return done(err);
  //
  //   A.findById(a._id, function (err, doc) {
  //     console.error('found', doc);
  //     done(err);
  //   });
  // })
});

module.exports = mongoose.model('Game', GameSchema);

console.log(module.exports.base.paths)
