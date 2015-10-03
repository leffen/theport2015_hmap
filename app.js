var express = require('express');
var logger = require('morgan');
var map_enhancer = require('./source/map_enhancer.js');

var app = express();

app.use(logger('dev'));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Actual query
app.get('/api/directions/:location', function (req, res, next) {
  // console.log(req);
  console.log(req.params);
  location = req.params.location; // Maps to hospital
  position = JSON.parse(req.query.position);
  direction = req.query.direction;  //
  destination = JSON.parse(req.query.destination);

  var grid = map_enhancer.load_grid(1);
  var path = map_enhancer.resolve(position[0], position[1], destination[0], destination[1], grid);
  var pathWithMarkers = map_enhancer.add_markers_to_path(path);

  res.json(pathWithMarkers);
});


module.exports = app;
