/*global module, equal, test*/
(function () {
	"use strict";
	module("Given game loaded");
	test("Then create RequestHandler", function () {
		var requestHandlerCreated = false,
			RequestHandler = { create : function() { requestHandlerCreated = true; } },
			game = new Game(RequestHandler);

		game.load();
		
		ok(requestHandlerCreated);
	});

	module("Given game started");
	test("When updating, Then draw background", function () {
		var drawCalled = false,
			requestHandlerStub = {},
			backGroundDrawing = { draw : function() { drawCalled = true; } },
			game = new Game(requestHandlerStub, backGroundDrawing);
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

	test("When drawing, Then drawAcl is called with sky background", function () {
		var backgroundImage = "",
			drawAcl = { draw : function(image) { backgroundImage = image }},
			backgroundDrawing = new BackgroundDrawing(drawAcl);
			backgroundDrawing.draw();;

			equal(backgroundImage, "Sky");
	});
}());

function Game(requestHandlerFactory, backgroundDrawing) {
	"use strict";
	var requestHandler = {};

	function update() {
		backgroundDrawing.draw();
	}

	function load() {
		requestHandler = requestHandlerFactory.create({});
	}

	return { load : load, 
			 update : update };
}

