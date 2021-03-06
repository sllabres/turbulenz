function LoadingScreenService(graphicsDevice, mathDevice, requestHandler, listener) {	
	"use strict";

	var ASSET_COUNT = 4,
		assetTracker = AssetTracker.create(ASSET_COUNT, true),
		loadingScreen = LoadingScreen.create(graphicsDevice, mathDevice, { 	backgroundColor : mathDevice.v4Build (1, 1, 1, 1),
																			    barColor : mathDevice.v4Build (1, 1, 0, 1),
																			    barCenter : {x : 0.5, y : 0.8},
																			    barBorderSize : 4,
																			    barBackgroundColor : mathDevice.v4Build (0, 0, 1, 1),
																			    barBackgroundHeight : 24,
																			    barBackgroundWidth : 540,
																			    assetTracker : assetTracker });	

	function show() {
		requestHandler.addEventListener('eventOnload', assetTracker.eventOnLoadHandler);
		// stupidly this callback is triggered purely on load being called, rather than load being completed!
		assetTracker.setCallback(assetLoaded);
	}

	function assetLoaded() {		
			loadingScreen.render(1, 1);
			if(this.loadingProgress == 1) {
				listener.notify('loadComplete');				
			}
	}

	return { show : show };
}