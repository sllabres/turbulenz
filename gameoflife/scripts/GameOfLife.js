/*jslint browser: true*/
// grid = new Grid(new RandomSeedGenerator(new CellDrawing(context, gridWidth, cellWidth), gridWidth).generate(), new NeighbourhoodWatch(gridWidth)),
/*global TurbulenzEngine,Canvas,Draw2D,Grid,RandomSeedGenerator,CellDrawing,NeighbourhoodWatch*/
TurbulenzEngine.onload = function onload() {
    "use strict";
    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
		mathsDevice = TurbulenzEngine.createMathDevice({}),
		drawing = Draw2D.create({ graphicsDevice : graphicsDevice }),
		gridWidth = 20,
		cellWidth = 10,
		gameWidth = graphicsDevice.width,
		gameHeight = graphicsDevice.height,
		viewport = mathsDevice.v4Build(0, 0, gameWidth, gameHeight),
		configureParams = {
			scaleMode : undefined,
			viewportRectangle : viewport
		};

    function update() {
		graphicsDevice.beginFrame();
		drawing.setBackBuffer();
		drawing.clear();
		drawing.begin();
		drawing.draw({ destinationRectangle : [0, 0, 10, 10] });		
		drawing.draw({ destinationRectangle : [10, 10, 20, 20] });
		drawing.end();
		graphicsDevice.endFrame();
    }

    TurbulenzEngine.onunload = function gameOnunload() {
		graphicsDevice = null;
		mathsDevice = null;
	};

    TurbulenzEngine.setInterval(update, 1000 / 60);
};