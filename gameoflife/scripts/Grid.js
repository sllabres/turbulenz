function Grid(seed, neighbourhoodWatch) {
    "use strict";
    var cells = seed;

    function notifyNeighbours() {
        cells.forEach(function (cell, index) {
            cell.notifyNeighbours(neighbourhoodWatch.getNeighbours(cells, index));
        });
    }

    function checkRules() {
        var newCells = [];
        cells.forEach(function (cell, index) {
            cell.draw(index);
            newCells.push(cell.checkRule());
        });

        cells = newCells;
    }

    function update() {
        notifyNeighbours(cells);
        checkRules();
    }

    function draw() {
        cells.forEach(function (cell, index) {
            cell.draw(index);
        });
    }

    return {
        update : update,
        notifyNeighbours : notifyNeighbours
    };
}