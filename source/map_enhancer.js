var PF = require('pathfinding');
var _ = require('underscore');

var finder = new PF.AStarFinder();

var grid_map1 = [
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


module.exports.load_grid = function (location) {
  return new PF.Grid(grid_map1);
};

module.exports.resolve = function (x1, y1, x2, y2, grid) {
  return finder.findPath(x1, y1, x2, y2, grid);
};

module.exports.add_markers_to_path = function(path){

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
