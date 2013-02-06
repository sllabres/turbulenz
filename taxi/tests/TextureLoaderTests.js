/*global module, equal, test*/
(function () {
	"use strict";
	module("Given texture loader");
	test("When constructed Then TextureManager created with GraphicsDevice", function() {
		var expectedGraphicsDevice = "GraphicsDevice",
			receivedGraphicsDevice = "",
			textureManagerMock = { create: function(graphicsDevice) { receivedGraphicsDevice = graphicsDevice } },
			textureLoader = new TextureLoader(textureManagerMock, expectedGraphicsDevice)	

		equal(expectedGraphicsDevice, receivedGraphicsDevice);
	});

	test("When constructed Then TextureManager created with RequestHandler", function() {
		var expectedRequestHandler = "RequestHandler",
			receivedRequestHandler = "",
			textureManagerMock = { create: function(graphicsDevice, requestHandler) { receivedRequestHandler = requestHandler } },
			textureLoader = new TextureLoader(textureManagerMock, { }, expectedRequestHandler)

		equal(expectedRequestHandler, receivedRequestHandler);
	});
}());

function TextureLoader(textureManagerFactory, graphicsDevice, requestHandler) {
	"use strict";
	textureManagerFactory.create(graphicsDevice, requestHandler);	
}