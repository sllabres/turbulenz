/*global module, equal, test, ok*/
var TurbulenzEngine = {};

function Renderer() {
	TurbulenzEngine.createGraphicsDevice();
}

(function () {
	"use strict";
	module("Renderer");
	test("On construction, createGraphicsDevice called", function () {
		var createGraphicsDeviceCalled = false;

		TurbulenzEngine.createGraphicsDevice = function () {
			createGraphicsDeviceCalled = true;
		};

		new Renderer();

		ok(createGraphicsDeviceCalled);
	});

}());