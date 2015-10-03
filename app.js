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

  var grid = map_enhancer.load_grid(location);
  var path = map_enhancer.resolve(position[0], position[1], destination[0], destination[1], grid);
  var pathWithMarkers = map_enhancer.add_markers_to_path(path);

  res.json(pathWithMarkers);
});


app.get('/instructions/:location', function (req, res, next) {
  location = req.params.location; // Maps to hospital
  position = JSON.parse(req.query.position);
  direction = req.query.direction;  //
  destination = JSON.parse(req.query.destination);

  var path = map_enhancer.resolve(position[0], position[1], destination[0], destination[1], map_enhancer.load_grid(location));

  var enhancedPath = map_enhancer.add_markers_to_path(path);

  var getNextDirection = function(currentPosition, nextPosition){
    if(currentPosition[0] == nextPosition[0]){
      if(currentPosition[1] > nextPosition[1]){
        return "W";
      }else{
        return "E";
      }
    }else if(currentPosition[1] == nextPosition[1]){
      if(currentPosition[0] > nextPosition[0]){
        return "N";
      }else {
        return "S";
      }
    }

  };

  var directions = [direction];

  for (var i = 0; i < enhancedPath.length-1; ++i) {
    var currentPosition = enhancedPath[i];
    var nextPosition = enhancedPath[i+1];
    var nextDirection = getNextDirection(currentPosition, nextPosition);
    directions.push(nextDirection);
  }

  res.json(directions);
});

module.exports = app;
