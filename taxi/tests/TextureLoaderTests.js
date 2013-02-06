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

	test("When load called Then TextureManager add called with texture name", function() {
		var expectedTextureName = "textureName",
			expectedTexture = { },
			receivedTextureName = "",
			textureManagerMock = { load : function(path, nomipmaps, onload) { onload(expectedTexture); }, add : function(name, texture) { receivedTextureName = name; } },
			textureManagerFactoryMock = { create : function(graphicsDevice, requestHandler) { return textureManagerMock; } },
			textureLoader = new TextureLoader(textureManagerFactoryMock, { }, { });

		expectedTexture.name = expectedTextureName;

		textureLoader.load();

		equal(receivedTextureName, expectedTexture);		
	});

	test("When load called Then TextureManager add called with returned texture", function() {
		var expectedTexture = "texture",
			receivedTexture = "",
			textureManagerMock = { load : function(path, nomipmaps, onload) { onload(expectedTexture); }, add : function(texture) { receivedTexture = texture; } },
			textureManagerFactoryMock = { create : function(graphicsDevice, requestHandler) { return textureManagerMock; } },
			textureLoader = new TextureLoader(textureManagerFactoryMock, { }, { });

		textureLoader.load();

		equal(receivedTexture, expectedTexture);		
	});
}());

function TextureLoader(textureManagerFactory, graphicsDevice, requestHandler) {
	"use strict";
	var textureManager = textureManagerFactory.create(graphicsDevice, requestHandler);

	function onload(texture) {
		textureManager.add(texture);
	}

	function load(path) {
		textureManager.load(path, false, onload);
	}

	return { load : load };
}