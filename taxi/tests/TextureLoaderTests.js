/*global module, equal, test*/
(function () {
	"use strict";
	module("Given texture loader");
	test("When constructed Then TextureManager created with GraphicsDevice", function() {
		var expectedGraphicsDevice = "GraphicsDevice",
			receivedGraphicsDevice = "",
			textureManagerFactoryMock = { create : function(graphicsDevice) { receivedGraphicsDevice = graphicsDevice } },
			textureLoader = new TextureLoader(textureManagerFactoryMock, expectedGraphicsDevice);

		equal(expectedGraphicsDevice, receivedGraphicsDevice);
	});

	test("When constructed Then TextureManager created with RequestHandler", function() {
		var expectedRequestHandler = "RequestHandler",
			receivedRequestHandler = "",
			textureManagerFactoryMock = { create : function(graphicsDevice, requestHandler) { receivedRequestHandler = requestHandler } },
			textureLoader = new TextureLoader(textureManagerFactoryMock, { }, expectedRequestHandler);

		equal(expectedRequestHandler, receivedRequestHandler);
	});

	test("When load called Then TextureManager load called", function() {
		var textureManagerLoadCalled = false,
			textureManagerMock = { load : function() { textureManagerLoadCalled = true; } },
			textureManagerFactoryMock = { create : function(graphicsDevice, requestHandler) { return textureManagerMock; } },
			textureLoader = new TextureLoader(textureManagerFactoryMock, { }, { });

		textureLoader.load();

		ok(textureManagerLoadCalled);
	});
}());

function TextureLoader(textureManagerFactory, graphicsDevice, requestHandler) {
	"use strict";
	var textureManager = textureManagerFactory.create(graphicsDevice, requestHandler);

	function load() {
		textureManager.load();
	}

	return { load : load };
}