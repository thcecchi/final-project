/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Boxscore = require('./boxscore.model');

exports.register = function(socket) {
  Boxscore.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Boxscore.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('boxscore:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('boxscore:remove', doc);
}