/*jslint browser: true*/
/*global TurbulenzEngine,Canvas*/
TurbulenzEngine.onload = function onload() {
    "use strict";
    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
		mathsDevice = TurbulenzEngine.createMathDevice({}),
		canvas = Canvas.create(graphicsDevice, mathsDevice),
		context = canvas.getContext('2d'),
		drawOnce = true;		

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

			context.fillStyle = '#FFFFFF';
			context.fillRect(0, 0, 10, 10);

			if (drawOnce) {
				drawOnce = false;
				context.fillRect(10, 10, 10, 10);
			}
			else {
				context.fillStyle = '#000000';
				context.fillRect(10, 10, 10, 10);
			}

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