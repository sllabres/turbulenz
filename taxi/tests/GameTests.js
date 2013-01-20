/*global module, equal, test*/
(function () {
	"use strict";
	module("Given game started");
	test("When updating, Then draw background", function () {
		var backgroundDrawn = false,
			backGroundDrawing = { draw : function() { backgroundDrawn = true; } },
			game = new Game(backGroundDrawing);
			game.update();
			
		ok(backgroundDrawn);
	});
}());

function Game(backgroundDrawing) {
	"use strict";
	function update() {
		backgroundDrawing.draw();
	}

	return { update : update };
}