/*global module, equal, test*/
(function () {
	"use strict";
	module("Given texture loader");
	test("When load called Then TextureManager created", function() {
		var textureManagerCreateCalled = false,
			textureManagerMock = { create : function() { textureManagerCreateCalled = true; } },
			textureLoader = new TextureLoader(textureManagerMock);

		textureLoader.load();

		ok(textureManagerCreateCalled);
	});

	test("When load called Then TextureManager created with GraphicsDevice", function() {
		var expectedGraphicsDevice = "GraphicsDevice",
			receivedGraphicsDevice = "",
			textureManagerMock = { create: function(graphicsDevice) { receivedGraphicsDevice = graphicsDevice } },
			textureLoader = new TextureLoader(textureManagerMock, expectedGraphicsDevice)

		textureLoader.load();

		equal(expectedGraphicsDevice, receivedGraphicsDevice);
	});

	test("When load called Then TextureManager created with RequestHandler", function() {
		var expectedRequestHandler = "RequestHandler",
			receivedRequestHandler = "",
			textureManagerMock = { create: function(graphicsDevice, requestHandler) { receivedRequestHandler = requestHandler } },
			textureLoader = new TextureLoader(textureManagerMock, { }, expectedRequestHandler)

		textureLoader.load();

		equal(expectedRequestHandler, receivedRequestHandler);
	});
}());

function TextureLoader(textureManager, graphicsDevice, requestHandler) {
	"use strict";
	function load() {
		textureManager.create(graphicsDevice, requestHandler);
	}

	return { load : load };
}