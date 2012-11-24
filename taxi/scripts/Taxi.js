/*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices,Canvas,Draw2D*/
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
		},
		requestHandler = RequestHandler.create({});

    function update() {
		if(graphicsDevice.beginFrame()) {			
			drawing.setBackBuffer();		
			drawing.clear([0.1,0.1,0.2,1]);
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

	function sessionCreated(gameSession) {
		TurbulenzServices.createMappingTable(requestHandler,
			gameSession,
			function (table) {
			});
	}

	TurbulenzServices.createGameSession(requestHandler, sessionCreated);
    TurbulenzEngine.setInterval(update, 1000 / 60);
};

