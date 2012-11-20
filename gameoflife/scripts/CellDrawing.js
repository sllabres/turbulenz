function CellDrawing(context, gridWidth) {
    "use strict";
    function getCellColour(isAlive) {
        return isAlive ? '#FFFFFF' : '#000000';
    }

    function draw(isAlive, index) {
        var xCoordinate = index % gridWidth,
            yCoordinate = Math.round(index / gridWidth);

        context.fillStyle = getCellColour(isAlive);
        context.fillRect(xCoordinate, yCoordinate, 10, 10);
    }
    
    return { draw : draw };
}