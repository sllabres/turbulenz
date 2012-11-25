/*global module, equal, test, ok*/
function Renderer(turbulenzEngine, draw2d) {
	"use strict";
	var graphicsDevice = turbulenzEngine.createGraphicsDevice({}),
		drawing = draw2d.create(graphicsDevice);

	function draw() {
		if (graphicsDevice.beginFrame()) {
			drawing.setBackBuffer();
			drawing.clear();
		}
	}

	return { draw : draw };
}

(function () {
	"use strict";
	module("Renderer");
	test("On construction, createGraphicsDevice called with params", function () {
		var createGraphicsDeviceCalledWithParams = false,
			turbulenzEngineMock = { createGraphicsDevice : function (params) { if (!!params) { createGraphicsDeviceCalledWithParams = true; } } },
			draw2dStub = { create : function (graphicsDevice) {	} },
			renderer = new Renderer(turbulenzEngineMock, draw2dStub);

		ok(createGraphicsDeviceCalledWithParams);
	});

	test("On construction, Draw2d create called with graphics device", function () {
		var expectedGraphicsDevice = "graphisDevice",
			passedGraphicsDevice = "",
			turbulenzEngineStub = { createGraphicsDevice : function () { return expectedGraphicsDevice;	} },
			draw2dStub = { create : function (graphicsDevice) { passedGraphicsDevice = graphicsDevice; } },
			renderer = new Renderer(turbulenzEngineStub, draw2dStub);

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
			graphicsDeviceStub = { beginFrame : function () { return true; } },
			turbulenzEngineStub = { createGraphicsDevice : function () { return graphicsDeviceStub; } },
			drawingMock = { setBackBuffer : function () { setBackBufferCalled = true; },
				clear : function () { } },
			draw2dStub = { create : function () { return drawingMock; } },
			renderer = new Renderer(turbulenzEngineStub, draw2dStub);

		renderer.draw();

		ok(setBackBufferCalled);
	});

	test("On draw when beginFrame is false, draw2d setBackBuffer not called", function () {
		var setBackBufferCalled = false,
			graphicsDeviceStub = { beginFrame : function () { return false; } },
			turbulenzEngineStub = { createGraphicsDevice : function () { return graphicsDeviceStub; } },
			drawingMock = { setBackBuffer : function () { setBackBufferCalled = true; },
				clear : function () { } },
			draw2dStub = { create : function () { return drawingMock; } },
			renderer = new Renderer(turbulenzEngineStub, draw2dStub);

		renderer.draw();

		equal(setBackBufferCalled, false);
	});

	test("On draw and beginFrame is true, draw2d clear called", function () {
		var clearCalled = false,
			graphicsDeviceStub = { beginFrame : function () { return true; } },
			turbulenzEngineStub = { createGraphicsDevice : function () { return graphicsDeviceStub; } },
			drawingMock = { setBackBuffer : function () { },
				clear : function () { clearCalled = true; } },
			draw2dStub = { create : function () { return drawingMock; } },
			renderer = new Renderer(turbulenzEngineStub, draw2dStub);

		renderer.draw();

		ok(clearCalled);
	});
}());