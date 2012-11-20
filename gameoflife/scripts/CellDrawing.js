function CellDrawing(boxDrawing, gridWidth, cellWidth) {
    "use strict";

    if(cellWidth == undefined) {
        cellWidth = 1;
    }

    function draw(isAlive, index) {
        if(isAlive) {
            var xCoordinate = (index % gridWidth) * cellWidth,
                yCoordinate = (Math.round(index / gridWidth)) * cellWidth;

            boxDrawing.draw({ destinationRectangle : [xCoordinate, yCoordinate, xCoordinate + cellWidth, yCoordinate + cellWidth] });
        }
    }

    return { draw : draw };
}