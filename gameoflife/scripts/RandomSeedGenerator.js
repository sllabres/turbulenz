/*global CellFactory,LiveCellRule, DeadCellRule*/
function RandomSeedGenerator(cellDrawing, gridWidth) {
    "use strict";
    var gridSize = gridWidth * gridWidth;
    
    function generate(gridSize) {
        var cellFactory = new CellFactory(new LiveCellRule(), new DeadCellRule(), cellDrawing),
            cells = [],
            liveCell,
            i = 0;

        for (i; i < gridSize; i += 1) {
            liveCell = Math.floor((Math.random() * 100) + 1);

            if (liveCell > 50) {
                cells.push(cellFactory.createLiveCell());
            } else {
                cells.push(cellFactory.createDeadCell());
            }
        }

        return cells;
    }

    return {
        generate : generate
    };
}