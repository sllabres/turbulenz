/*jslint browser: true*/
/*global TurbulenzEngine,Camera,Floor,CameraController*/
TurbulenzEngine.onload = function onload() {
    "use strict";
    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
		mathsDevice = TurbulenzEngine.createMathDevice({}),
		camera = Camera.create(mathsDevice),
		floor = Floor.create(graphicsDevice, mathsDevice),
		inputDeviceOptions = {},
		inputDevice = TurbulenzEngine.createInputDevice(inputDeviceOptions),
		cameraController = CameraController.create(graphicsDevice, inputDevice, camera);

	camera.lookAt(mathsDevice.v3BuildZero(),
	              mathsDevice.v3Build(0, 1, 0),
	              mathsDevice.v3Build(0, 20, 100));

    function tick() {
        if (graphicsDevice.beginFrame()) {
            graphicsDevice.clear([0.0, 0.0, 0.0, 1.0], 1.0, 0.0);
            camera.updateViewMatrix();
			camera.updateViewProjectionMatrix();
			floor.render(graphicsDevice, camera);
            graphicsDevice.endFrame();
        }

        inputDevice.update();
        cameraController.update();
    }

    TurbulenzEngine.onunload = function gameOnunload() {
		floor = null;
		camera = null;
		mathsDevice = null;
		graphicsDevice = null;
		cameraController = null;
		inputDevice = null;
	};

    TurbulenzEngine.setInterval(tick, 1000 / 60);
};