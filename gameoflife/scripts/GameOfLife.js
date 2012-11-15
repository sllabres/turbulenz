/*{{ javascript('jslib/camera.js') }}*/
 /*{{ javascript("jslib/htmlcontrols.js") }}*/
 /*{{ javascript('jslib/camera.js') }}*/
/*{{ javascript('jslib/floor.js') }}*/

/*jslint browser: true*/
/*global TurbulenzEngine,Camera,Floor*/
TurbulenzEngine.onload = function onload() {
    "use strict";
    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
		mathsDevice = TurbulenzEngine.createMathDevice({}),
		camera = Camera.create(mathsDevice),
		floor = Floor.create(graphicsDevice, mathsDevice);

	camera.lookAt(mathsDevice.v3BuildZero(),
	              mathsDevice.v3Build(0, 1, 0),
	              mathsDevice.v3Build(0, 20, 100));

    function tick() {
        if (graphicsDevice.beginFrame()) {
            graphicsDevice.clear([0.0, 0.0, 0.0, 1.0], 1.0, 0.0);
            graphicsDevice.endFrame();
        }
    }

    TurbulenzEngine.setInterval(tick, 1000 / 60);
};