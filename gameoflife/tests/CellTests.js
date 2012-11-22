(function () {
	module("Live Cell");
	var cellFactoryFake = new CellFactoryFake();
	var ruleFake = new RuleFake();
	var drawServiceFake = new DrawServiceFake();
	var liveCell = new LiveCell(cellFactoryFake, ruleFake, drawServiceFake);

	test("Live cell notifies one neighbour", function() {
	    this.neighbourCount = 0;
	    var neighbourFake = new NeighbourFake();
	    var neighbours = new Array(neighbourFake);    
	    liveCell.notifyNeighbours(neighbours);
	    equal(neighbourFake.notifyCount, 1);
	});

	test("Live cell notifies two neighours", function() {
	    var neighbourFake = new NeighbourFake();
	    var neighbours = new Array(neighbourFake, neighbourFake);    
	    liveCell.notifyNeighbours(neighbours);    
	    equal(neighbourFake.notifyCount, 2);
	});

	test("When notified twice live cell queries rule with two neighbours", function() {
	    liveCell = new LiveCell(cellFactoryFake, ruleFake, drawServiceFake);
	    ruleFake.neighbourCount = 0;
	    liveCell.notify();
	    liveCell.notify();
	    liveCell.checkRule();
	    equal(ruleFake.neighbourCount, 2);
	})

	test("When notified once live cell queries rule with one neighbour", function() {
	    liveCell = new LiveCell(cellFactoryFake, ruleFake, drawServiceFake);
	    ruleFake.neighbourCount = 0;
	    liveCell.notify();
	    liveCell.checkRule();
	    equal(ruleFake.neighbourCount, 1);
	});

	test("cell returns dead cell when it has one neighbours", function() {   
	    var localDeadCell = new FakeCell();
	    cellFactoryFake.deadCellToReturn = localDeadCell;
	    ruleFake.returnValue = false;
	    var returnedCell = liveCell.checkRule();
	    strictEqual(returnedCell, localDeadCell);
	});

	test("Cell returns live cell when it has two neighbours", function() {
	    var localLiveCell = new FakeCell();
	    cellFactoryFake.liveCellToReturn = localLiveCell;
	    ruleFake.returnValue = true;
	    var returnedCell = liveCell.checkRule();
	    strictEqual(returnedCell, localLiveCell);
	});

	test("Drawing cell draw calls drawService draw", function() {
	    liveCell.draw();
	    equal(drawServiceFake.drawCalled, true);
	});

	test("Drawing cell draw calls drawService draw with index", function() {
	    var cellIndex = 1;
	    liveCell.draw(cellIndex);
	    equal(drawServiceFake.cellIndex, cellIndex);
	});

	test("Drawing cell draw calls drawService draw with status", function() {
	    var aliveCell = true;
	    liveCell.draw(0);
	    equal(drawServiceFake.isAliveCell, aliveCell);
	});

	module("Dead Cell");
	var deadCell = new DeadCell(cellFactoryFake, ruleFake, drawServiceFake);
	test("Dead cell notify queries rule with one neighbour", function() {    
	    deadCell = new DeadCell(cellFactoryFake, ruleFake);
	    deadCell.notify();
	    deadCell.checkRule();    
	    equal(ruleFake.neighbourCount, 1);
	});

	test("Dead cell notify called twice queries rule with two neighbours", function() {    
	    deadCell = new DeadCell(cellFactoryFake, ruleFake, drawServiceFake);
	    deadCell.notify();
	    deadCell.notify();
	    deadCell.checkRule();
	    equal(ruleFake.neighbourCount, 2);
	});

	test("Dead cell returns dead cell when it has two neighbours", function() {   
	    var localDeadCell = new FakeCell();
	    cellFactoryFake.deadCellToReturn = localDeadCell;
	    ruleFake.returnValue = false;
	    var returnedCell = deadCell.checkRule();
	    strictEqual(returnedCell, localDeadCell);
	});

	test("Dead cell returns live cell when it has three neighbours", function() {
	    var localLiveCell = new FakeCell();
	    cellFactoryFake.liveCellToReturn = localLiveCell;
	    ruleFake.returnValue = true;
	    var returnedCell = deadCell.checkRule();
	    strictEqual(returnedCell, localLiveCell);
	});

	test("Drawing dead cell draw calls drawService draw", function() {    
	    deadCell.draw();
	    equal(drawServiceFake.drawCalled, true);
	});


	test("Drawing cell draw calls drawService draw with index", function() {    
	    var cellIndex = 2;
	    deadCell.draw(cellIndex);
	    equal(drawServiceFake.cellIndex, cellIndex);
	});

	test("Drawing cell draw calls drawService draw with status", function() {
	    drawServiceFake.isAliveCell = false;
	    var aliveCell = false;
	    deadCell.draw(0);
	    equal(drawServiceFake.isAliveCell, aliveCell);
	});
}());