process.env.NODE_ENV = 'test';


var assert = require("assert");

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


var map_enhancer = require('../source/map_enhancer.js');

describe('MapEnhancer', function() {
  describe('find_path', function () {
    it('It should return correct path', function () {
      var position=[1,2];
      var destination=[5,6];

      console.log(map_enhancer);

      var grid = map_enhancer.load_grid(1);

      var path = map_enhancer.resolve(position[0], position[1], destination[0], destination[1], grid);

      console.log(path);
    });
  });
});