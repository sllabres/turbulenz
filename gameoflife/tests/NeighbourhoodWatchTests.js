(function () {
	module("NeighbourhoodWatch");
	// x
	test("cell has no neighbours", function() {
	    var gridWidth = 1;
	    var watch = new NeighbourhoodWatch(gridWidth);
	    equal(watch.getNeighbours(new Array("cell")).length, 0);    
	});
	    
	// x x
	test("when two cells in grid cell has one neighbour", function() {
	    var gridWidth = 2;
	    var watch = new NeighbourhoodWatch(gridWidth);
	    var cells = new Array("cell", "cell");
	    var cellIndex = 0;
	    var neighbours = watch.getNeighbours(cells, cellIndex);
	    equal(neighbours.length, 1);
	});

	// x x x
	// x o x
	// x x x 
	test("cell in centre of orthogonal 3x3 grid has eight neighbours", function() {
	    var gridWidth = 3;
	    var watch = new NeighbourhoodWatch(gridWidth);
	    var numberOfNeighbours = 8;
	    var cells = new Array("cell", "cell", "cell",
	                          "cell", "CentreCell", "cell",
	                          "cell", "cell", "cell");    
	    var cellIndex = 4;
	    var neighbours = watch.getNeighbours(cells, cellIndex);
	    equal(neighbours.length, numberOfNeighbours);
	});

	// o x x
	// x x x
	// x x x 
	test("cells in top left of 3*3 grid has 3 neighbours", function() {
	    var gridWidth = 3;
	    var watch = new NeighbourhoodWatch(gridWidth);    
	    var numberOfNeighbours = 3;
	    var cells = new Array("0,0", "1,1", "2,2",
	                          "1,3", "1,4", "2,5",
	                          "2,6", "2,7", "2,8");    
	    var cellIndex = 0;
	    var neighbours = watch.getNeighbours(cells, 0);
	    equal(neighbours.length, numberOfNeighbours);
	});
}());