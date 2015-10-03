var express = require('express');
var http = require('http');
var PF = require('pathfinding');
var _ = require('underscore');

var matrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var markers = [
  [2, 0, "M1"],
  [6, 0, "M2"],
  [9, 2, "M3"],
  [9, 7, "M4"],
  [6, 9, "M5"],
  [2, 9, "M6"]
];
var originalGrid = new PF.Grid(matrix);
var finder = new PF.AStarFinder();

// Express and middlewares
var app = express();

app.resolve = function(x1,y1,x2,y2,grid) {
  var finder = new PF.AStarFinder();

 return finder.findPath(position[0], position[1], destination[0], destination[1], grid);
};

app.load_grid  = function(location){
  return originalGrid.clone();
}

app.addMarkersToPath = function(path){
  return _.map(path, function(item) {

    var itemMarkers = _.filter(markers, function(marker){
        return item[0] === marker[0] && item[1] === marker[1];
    });

    if(itemMarkers.length > 0 ){
      item.push(itemMarkers);
    }
    return item;
  });
};

// Actual query
app.get('/directions/:location', function (req, res, next) {
  // console.log(req);
  console.log(req.params);
  location = req.params.location; // Maps to hospital
  position = JSON.parse(req.query.position);
  direction = req.query.direction;  //
  destination = JSON.parse(req.query.destination);

  console.log(location,position, direction, destination);
  console.log(position[0], position[1], destination[0], destination[1]);

  var path = app.resolve(position[0], position[1], destination[0], destination[1], app.load_grid(location));

  var enhancedPath = app.addMarkersToPath(path);

  res.json(enhancedPath);
});

// Standalone server setup
var port = process.env.PORT || 3001;
http.createServer(app).listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on http://localhost:' + port);
  }
});
