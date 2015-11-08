/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Pastgame = require('./pastgame.model');

exports.register = function(socket) {
  Pastgame.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Pastgame.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('pastgame:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('pastgame:remove', doc);
}