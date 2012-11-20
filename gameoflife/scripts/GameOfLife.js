/*jslint browser: true*/
/*global TurbulenzEngine,Canvas*/
TurbulenzEngine.onload = function onload() {
    "use strict";
    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
		mathsDevice = TurbulenzEngine.createMathDevice({}),
		canvas = Canvas.create(graphicsDevice, mathsDevice),
		context = canvas.getContext('2d'),
		gridWidth = 100,
		cellWidth = 10,
		grid = new Grid(new RandomSeedGenerator(new CellDrawing(context, gridWidth, cellWidth), gridWidth).generate(), new NeighbourhoodWatch(gridWidth));

    function update() {
		var deviceWidth, deviceHeight;

		if (graphicsDevice.beginFrame()) {
			deviceWidth = graphicsDevice.width;
			deviceHeight = graphicsDevice.height;

			if (canvas.width !== deviceWidth) {
				canvas.width = deviceWidth;
			}

			if (canvas.height !== deviceHeight) {
				canvas.height = deviceHeight;
			}

			context.beginFrame();
			
			grid.update();
			grid.draw();

			context.endFrame();
			graphicsDevice.endFrame();
		}
    }

    TurbulenzEngine.onunload = function gameOnunload() {
		graphicsDevice = null;
		mathsDevice = null;
		canvas = null;
		context = null;
	};

    TurbulenzEngine.setInterval(update, 1000 / 60);
};