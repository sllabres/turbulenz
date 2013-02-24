/*global module, equal, test*/
(function () {
	"use strict";
	module("Given game");
	test("When update called Then sky background drawn", function() {
		var expectedSpriteName = "Sky.jpg",
			receivedSpriteName = "",
			drawing = { draw : function(spriteName) { receivedSpriteName = spriteName;  } },
			game = new Game(drawing);

		game.update();
		
		equal(expectedSpriteName, receivedSpriteName);
	});
}());

function Game(drawingService) {
	function update() {
		drawingService.draw("Sky.jpg");
	}

	return { update : update };
}