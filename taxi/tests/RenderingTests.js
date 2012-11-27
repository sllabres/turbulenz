/*global module, equal, test, ok, Rendering */
(function () {
	"use strict";
	module("Rendering");
	test("On construction, Draw2d create called with graphics device", function () {
		var expectedGraphicsDevice = "graphisDevice",
			passedGraphicsDevice = "",
			draw2dStub = { create : function (params) { passedGraphicsDevice = params.graphicsDevice; } },
			renderer = new Rendering(draw2dStub, expectedGraphicsDevice);

		equal(expectedGraphicsDevice, passedGraphicsDevice);
	});

	test("On draw, begin frame called", function () {
		var beginFrameCalled = false,
			graphicsDeviceMock = { beginFrame : function () { beginFrameCalled = true; },
				endFrame : function () { } },
			draw2d = { create : function () { return { }; } },
			renderer = new Rendering(draw2d, graphicsDeviceMock);

		renderer.draw();

		ok(beginFrameCalled);
	});

	test("On draw, draw2d setBackBuffer called", function () {
		var setBackBufferCalled = false,
			graphicsDeviceStub = { beginFrame : function () { return true; },
				endFrame : function () { } },
			drawingMock = { setBackBuffer : function () { setBackBufferCalled = true; },
				clear : function () { },
				begin : function () { },
				drawSprite : function () { },
				end : function () { } },
			draw2dStub = { create : function () { return drawingMock; } },
			renderer = new Rendering(draw2dStub, graphicsDeviceStub);

		renderer.draw();

		ok(setBackBufferCalled);
	});

	test("On draw and beginFrame is true, clear called with RGBA [0, 0, 0, 0]", function () {
		var clearColour = [],
			expectedClearColour = [0, 0, 0, 0],
			graphicsDeviceStub = { beginFrame : function () { return true; },
				endFrame : function () { } },
			drawingStub = { setBackBuffer : function () { },
				clear : function (colour) { clearColour = colour; },
				begin : function () { },
				drawSprite : function () { },
				end : function () { } },
			draw2dStub = { create : function () { return drawingStub; } },
			renderer = new Rendering(draw2dStub, graphicsDeviceStub);

		renderer.draw(expectedClearColour);

		equal(expectedClearColour, clearColour);
	});

	test("On draw and beginFrame is true, begin called", function () {
		var beginCalled = false,
			graphicsDeviceStub = { beginFrame : function () { return true; },
				endFrame : function () { } },
			drawingMock = { setBackBuffer : function () { },
				clear : function () { },
				begin : function () { beginCalled = true; },
				drawSprite : function () { },
				end : function () { } },
			draw2dStub = { create : function () { return drawingMock; } },
			renderer = new Rendering(draw2dStub, graphicsDeviceStub);

		renderer.draw([]);

		equal(true, beginCalled);
	});

	test("On draw and beginFrame is true, begin called with blend mode alpha", function () {
		var passedBlendMode = "",
			graphicsDeviceStub = { beginFrame : function () { return true; },
				endFrame : function () { } },
			drawingMock = { setBackBuffer : function () { },
				clear : function () { },
				begin : function (blendMode) { passedBlendMode = blendMode; },
				drawSprite : function () { },
				end : function () { } },
			draw2dStub = { create : function () { return drawingMock; } },
			renderer = new Rendering(draw2dStub, graphicsDeviceStub);

		renderer.draw([]);

		equal('alpha', passedBlendMode);
	});

	test("On draw and beginFrame is true, end called", function () {
		var endCalled = false,
			graphicsDeviceStub = { beginFrame : function () { return true; },
				endFrame : function () { } },
			drawingMock = { setBackBuffer : function () { },
				clear : function () { },
				begin : function () { },
				drawSprite : function () { },
				end : function () { endCalled = true; } },
			draw2dStub = { create : function () { return drawingMock; } },
			renderer = new Rendering(draw2dStub, graphicsDeviceStub);

		renderer.draw([]);

		ok(endCalled);
	});

	test("On draw and beginFrame is true, endFrame called", function () {
		var endFrameCalled = false,
			graphicsDeviceStub = { beginFrame : function () { return true; },
				endFrame : function () { endFrameCalled = true; } },
			drawingStub = { setBackBuffer : function () { },
				clear : function () { },
				begin : function () { },
				drawSprite : function () { },
				end : function () { } },
			draw2dStub = { create : function () { return drawingStub; } },
			renderer = new Rendering(draw2dStub, graphicsDeviceStub);

		renderer.draw([]);

		ok(endFrameCalled);
	});

	test("On draw and beginFrame is true, spriteRenderCalled is true", function() {
		var spriteRenderCalled = false,
			graphicsDeviceStub = { beginFrame : function () { return true; },
				endFrame : function () { } },
			drawingStub = { setBackBuffer : function () { },
				clear : function () { },
				begin : function () { },
				drawSprite : function () { },
				end : function () { } },
			draw2dStub = { create : function () { return drawingStub; } },
			spriteRenderingMock = { render : function () { spriteRenderCalled = true; } },
			renderer = new Rendering(draw2dStub, graphicsDeviceStub, spriteRenderingMock);

		renderer.draw([]);

		equal(spriteRenderCalled, true);
	});
}());