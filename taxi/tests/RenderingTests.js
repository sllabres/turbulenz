/*global module, equal, test, ok, Rendering */
(function () {
	"use strict";
	module("Rendering");
	test("On render, begin frame called", function () {
		var beginFrameCalled = false,
			graphicsDeviceMock = { beginFrame : function () { beginFrameCalled = true; },
				endFrame : function () { } },
			draw2d = { create : function () { return { }; } },
			renderer = new Rendering(draw2d, graphicsDeviceMock);

		renderer.render();

		ok(beginFrameCalled);
	});

	test("On render, draw2d setBackBuffer called", function () {
		var setBackBufferCalled = false,
			graphicsDeviceStub = { beginFrame : function () { return true; },
				endFrame : function () { } },
			drawingMock = { setBackBuffer : function () { setBackBufferCalled = true; },
				clear : function () { },
				begin : function () { },
				end : function () { } },
			spriteRenderingMock = { render : function () { } },
			renderer = new Rendering(drawingMock, graphicsDeviceStub, spriteRenderingMock);

		renderer.render();

		ok(setBackBufferCalled);
	});

	test("On render and beginFrame is true, clear called with RGBA [0, 0, 0, 0]", function () {
		var clearColour = [],
			expectedClearColour = [0, 0, 0, 0],
			graphicsDeviceStub = { beginFrame : function () { return true; },
				endFrame : function () { } },
			drawingStub = { setBackBuffer : function () { },
				clear : function (colour) { clearColour = colour; },
				begin : function () { },
				end : function () { } },
			spriteRenderingMock = { render : function () { } },
			renderer = new Rendering(drawingStub, graphicsDeviceStub, spriteRenderingMock);

		renderer.render(expectedClearColour);

		equal(expectedClearColour, clearColour);
	});

	test("On render and beginFrame is true, begin called", function () {
		var beginCalled = false,
			graphicsDeviceStub = { beginFrame : function () { return true; },
				endFrame : function () { } },
			drawingMock = { setBackBuffer : function () { },
				clear : function () { },
				begin : function () { beginCalled = true; },
				end : function () { } },
			spriteRenderingMock = { render : function () { } },
			renderer = new Rendering(drawingMock, graphicsDeviceStub, spriteRenderingMock);

		renderer.render();

		equal(true, beginCalled);
	});

	test("On render and beginFrame is true, begin called with blend mode alpha", function () {
		var passedBlendMode = "",
			graphicsDeviceStub = { beginFrame : function () { return true; },
				endFrame : function () { } },
			drawingMock = { setBackBuffer : function () { },
				clear : function () { },
				begin : function (blendMode) { passedBlendMode = blendMode; },
				end : function () { } },
			spriteRenderingMock = { render : function () { } },
			renderer = new Rendering(drawingMock, graphicsDeviceStub, spriteRenderingMock);

		renderer.render();

		equal('alpha', passedBlendMode);
	});

	test("On render and beginFrame is true, end called", function () {
		var endCalled = false,
			graphicsDeviceStub = { beginFrame : function () { return true; },
				endFrame : function () { } },
			drawingMock = { setBackBuffer : function () { },
				clear : function () { },
				begin : function () { },
				end : function () { endCalled = true; } },
			spriteRenderingMock = { render : function () { } },
			renderer = new Rendering(drawingMock, graphicsDeviceStub, spriteRenderingMock);

		renderer.render();

		ok(endCalled);
	});

	test("On render and beginFrame is true, endFrame called", function () {
		var endFrameCalled = false,
			graphicsDeviceStub = { beginFrame : function () { return true; },
				endFrame : function () { endFrameCalled = true; } },
			drawingStub = { setBackBuffer : function () { },
				clear : function () { },
				begin : function () { },
				end : function () { } },
			spriteRenderingMock = { render : function () { } },
			renderer = new Rendering(drawingStub, graphicsDeviceStub, spriteRenderingMock);

		renderer.render();

		ok(endFrameCalled);
	});

	test("On render and beginFrame is true, spriteRenderCalled is true", function() {
		var spriteRenderCalled = false,
			graphicsDeviceStub = { beginFrame : function () { return true; },
				endFrame : function () { } },
			drawingStub = { setBackBuffer : function () { },
				clear : function () { },
				begin : function () { },
				end : function () { } },
			spriteRenderingMock = { render : function () { spriteRenderCalled = true; } },
			renderer = new Rendering(drawingStub, graphicsDeviceStub, spriteRenderingMock);

		renderer.render();

		equal(spriteRenderCalled, true);
	});
}());