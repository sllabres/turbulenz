/*global module, equal, test, ok*/
function Renderer(turbulenzEngine, draw2d) {
	"use strict";
	var graphicsDevice = turbulenzEngine.createGraphicsDevice({}),
		drwaing = draw2d.create(graphicsDevice);
}

(function () {
	"use strict";
	module("Renderer");
	test("On construction, createGraphicsDevice called with params", function () {
		var createGraphicsDeviceCalledWithParams = false,
			turbulenzEngine = { createGraphicsDevice : function (params) {
				if (!!params) {
					createGraphicsDeviceCalledWithParams = true;
				}
			}
				},
			draw2d = { create : function (graphicsDevice) {	} },
			renderer = new Renderer(turbulenzEngine, draw2d);

		ok(createGraphicsDeviceCalledWithParams);
	});

	test("On construction, Draw2d create called with graphics device", function () {
		var draw2dCreateCalled = false,
			expectedGraphicsDevice = "graphisDevice",
			passedGraphicsDevice = "",
			turbulenzEngine = { createGraphicsDevice : function () {
				return expectedGraphicsDevice;
			}
				},
			draw2d = { create : function (graphicsDevice) {
				passedGraphicsDevice = graphicsDevice;
			}
				},
			renderer = new Renderer(turbulenzEngine, draw2d);

		equal(expectedGraphicsDevice, passedGraphicsDevice);
	});
}());