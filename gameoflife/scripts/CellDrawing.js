function CellDrawing(context, gridWidth, cellWidth) {
    "use strict";

    if(cellWidth == undefined) {
        cellWidth = 1;
    }

    function getCellColour(isAlive) {
        return isAlive ? '#FFFFFF' : '#000000';
    }

    function draw(isAlive, index) {
        var xCoordinate = (index % gridWidth) * cellWidth,
            yCoordinate = (Math.round(index / gridWidth)) * cellWidth;

        context.fillStyle = getCellColour(isAlive);
        context.fillRect(xCoordinate, yCoordinate, 10, 10);
    }

    return { draw : draw };
}