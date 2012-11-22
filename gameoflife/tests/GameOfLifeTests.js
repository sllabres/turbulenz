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