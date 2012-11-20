/*jslint browser: true*/
/*global TurbulenzEngine,Canvas,Draw2D,Grid,RandomSeedGenerator,CellDrawing,NeighbourhoodWatch*/
TurbulenzEngine.onload = function onload() {
    "use strict";
    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
		mathsDevice = TurbulenzEngine.createMathDevice({}),
		drawing = Draw2D.create({ graphicsDevice : graphicsDevice }),
		gridWidth = 30,
		cellWidth = 10,
		gameWidth = graphicsDevice.width,
		gameHeight = graphicsDevice.height,
		viewport = mathsDevice.v4Build(0, 0, gameWidth, gameHeight),
		configureParams = {
			scaleMode : undefined,
			viewportRectangle : viewport
		},
		grid = new Grid(new RandomSeedGenerator(new CellDrawing(drawing, gridWidth, cellWidth), gridWidth).generate(), new NeighbourhoodWatch(gridWidth));

    function update() {
		graphicsDevice.beginFrame();		
		drawing.begin();		
		grid.draw();
		drawing.end();
		graphicsDevice.endFrame();
    }

    TurbulenzEngine.onunload = function gameOnunload() {
		graphicsDevice = null;
		mathsDevice = null;
	};

    TurbulenzEngine.setInterval(update, 1000 / 60);
    TurbulenzEngine.setInterval(grid.update, 250);
};