process.env.NODE_ENV = 'test';

var assert = require("assert");

var map_enhancer = require('../source/map_enhancer.js');

describe('MapEnhancer', function() {

  describe('find_path', function () {
    it('It should return correct path', function () {
      var position=[1,2];
      var destination=[5,8];
      var grid = map_enhancer.load_grid(1);
      var path = map_enhancer.resolve(position[0], position[1], destination[0], destination[1], grid);

      assert.equal(path.length,11);
      assert.deepEqual(path[0],[1,2]);
      assert.deepEqual(path[10],[5,8]);
    });
  });
  describe("Markers ",function(){
    var grid = map_enhancer.load_grid(1);
    var path = map_enhancer.resolve(2,0, 9, 7, grid);
    it("should add markers to result", function(){

      var pathWithMarkers = map_enhancer.add_markers_to_path(path);

      assert.equal(pathWithMarkers.length,15);
      assert.deepEqual(pathWithMarkers[0][2][0],[2,0,'M1']);
      assert.deepEqual(pathWithMarkers[4][2][0],[6,0,'M2']);


    });

  });

});