/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Feedcomment = require('./feedcomment.model');

exports.register = function(socket) {
  Feedcomment.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Feedcomment.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('feedcomment:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('feedcomment:remove', doc);
}