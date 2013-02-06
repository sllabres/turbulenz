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
}());

function TextureLoader(textureManager, graphicsDevice) {
	"use strict";
	function load() {
		textureManager.create(graphicsDevice);
	}

	return { load : load };
}