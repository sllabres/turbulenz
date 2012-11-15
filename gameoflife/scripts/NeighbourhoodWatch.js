function NeighbourhoodWatch(gridWidth) {
    "use strict";

    function getStartIndex(cellIndex) {
        var startIndex = cellIndex - gridWidth - 1;

        if (startIndex < 0) {
            startIndex = 0;
        }

        return startIndex;
    }

    function getEndIndex(cellIndex, maxIndex) {
        var endIndex = cellIndex + gridWidth + 1;

        if (endIndex >= maxIndex) {
            endIndex = maxIndex - 1;
        }

        return endIndex;
    }

    function isCellWithinBounds(cellIndex, currentIndex) {
        var cellX = cellIndex % gridWidth,
            cellY = Math.floor(cellIndex / gridWidth),
            currX = currentIndex % gridWidth,
            currY = Math.floor(currentIndex / gridWidth),
            x = cellX - currX,
            y = cellY - currY;

        return (x >= -1 && x <= 1) && (y >= -1 && y <= 1) && (cellIndex !== currentIndex);
    }

    function getNeighbours(cells, cellIndex) {
        var neighbours = [],
            startIndex = getStartIndex(cellIndex),
            endIndex = getEndIndex(cellIndex, cells.length),
            currentIndex = startIndex;

        for (currentIndex; currentIndex <= endIndex; currentIndex += 1) {
            if (isCellWithinBounds(cellIndex, currentIndex)) {
                neighbours.push(cells[currentIndex]);
            }
        }

        return neighbours;
    }

    return {
        getNeighbours : getNeighbours
    };
}