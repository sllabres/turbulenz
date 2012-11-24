/*jslint browser: true*/
/*global TurbulenzEngine,Canvas,Draw2D,Grid,RandomSeedGenerator,CellDrawing,NeighbourhoodWatch*/
TurbulenzEngine.onload = function onload() {
    "use strict";
    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
		mathsDevice = TurbulenzEngine.createMathDevice({}),
		drawing = Draw2D.create({ graphicsDevice : graphicsDevice }),
		gameWidth = graphicsDevice.width,
		gameHeight = graphicsDevice.height,
		viewport = mathsDevice.v4Build(0, 0, gameWidth, gameHeight),
		configureParams = {
			scaleMode : undefined,
			viewportRectangle : viewport
		};



    function update() {
		if(graphicsDevice.beginFrame()) {			
			drawing.setBackBuffer();		
			drawing.clear();
			drawing.begin();		
			
			drawing.end();
			graphicsDevice.endFrame();
		}
    }

    TurbulenzEngine.onunload = function gameOnunload() {
		graphicsDevice = null;
		mathsDevice = null;		
		drawing = null;
		viewport = null;
		configureParams = null;
	};

    TurbulenzEngine.setInterval(update, 1000 / 60);
};