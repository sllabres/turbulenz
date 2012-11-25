/*global module, equal, test, ok*/
function Renderer(turbulenzEngine, draw2d) {
	"use strict";
	var graphicsDevice = turbulenzEngine.createGraphicsDevice({}),
		drawing = draw2d.create(graphicsDevice);

	function draw(clearColour) {
		if (graphicsDevice.beginFrame()) {
			prepareDraw(clearColour);			
		}
	}

	function prepareDraw(clearColour) {
		drawing.setBackBuffer();
		drawing.clear(clearColour);
		drawing.begin('alpha');
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
			draw2d = { create : function () { return { }; } },
			renderer = new Renderer(turbulenzEngineStub, draw2d);

		renderer.draw();

		ok(beginFrameCalled);
	});

	test("On draw, draw2d setBackBuffer called", function () {
		var setBackBufferCalled = false,
			graphicsDeviceStub = { beginFrame : function () { return true; } },
			turbulenzEngineStub = { createGraphicsDevice : function () { return graphicsDeviceStub; } },
			drawingMock = { setBackBuffer : function () { setBackBufferCalled = true; },
				clear : function () { },
				begin : function () { } },
			draw2dStub = { create : function () { return drawingMock; } },
			renderer = new Renderer(turbulenzEngineStub, draw2dStub);

		renderer.draw();

		ok(setBackBufferCalled);
	});

	test("On draw and beginFrame is true, clear called with RGBA [0, 0, 0, 0]", function () {
		var clearColour = [],
			expectedClearColour = [0, 0, 0, 0],
			graphicsDeviceStub = { beginFrame : function () { return true; } },
			turbulenzEngineStub = { createGraphicsDevice : function () { return graphicsDeviceStub; } },
			drawingStub = { setBackBuffer : function () { },
				clear : function (colour) { clearColour = colour; },
				begin : function () { } },
			draw2dStub = { create : function () { return drawingStub; } },
			renderer = new Renderer(turbulenzEngineStub, draw2dStub);

		renderer.draw(expectedClearColour);

		equal(expectedClearColour, clearColour);
	});

	test("On draw and beginFrame is true, begin called", function () {
		var beginCalled = false,
			graphicsDeviceStub = { beginFrame : function () { return true; } },
			turbulenzEngineStub = { createGraphicsDevice : function () { return graphicsDeviceStub; } },
			drawingMock = { setBackBuffer : function () { },
				clear : function () { },
				begin : function () { beginCalled = true; } },
			draw2dStub = { create : function () { return drawingMock; } },
			renderer = new Renderer(turbulenzEngineStub, draw2dStub);

		renderer.draw([]);

		equal(true, beginCalled);
	});

	test("On draw and beginFrame is true, begin called with blend mode alpha", function () {
		var passedBlendMode = "",
			graphicsDeviceStub = { beginFrame : function () { return true; } },
			turbulenzEngineStub = { createGraphicsDevice : function () { return graphicsDeviceStub; } },
			drawingMock = { setBackBuffer : function () { },
				clear : function () { },
				begin : function (blendMode) { passedBlendMode = blendMode; } },
			draw2dStub = { create : function () { return drawingMock; } },
			renderer = new Renderer(turbulenzEngineStub, draw2dStub);

		renderer.draw([]);

		equal('alpha', passedBlendMode);
	});
}());