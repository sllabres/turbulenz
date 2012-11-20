/*jslint browser: true*/
/*global TurbulenzEngine,Canvas*/
TurbulenzEngine.onload = function onload() {
    "use strict";
    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
		mathsDevice = TurbulenzEngine.createMathDevice({}),
		canvas = Canvas.create(graphicsDevice, mathsDevice),
		context = canvas.getContext('2d');

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

			context.endFrame();
			graphicsDevice.endFrame();
		}
    }

    TurbulenzEngine.onunload = function gameOnunload() {
	};

    TurbulenzEngine.setInterval(update, 1000 / 60);
};