'use strict';

var _ = require('lodash');
var Feedcomment = require('./feedcomment.model');

// Get list of feedcomments
exports.index = function(req, res) {
  Feedcomment.find(function (err, feedcomments) {
    if(err) { return handleError(res, err); }
    return res.json(200, feedcomments);
  });
};

// Get a single feedcomment
exports.show = function(req, res) {
  Feedcomment.findById(req.params.id, function (err, feedcomment) {
    if(err) { return handleError(res, err); }
    if(!feedcomment) { return res.send(404); }
    return res.json(feedcomment);
  });
};

// Creates a new feedcomment in the DB.
exports.create = function(req, res) {
  Feedcomment.create(req.body, function(err, feedcomment) {
    if(err) { return handleError(res, err); }
    return res.json(201, feedcomment);
  });
};

// Updates an existing feedcomment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Feedcomment.findById(req.params.id, function (err, feedcomment) {
    if (err) { return handleError(res, err); }
    if(!feedcomment) { return res.send(404); }
    var updated = _.merge(feedcomment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, feedcomment);
    });
  });
};

// Deletes a feedcomment from the DB.
exports.destroy = function(req, res) {
  Feedcomment.findById(req.params.id, function (err, feedcomment) {
    if(err) { return handleError(res, err); }
    if(!feedcomment) { return res.send(404); }
    feedcomment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}