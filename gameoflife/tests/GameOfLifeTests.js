function NeighbourFake() {    
    this.notifyCount = 0;
    this.notify = function() {        
        this.notifyCount++;
    }
}

function CellFactoryFake() {
    this.deadCellToReturn;
    this.liveCellToReturn;   

    this.createDeadCell = function() {
        return this.deadCellToReturn;
    }

    this.createLiveCell = function() {
        return this.liveCellToReturn;
    }
}

function RuleFake() {    
    this.returnValue = true;
    this.neighbourCount = 0;
    this.isAlive = function(neighboursCount) {
        this.neighbourCount = neighboursCount;
        return this.returnValue;
    }
}

function FakeCell() {    
    this.updateCount = 0;   
    this.neighbourCount = 0;   
    this.ruleCheck = false; 
    this.returnCell;
    this.drawCalled = false;

    this.notifyNeighbours = function(neighbours) {        
        this.updateCount++;

        if(neighbours != null) {
            this.neighbourCount = neighbours.length;
        }
    }

    this.checkRule = function(neighbours) {
        this.ruleCheck = true;
        return this.returnCell;
    }

    this.draw = function(index) {     
        this.drawCalled = true;        
    }
}

function DrawServiceFake() {
    this.drawCalled = false;    
    this.cellIndex = 0;
    this.isAliveCell = false;
    this.draw = function(isAliveCell, index) {
        this.cellIndex = index;
        this.isAliveCell = isAliveCell;
        this.drawCalled = true;
    }    
}

function FakeNeighbourhoodWatch() {
    this.getNeighbours = function() {
        return new Array();
    }
}

module("Given cell drawing on 3 * 3 grid");
test("When cell drawing called for live cell, then cell is white", function() {
    var liveCellColour = '#FFFFFF',
        gridWidth = 3,
        context = { fillRect : function() {} },
        cellDrawing = new CellDrawing(context, gridWidth);

    cellDrawing.draw(true);

    equal(context.fillStyle, liveCellColour);
});

test("When cell drawing called for dead cell, then cell is black", function() {
    var deadCellColour = '#000000',
        gridWidth = 3,
        context = { fillRect : function() {} },
        cellDrawing = new CellDrawing(context, gridWidth);

    cellDrawing.draw(false);

    equal(context.fillStyle, deadCellColour);
});

test("When cell drawing called for cell at index 0, then cell x coordinate is 0", function() {
    var cellIndex = 0,
        gridWidth = 3,
        xCoordinate,
        context = { fillRect : function (x, y, width, height) {
            xCoordinate = x;
        } },
        cellDrawing = new CellDrawing(context, gridWidth);

        cellDrawing.draw(true, cellIndex);

    equal(xCoordinate, 0);
});

test("When cell drawing called for cell at index 0, then cell y coordinate is 0", function() {
    var cellIndex = 0,
        gridWidth = 3,
        yCoordinate,
        context = { fillRect : function (x, y, width, height) {
            yCoordinate = y;
        } },
        cellDrawing = new CellDrawing(context, gridWidth);

        cellDrawing.draw(true, cellIndex);

    equal(yCoordinate, 0);
});

test("When cell drawing called for cell at index 1, then cell x coordinate is 1", function() {
    var cellIndex = 1,
        gridWidth = 3,
        xCoordinate,
        context = { fillRect : function (x, y, width, height) {
            xCoordinate = x;
        } },
        cellDrawing = new CellDrawing(context, gridWidth);

        cellDrawing.draw(true, cellIndex);

    equal(xCoordinate, 1);
});

test("When cell drawing called for cell at index 3, then cell y coordinate is 1", function() {
    var cellIndex = 3,
        gridWidth = 3,
        yCoordinate,
        context = { fillRect : function (x, y, width, height) {
            yCoordinate = y;
        } },
        cellDrawing = new CellDrawing(context, gridWidth);

        cellDrawing.draw(true, cellIndex);

    equal(yCoordinate, 1);
});

test("When cell drawing for cell at index 1 with cell width of 10, then x coordinate is 10", function() {
    var cellIndex = 1,
        gridWidth = 3,
        cellWidth = 10,
        xCoordinate,
        context = { fillRect : function (x, y, width, height) {
            xCoordinate = x;
        } },
        cellDrawing = new CellDrawing(context, gridWidth, cellWidth);

        cellDrawing.draw(true, cellIndex);

    equal(xCoordinate, 10);
});

test("When cell drawing for cell at index 3 with cell width of 10, then y coordinate is 10", function() {
    var cellIndex = 3,
        gridWidth = 3,
        cellWidth = 10,
        yCoordinate,
        context = { fillRect : function (x, y, width, height) {
            yCoordinate = y;
        } },
        cellDrawing = new CellDrawing(context, gridWidth, cellWidth);

        cellDrawing.draw(true, cellIndex);

    equal(yCoordinate, 10);
});

module("Live Cell Rules");
var liveCellRule = new LiveCellRule();
test("Live cell with fewer than two neighbours dies", function() {    
    equal(liveCellRule.isAlive(1), false);    
});

test("Live cell with two neighbours lives", function() {    
    equal(liveCellRule.isAlive(2), true);
});

test("Live cell with three neighbours lives", function() {    
    equal(liveCellRule.isAlive(3), true);
});

test("Live cell with more than three neighbours dies", function() {    
    equal(liveCellRule.isAlive(4), false);
});

module("Dead Cell Rules");
var deadCellRule = new DeadCellRule();
test("Dead cell with three neighbours lives", function() {    
    equal(deadCellRule.isAlive(3), true);
});

test("Dead cell with two neighbours stays dead", function() {    
    equal(deadCellRule.isAlive(2), false);
});


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

module("Grid");
var fakeCell = new FakeCell();

test("Updating grid updates cell", function() {        
    fakeCell.updateCount = 0;
    var fakeCells = new Array(fakeCell);
    var grid = new Grid(fakeCells, new FakeNeighbourhoodWatch());
    grid.update();
    equal(fakeCell.updateCount, 1)
});

test("Updating grid updates multiple cells", function() {    
    fakeCell.updateCount = 0;    
    var fakeCells = new Array(fakeCell, fakeCell);
    var grid = new Grid(fakeCells, new FakeNeighbourhoodWatch());
    grid.update();
    equal(fakeCell.updateCount, 2);
});

test("Updating grid updates one cell with one neighbour", function() {
    fakeCell.updateCount = 0;
    var fakeCells = new Array(fakeCell);
    var grid = new Grid(fakeCells, new FakeNeighbourhoodWatch());
    grid.update();
    equal(fakeCell.updateCount, 1);
});

test("Updating grid updates cell with two neighbours", function() {    
    fakeCell.updateCount = 0;
    var fakeCells = new Array(fakeCell, fakeCell);
    var grid = new Grid(fakeCells, new FakeNeighbourhoodWatch());
    grid.update();
    equal(fakeCell.updateCount, 2);
});

test("Checks rule for cell", function() {
    var fakeCell = new FakeCell();
    var fakeCells = new Array(fakeCell);
    var gridWidth = 1;    
    var grid = new Grid(fakeCells, new FakeNeighbourhoodWatch());
    grid.update();
    equal(fakeCell.ruleCheck, true);
});

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