function LiveCellRule() {
    "use strict";
    function isAlive(noNeighbours) {
        return noNeighbours > 1 && noNeighbours < 4;
    }

    return {
        isAlive : isAlive
    };
}

function DeadCellRule() {
    "use strict";
    function isAlive(noNeighbours) {
        return noNeighbours === 3;
    }

    return {
        isAlive : isAlive
    };
}