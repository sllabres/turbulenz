/*{{ javascript('jslib/camera.js') }}*/
 /*{{ javascript("scripts/htmlcontrols.js") }}*/
/*jslint browser: true*/
/*global TurbulenzEngine*/
TurbulenzEngine.onload = function onloadFn() {
    "use strict";
    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
    	htmlControls = HTMLControls.create();
    
    htmlControls.addCheckboxControl({
        id: "checkbox01"
    });
    htmlControls.register();

    function tick() {
        if (graphicsDevice.beginFrame()) {
            graphicsDevice.clear([0.0, 0.0, 0.0, 1.0], 1.0, 0.0);
            graphicsDevice.endFrame();
        }
    }

    // Controls
    

    TurbulenzEngine.setInterval(tick, 1000 / 60);
};