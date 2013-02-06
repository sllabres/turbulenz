/*global module, equal, test*/
(function () {
	"use strict";
	module("Given texture loader");
	test("When constructed Then TextureManager created with GraphicsDevice", function() {
		var expectedGraphicsDevice = "GraphicsDevice",
			receivedGraphicsDevice = "",
			textureManagerFactoryMock = { create : function(graphicsDevice) { receivedGraphicsDevice = graphicsDevice } },
			textureLoader = new TextureLoader(textureManagerFactoryMock, expectedGraphicsDevice);

		equal(receivedGraphicsDevice, expectedGraphicsDevice);
	});

	test("When constructed Then TextureManager created with RequestHandler", function() {
		var expectedRequestHandler = "RequestHandler",
			receivedRequestHandler = "",
			textureManagerFactoryMock = { create : function(graphicsDevice, requestHandler) { receivedRequestHandler = requestHandler } },
			textureLoader = new TextureLoader(textureManagerFactoryMock, { }, expectedRequestHandler);

		equal(receivedRequestHandler, expectedRequestHandler);
	});

	test("When load called with 'textures/Sky.jpg' Then TextureManager load called with 'textures/Sky.jpg'", function() {
		var expectedPath = "textures/Sky.jpg",
			receivedPath = "",
			textureManagerMock = { load : function(path) { receivedPath = path; } },
			textureManagerFactoryMock = { create : function(graphicsDevice, requestHandler) { return textureManagerMock; } },
			textureLoader = new TextureLoader(textureManagerFactoryMock, { }, { });

		textureLoader.load(expectedPath);

		equal(receivedPath, expectedPath);
	});

	test("When load called Then TextureManager load called with nomipmaps set as false", function() {
		var expectedNoMipMaps = false,
			receivedNoMipMaps = null,
			textureManagerMock = { load : function(path, nomipmaps) { receivedNoMipMaps = nomipmaps; } },
			textureManagerFactoryMock = { create : function(graphicsDevice, requestHandler) { return textureManagerMock; } },
			textureLoader = new TextureLoader(textureManagerFactoryMock, { }, { });

		textureLoader.load();

		equal(receivedNoMipMaps, expectedNoMipMaps);
	});

}());

function TextureLoader(textureManagerFactory, graphicsDevice, requestHandler) {
	"use strict";
	var textureManager = textureManagerFactory.create(graphicsDevice, requestHandler);

	function load(path) {
		textureManager.load(path, false);
	}

	return { load : load };
}