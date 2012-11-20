 function LiveCell (cellFactory, rule, drawService) {
    "use strict";
    var neighbourCount = 0;

    function checkRule() {
        if (rule.isAlive(neighbourCount)) {
            return cellFactory.createLiveCell();
        } else {
            return cellFactory.createDeadCell();
        }
    }

    function notify() {
        neighbourCount += 1;
    }

    function notifyNeighbours(neighbours) {
        neighbours.forEach(function (neighbour) {
            neighbour.notify();
        });
    }

    function draw(index) {
        drawService.draw(true, index);
    }

    return {
        checkRule : checkRule,
        notify : notify,
        notifyNeighbours : notifyNeighbours,
        draw : draw
    };
}

function DeadCell(cellFactory, rule, drawService) {
    "use strict";
    var neighbourCount = 0;

    function checkRule() {
        if (rule.isAlive(neighbourCount)) {
            return cellFactory.createLiveCell();
        } else {
            return cellFactory.createDeadCell();
        }
    }

    function notify() {
        neighbourCount += 1;
    }

    // don't notify neighbours, I'm dead
    // dead code??
    function notifyNeighbours(neighbours) { }

    function draw(index) {
        drawService.draw(false, index);
    }

    return {
        checkRule : checkRule,
        notify : notify,
        notifyNeighbours : notifyNeighbours,
        draw : draw
    };
}