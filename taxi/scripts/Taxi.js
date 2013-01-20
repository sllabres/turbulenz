 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices*/
(function() {
	TurbulenzEngine.onload = function onload() {
		var requestHandler = RequestHandler.create({}),
			graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
			drawAcl = new DrawAcl(graphicsDevice),			
			backgroundDrawing = new BackgroundDrawing(drawAcl),
			game = new Game(backgroundDrawing);

		TurbulenzServices.createGameSession(requestHandler, sessionCreated);

		function sessionCreated(gameSession) {
			TurbulenzServices.createMappingTable(requestHandler,
				gameSession,
				function (table) {
					graphicsDevice.createTexture({ src : table.getURL("textures/Sky.jpg"),
						mipmaps : true,						
						onload : function (texture) {
							drawAcl.setBackground(Draw2DSprite.create({
							origin: [0,0],
							texture : texture,
							height : graphicsDevice.height,
							width : graphicsDevice.width
							}));							
						}
					});

					TurbulenzEngine.setInterval(game.update, 1000 / 60);
				});
		}		
	};
}());

 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices,Canvas,Draw2D*/
/*
(function() {
	TurbulenzEngine.onload = function onload() {

		//var game = new Game(TurbulenzEngine)

	    "use strict";
	    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
	    	drawing2d = Draw2D.create({ graphicsDevice : graphicsDevice }),
	    	spriteRendering = new SpriteRendering(drawing2d, graphicsDevice),
	    	rendering = new Rendering(drawing2d, graphicsDevice, spriteRendering),
			requestHandler = RequestHandler.create({}),
			backgroundColour = [0.3,0.3,0.3,1],
			background,
			city,
			taxi,
			inputDevice = TurbulenzEngine.createInputDevice({}),
			keyCodes = inputDevice.keyCodes,
 			stageHeight = graphicsDevice.height,
 			stageWidth = graphicsDevice.width,
 			physics2D = Physics2DDevice.create(),
 			world = physics2D.createWorld({
				gravity : [0, 70]
			}),
			heavyMaterial = physics2D.createMaterial({
				elasticity : 0.3,
				density : 5,
				staticFriction : 10
			}),
			taxiShape = physics2D.createPolygonShape({
				vertices : physics2D.createBoxVertices(64, 32),
				material : heavyMaterial
			}),
			body = physics2D.createRigidBody({
				shapes : [taxiShape.clone()],
				position : [ 50, 20 ],
				type : 'dynamic',
				mass : 0.1,
				friction : 100
			}),
			realTime = 0,
			prevTime = TurbulenzEngine.time;
			world.clear();
			world.addRigidBody(body);

 			drawing2d.configure({ viewportRectangle : [0, 0, stageWidth, stageHeight], scaleMode : 'scale' });
			border = physics2D.createRigidBody({
				type : 'static',
				shapes : [
					physics2D.createPolygonShape({
						vertices : physics2D.createRectangleVertices(0, 0, 0.01, stageHeight)
					}),
					physics2D.createPolygonShape({
						vertices : physics2D.createRectangleVertices(0, 0, stageWidth, 0.01)
					}),
					physics2D.createPolygonShape({
						vertices : physics2D.createRectangleVertices((stageWidth - 0.01), 0, stageWidth, stageHeight)
					}),
					physics2D.createPolygonShape({
						vertices : physics2D.createRectangleVertices(0, (stageHeight - 0.01), stageWidth, stageHeight)
					})
				]
			});
			world.addRigidBody(border);

	    function update() {
		    spriteRendering.addSprite(background);
		    spriteRendering.addSprite(city);		    

		    var curTime = TurbulenzEngine.time;
		    var timeDelta = (curTime - prevTime);
		    if (timeDelta > (1 / 20)) {
		    	timeDelta = (1 / 20);
		    }

			realTime += timeDelta;
			prevTime = curTime;

		    while (world.simulatedTime < realTime) {
		    	world.step(1 / 60);
		    }

		    if(!!taxi) {
			    var body = world.rigidBodies[0],
			    	pos = [];
			    body.getPosition(pos);

			    taxi.x = pos[0];
			    taxi.y = pos[1];			    
			}

		    spriteRendering.addSprite(taxi);    			    
		    rendering.render(backgroundColour);		    
	    }

	    TurbulenzEngine.onunload = function gameOnunload() {
			drawing2d = null;		
			requestHandler = null;
			background = null;	
			taxi = null;	
			graphicsDevice = null;			
			physics2D = null;
			world = null;
			rendering = null;
		};

		function sessionCreated(gameSession) {
			TurbulenzServices.createMappingTable(requestHandler,
				gameSession,
				function (table) {
					graphicsDevice.createTexture({ src : table.getURL("textures/Sky512.jpg"),
						mipmaps : true,						
						onload : function (texture) {
							background = Draw2DSprite.create({
							origin: [0,0],
							texture : texture,
							height : graphicsDevice.height,
							width : graphicsDevice.width
							});							
						}
					});

					graphicsDevice.createTexture({ src : table.getURL("textures/TaxiNew.png"),
						mipmaps : true,
						onload : function (texture) {
							taxi = Draw2DSprite.create({
							x : 50,
							y : 20,
							texture : texture						
							});
						}
					});

					graphicsDevice.createTexture({ src : table.getURL("textures/CityNew.png"),
						mipmaps : true,
						onload : function (texture) {
							city = Draw2DSprite.create({
							x : graphicsDevice.width / 2,
							y : graphicsDevice.height - 240,	
							width : graphicsDevice.width,
							height : graphicsDevice.height / 1.5,
							texture : texture						
							});
						}
					});
				});
		}

		var yForce = 0,
			xForce = 0;

		var onKeyDown = function onKeyDown(keynum) {
			
			if (keynum === keyCodes.W) {
				yForce = -20;
			}

			if (keynum === keyCodes.S) {
				yForce = 20;
			}

			if (keynum === keyCodes.D) {				
				xForce = 20;
			}

			if (keynum === keyCodes.A) {								
				xForce = -20;
			}

			body.setForce([xForce, yForce]);
		};

		var onKeyUp = function onKeyUp(keynum) {
			yForce = 0;
			xForce = 0;
			body.setForce([0, 0]);
		};

		inputDevice.addEventListener('keydown', onKeyDown);
		inputDevice.addEventListener('keyup', onKeyUp);
		TurbulenzServices.createGameSession(requestHandler, sessionCreated);
		TurbulenzEngine.setInterval(update, 1000 / 60);
	};
}());
 */