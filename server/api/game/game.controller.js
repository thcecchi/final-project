'use strict';

var _ = require('lodash');
var Game = require('./game.model');

// Get list of games
exports.list = function(req, res) {
  Game.find(function (err, games) {
    if(err) { return handleError(res, err); }
    return res.json(200, games);
  });
};

// Get a single game
exports.show = function(req, res) {
  Game.findById(req.params.id, function (err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    return res.json(game);
  });
};

// Creates a new game in the DB.
exports.create = function(req, res) {
  Game.create(req.body, function(err, game) {
    if(err) { return handleError(res, err); }
    return res.json(201, game);
  });
};

// Updates an existing game in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Game.findById(req.params.id, function (err, game) {
    if (err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    var updated = _.merge(game, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, game);
    });
  });
};

// Deletes a game from the DB.
exports.destroy = function(req, res) {
  Game.findById(req.params.id, function (err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    game.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

var https = require('https');
var fs = require('fs');
var moment = require('moment-timezone');
var zlib = require('zlib');

// Replace with your access token
var ACCESS_TOKEN = '5819ceb0-57c0-4a32-a9a1-a1b84f412d77';

// Replace with your bot name and email/website to contact if there is a problem
// e.g., "mybot/0.1 (https://erikberg.com/)"
var USER_AGENT = 'MyRobot/1.0 (thcecchi@gmail.com)';

// Set time zone to use for output
var TIME_ZONE = 'America/New_York';

//////////////////////////////////////////////////////
// GET EVENT OBJECTS ////////////////////////////////
////////////////////////////////////////////////////

exports.index = function(request, response) {
  // Set the API method, format, and any parameters
  var host   = 'erikberg.com';
  var sport  = undefined;
  var method = 'events';
  var id     = undefined;
  var format = 'json';
  var params = {
    'sport': 'nba',
    'date': moment('YYYYMMDD')
    // 'date': 20150325
  };

  var url;
  var default_opts;
  var chunks;
  var buffer;
  var encoding;

  url = exports.buildURL(host, sport, method, id, format, params);

  default_opts = {
    'host': host,
    'path': url,
    'headers': {
      'Accept-Encoding': 'gzip',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
      'User-Agent': USER_AGENT
    }
  };

  https.get(default_opts, function (res) {
    var chunks = [];
    res.on('data', function (chunk) {
      chunks.push(chunk);
      return chunks

    });

    res.on('end', function () {
      if (res.statusCode !== 200) {
        // handle error...
        console.warn("Server did not return a 200 response!\n" + chunks.join(''));
        process.exit(1);
      }
      encoding = res.headers['content-encoding'];
      if (encoding === 'gzip') {
        buffer = Buffer.concat(chunks);
        zlib.gunzip(buffer, function (err, decoded) {
          if (err) {
            console.warn("Error trying to decompress data: " + err.message);
            process.exit(1);
          }
          response.json(exports.printResults(decoded).event);

        });
      } else {
        response.json(exports.printResults(chunks.join('')));
      }
    });
  }).on('error', function (err) {
    console.warn("Error trying to contact server: " + err.message);
    process.exit(1);
  });
}

// See https://erikberg.com/api/methods Request URL Convention for
// an explanation
exports.buildURL = function(host, sport, method, id, format, params) {
  var ary = [sport, method, id];
  var path;
  var url;
  var param_list = [];
  var param_string;
  var key;

  path = ary.filter(function (element) {
    return element !== undefined;
  }).join('/');
  url = 'https://' + host + '/' + path + '.' + format;

  // check for parameters and create parameter string
  if (params) {
    for (key in params) {
      if (params.hasOwnProperty(key)) {
        param_list.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
      }
    }
    param_string = param_list.join('&');
    if (param_list.length > 0) {
      url += '?' + param_string;
    }
  }
  return url;
}

exports.printResults = function(content) {
  var events = JSON.parse(content);
  var date;
  var time;

  date = moment.tz(events.events_date, TIME_ZONE).format('dddd, MMMM D, YYYY');

  events.event.forEach(function (event) {
    time = moment.tz(event.start_date_time, TIME_ZONE).format('h:mm A z');

  });

  return events
}
