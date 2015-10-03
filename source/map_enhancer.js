var PF = require('pathfinding');

module.exports = function(grid,markers) {
  var originalGrid = new PF.Grid(grid);
  var finder = new PF.AStarFinder();

  var factory = {};

  factory.resolve =  function (x1, y1, x2, y2, grid) {
    return finder.findPath(x1, y1, x2, y2, grid);
  };
  factory.load_grid = function (location) {
    return originalGrid.clone();
  };

  return factory;
};