/*jslint browser: true*/
/*global TurbulenzEngine,Canvas,Draw2D,Grid,RandomSeedGenerator,CellDrawing,NeighbourhoodWatch*/
TurbulenzEngine.onload = function onload() {
    "use strict";
    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
		mathsDevice = TurbulenzEngine.createMathDevice({}),
		drawing = Draw2D.create({ graphicsDevice : graphicsDevice }),
		gridWidth = 50,
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
		if(graphicsDevice.beginFrame()) {			
			drawing.setBackBuffer();		
			drawing.clear();
			drawing.begin();		
			grid.draw();
			drawing.end();
			graphicsDevice.endFrame();
		}
    }

    TurbulenzEngine.onunload = function gameOnunload() {
		graphicsDevice = null;
		mathsDevice = null;
		grid = null;
		drawing = null;
		viewport = null;
		configureParams = null;
	};

    TurbulenzEngine.setInterval(update, 1000 / 60);
    TurbulenzEngine.setInterval(grid.update, 150);
};