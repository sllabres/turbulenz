function CellFactory(liveCellRule, deadCellRule, drawService) {    
    "use strict";
    function createLiveCell() {
        return new LiveCell(this, liveCellRule, drawService);
    }

    function createDeadCell() {
        return new DeadCell(this, deadCellRule, drawService);
    }

    return {
        createLiveCell : createLiveCell,
        createDeadCell : createDeadCell
    };
}