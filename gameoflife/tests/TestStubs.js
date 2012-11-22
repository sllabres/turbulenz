// file full of stubs which should be inlined with the tests

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