var PF = require('pathfinding');
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


module.exports.load_grid = function (location) {
  return new PF.Grid(grid_map1);
};

module.exports.resolve = function (x1, y1, x2, y2, grid) {
  console.log(x1, y1, x2, y2);
  return finder.findPath(x1, y1, x2, y2, grid);
};
