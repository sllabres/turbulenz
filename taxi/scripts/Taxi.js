 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
/*(function() {
	var turbulenzGameLoader = new TurbulenzGameLoader(RequestHandler, TurbulenzEngine, TurbulenzServices);		
	TurbulenzEngine.onload = function onload() {
		//	turbulenzGameLoader.load();
	};
}());*/

 function Game(backgroundDrawing) {
	"use strict";
	function update() {
		backgroundDrawing.draw();
	}

	return { update : update };
}

 function BackgroundDrawing(drawAcl) {
	"use strict";
	function draw() {
		drawAcl.draw("Sky");
	}

	return { draw : draw };
}

 function DrawAcl(graphicsDevice) {
	"use strict";
	var draw2D = Draw2D.create({ graphicsDevice : graphicsDevice }),    	
    	background;

    draw2D.configure({ viewportRectangle : [0, 0, graphicsDevice.width, graphicsDevice.height], scaleMode : 'scale' });    

    function draw() {
    	if (graphicsDevice.beginFrame()) {
			draw2D.setBackBuffer();
			draw2D.clear([0.3,0.3,0.3,1]);
			draw2D.begin('alpha');			
			draw2D.drawSprite(background);
			draw2D.end();
			graphicsDevice.endFrame();
		}
    }

    function setBackground(backgroundAsset) {
    	background = backgroundAsset;
    }

    return { draw: draw,
    		 setBackground : setBackground };
}

 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices*/
(function() {	
	TurbulenzEngine.onload = function onload() {

		var requestHandler = RequestHandler.create({}),
			graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
			drawAcl = new DrawAcl(graphicsDevice),			
			backgroundDrawing = new BackgroundDrawing(drawAcl),
			game = new Game(backgroundDrawing),
			textureManager = TextureManager.create(graphicsDevice, requestHandler);

		TurbulenzServices.createGameSession(requestHandler, sessionCreated);

		function sessionCreated(gameSession) {

			var onload = function onloadFn(textureInstance) {
				drawAcl.setBackground(Draw2DSprite.create({
							origin: [0,0],
							texture : texture,
							height : graphicsDevice.height,
							width : graphicsDevice.width
							}));

				//alert(textureInstance);
			};

			alert("loadTexture");		
			//var texture = textureManager.load("textures/Sky.jpg", true, onload);

			TurbulenzServices.createMappingTable(requestHandler,
				gameSession,
				function (table) {
					var texture = textureManager.load(table.getURL("textures/Sky.jpg"), true, onload);					

					TurbulenzEngine.setInterval(game.update, 1000 / 60);
				});
		}		
	};
}());