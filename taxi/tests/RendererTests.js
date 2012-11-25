/*global module, equal, test, ok*/
var TurbulenzEngine = {};

function Renderer() {
	TurbulenzEngine.createGraphicsDevice({});
}

(function () {
	"use strict";
	module("Renderer");
	test("On construction, createGraphicsDevice called with params", function () {
		var createGraphicsDeviceCalledWithParams = false;

		TurbulenzEngine.createGraphicsDevice = function (params) {
			if(!!params) {
				createGraphicsDeviceCalledWithParams = true;
			}
		};

		new Renderer();

		ok(createGraphicsDeviceCalledWithParams);
	});
}());