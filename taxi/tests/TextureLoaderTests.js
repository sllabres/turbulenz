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
}());

function TextureLoader(textureManager) {
	"use strict";
	function load() {
		textureManager.create();
	}

	return { load : load };
}