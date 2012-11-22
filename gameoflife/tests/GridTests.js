(function () {
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
}());