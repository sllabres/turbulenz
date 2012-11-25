/*global module, equal, test*/
(function () {
	"use strict";
	module("Game started");
	test("Calling update, draws", function () {
		var drawCalled = false,
			renderer = { draw : function () {
				drawCalled = true;
			}},
			game = new Game(renderer);

		game.update();

		equal(drawCalled, true);
	});

	test("Update not called, draw not called", function () {
		var drawCalled = false,
			renderer = { draw : function () {
				drawCalled = true;
			}},
			game = new Game(renderer);		

		equal(drawCalled, false);
	});
}());