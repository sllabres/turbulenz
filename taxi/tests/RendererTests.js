/*global module, equal, test, ok*/
function Renderer(turbulenzEngine, draw2d) {
	"use strict";
	var graphicsDevice = turbulenzEngine.createGraphicsDevice({}),
		drawing = draw2d.create(graphicsDevice);

	function draw() {
		graphicsDevice.beginFrame();
		drawing.setBackBuffer();
	}

	return { draw : draw };
}

(function () {
	"use strict";
	module("Renderer");
	test("On construction, createGraphicsDevice called with params", function () {
		var createGraphicsDeviceCalledWithParams = false,
			turbulenzEngine = { createGraphicsDevice : function (params) { if (!!params) { createGraphicsDeviceCalledWithParams = true; } } },
			draw2d = { create : function (graphicsDevice) {	} },
			renderer = new Renderer(turbulenzEngine, draw2d);

		ok(createGraphicsDeviceCalledWithParams);
	});

	test("On construction, Draw2d create called with graphics device", function () {
		var draw2dCreateCalled = false,
			expectedGraphicsDevice = "graphisDevice",
			passedGraphicsDevice = "",
			turbulenzEngine = { createGraphicsDevice : function () { return expectedGraphicsDevice;	} },
			draw2d = { create : function (graphicsDevice) { passedGraphicsDevice = graphicsDevice; } },
			renderer = new Renderer(turbulenzEngine, draw2d);

		equal(expectedGraphicsDevice, passedGraphicsDevice);
	});

	test("On draw, begin frame called", function () {
		var beginFrameCalled = false,
			graphicsDeviceMock = { beginFrame : function () { beginFrameCalled = true; } },			
			turbulenzEngineStub = { createGraphicsDevice : function () { return graphicsDeviceMock; } },
			drawingStub = { setBackBuffer : function () { } },
			draw2d = { create : function () { return drawingStub; } },
			renderer = new Renderer(turbulenzEngineStub, draw2d);

		renderer.draw();

		ok(beginFrameCalled);
	});

	test("On draw, draw2d setBackBuffer called", function () {
		var setBackBufferCalled = false,
			graphicsDeviceStub = { beginFrame : function () { } },			
			turbulenzEngineStub = { createGraphicsDevice : function () { return graphicsDeviceStub; } },
			drawingMock = { setBackBuffer : function () { setBackBufferCalled = true; } },
			draw2dStub = { create : function () { return drawingMock; } },
			renderer = new Renderer(turbulenzEngineStub, draw2dStub);

		renderer.draw();

		ok(setBackBufferCalled);
	});
}());