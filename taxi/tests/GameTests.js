/*global module, equal, test*/
(function () {
	"use strict";
	module("Given game started");
	test("When updating, Then draw background", function () {
		var drawCalled = false,
			backGroundDrawing = { draw : function() { drawCalled = true; } },
			game = new Game(backGroundDrawing);
			game.update();

		ok(drawCalled);
	});

	module("Given drawing background");
	test("When drawing, Then drawACL is called", function () {
		var drawCalled = false,
			drawAcl = { draw : function() { drawCalled = true; }},
			backgroundDrawing = new BackgroundDrawing(drawAcl);

		backgroundDrawing.draw();

		ok(drawCalled);
	});
}());

function Game(backgroundDrawing) {
	"use strict";
	function update() {
		backgroundDrawing.draw();
	}

	return { update : update };
}

function BackgroundDrawing(drawAcl) {
	"use strict";
	function draw() {
		drawAcl.draw();
	}

	return { draw : draw };
}