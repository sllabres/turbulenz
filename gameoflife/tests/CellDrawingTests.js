(function () {
	"use strict";
	module("Given cell drawing on 3 * 3 grid");
	test("When cell drawing called for dead cell, then cell is black", function() {
	    var deadCellColour = '#000000',
	        gridWidth = 3,
	        context = { fillRect : function() {} },
	        cellDrawing = new CellDrawing(context, gridWidth);

	    cellDrawing.draw(false);

	    equal(context.fillStyle, deadCellColour);
	});

	test("When cell drawing called for cell at index 0, then cell x coordinate is 0", function() {
	    var cellIndex = 0,
	        gridWidth = 3,
	        xCoordinate,
	        context = { fillRect : function (x, y, width, height) {
	            xCoordinate = x;
	        } },
	        cellDrawing = new CellDrawing(context, gridWidth);

	        cellDrawing.draw(true, cellIndex);

	    equal(xCoordinate, 0);
	});

	test("When cell drawing called for cell at index 0, then cell y coordinate is 0", function() {
	    var cellIndex = 0,
	        gridWidth = 3,
	        yCoordinate,
	        context = { fillRect : function (x, y, width, height) {
	            yCoordinate = y;
	        } },
	        cellDrawing = new CellDrawing(context, gridWidth);

	        cellDrawing.draw(true, cellIndex);

	    equal(yCoordinate, 0);
	});

	test("When cell drawing called for cell at index 1, then cell x coordinate is 1", function() {
	    var cellIndex = 1,
	        gridWidth = 3,
	        xCoordinate,
	        context = { fillRect : function (x, y, width, height) {
	            xCoordinate = x;
	        } },
	        cellDrawing = new CellDrawing(context, gridWidth);

	        cellDrawing.draw(true, cellIndex);

	    equal(xCoordinate, 1);
	});

	test("When cell drawing called for cell at index 3, then cell y coordinate is 1", function() {
	    var cellIndex = 3,
	        gridWidth = 3,
	        yCoordinate,
	        context = { fillRect : function (x, y, width, height) {
	            yCoordinate = y;
	        } },
	        cellDrawing = new CellDrawing(context, gridWidth);

	        cellDrawing.draw(true, cellIndex);

	    equal(yCoordinate, 1);
	});

	test("When cell drawing for cell at index 1 with cell width of 10, then x coordinate is 10", function() {
	    var cellIndex = 1,
	        gridWidth = 3,
	        cellWidth = 10,
	        xCoordinate,
	        context = { fillRect : function (x, y, width, height) {
	            xCoordinate = x;
	        } },
	        cellDrawing = new CellDrawing(context, gridWidth, cellWidth);

	        cellDrawing.draw(true, cellIndex);

	    equal(xCoordinate, 10);
	});

	test("When cell drawing for cell at index 3 with cell width of 10, then y coordinate is 10", function() {
	    var cellIndex = 3,
	        gridWidth = 3,
	        cellWidth = 10,
	        yCoordinate,
	        context = { fillRect : function (x, y, width, height) {
	            yCoordinate = y;
	        } },
	        cellDrawing = new CellDrawing(context, gridWidth, cellWidth);

	        cellDrawing.draw(true, cellIndex);

	    equal(yCoordinate, 10);
	});
}());