// Copyright (c) 2012 Turbulenz Limited

/*global TurbulenzServices: false*/
/*global ServiceRequester: false*/
/*global Utilities: false*/

//
// API
//
function GameProfileManager() {}
GameProfileManager.prototype =
{
    version : 1,
    maxValueSize : 1024,
    maxGetListUsernames : 32,

    set: function gameProfileManagerSetFn(value, callbackFn, errorCallbackFn)
    {
        if (!value)
        {
            return this.remove(callbackFn, errorCallbackFn);
        }

        if (value.length > this.maxValueSize)
        {
            return false;
        }

        var that = this;
        function setCallbackFn(jsonResponse, status)
        {
            if (status === 200)
            {
                callbackFn();
            }
            else
            {
                var errorCallback = errorCallbackFn || that.errorCallbackFn;
                errorCallback("GameProfileManager.set failed with status " + status + ": " + jsonResponse.msg,
                              status,
                              that.set,
                              [value, callbackFn]);
            }
        }

        var dataSpec = {};
        dataSpec.value = value;
        dataSpec.gameSessionId = that.gameSessionId;

        var url = '/api/v1/game-profile/set';

        if (TurbulenzServices.bridgeServices)
        {
            TurbulenzServices.addSignature(dataSpec, url);
            TurbulenzServices.callOnBridge('gameprofile.set', dataSpec, function unpackResponse(response)
            {
                setCallbackFn(response, response.status);
            });
        }
        else
        {
            this.service.request({
                url: url,
                method: 'POST',
                data : dataSpec,
                callback: setCallbackFn,
                requestHandler: this.requestHandler,
                encrypt: true
            });
        }

        return true;
    },

    remove: function gameProfileManagerRemoveFn(callbackFn, errorCallbackFn)
    {
        var that = this;
        function removeCallbackFn(jsonResponse, status)
        {
            if (status === 200)
            {
                callbackFn();
            }
            else if (status === 404)
            {
                callbackFn();
            }
            else
            {
                var errorCallback = errorCallbackFn || that.errorCallbackFn;
                errorCallback("GameProfileManager.remove failed with status " + status + ": " + jsonResponse.msg,
                              status,
                              that.remove,
                              [callbackFn]);
            }
        }

        var dataSpec = {};
        dataSpec.gameSessionId = that.gameSessionId;

        var url = '/api/v1/game-profile/remove';

        if (TurbulenzServices.bridgeServices)
        {
            TurbulenzServices.addSignature(dataSpec, url);
            TurbulenzServices.callOnBridge('gameprofile.remove', dataSpec, function unpackResponse(response)
            {
                removeCallbackFn(response, response.status);
            });
        }
        else
        {
            this.service.request({
                url: url,
                method: 'POST',
                data: dataSpec,
                callback: removeCallbackFn,
                requestHandler: this.requestHandler,
                encrypt: true
            });
        }

        return true;
    },

    get: function gameProfileManagerGetFn(username, callbackFn, errorCallbackFn)
    {
        function callbackWrapper(gameProfiles)
        {
            if (gameProfiles.hasOwnProperty(username))
            {
                callbackFn(username, gameProfiles[username]);
            }
            else
            {
                callbackFn(username, null);
            }
        }
        return this.getList([username], callbackWrapper, errorCallbackFn);
    },

    getList: function gameProfileManagerGetListFn(usernames, callbackFn, errorCallbackFn)
    {
        if (usernames.length > this.maxGetListUsernames)
        {
            return false;
        }

        var that = this;
        function getCallbackFn(jsonResponse, status)
        {
            if (status === 200)
            {
                callbackFn(jsonResponse.data.profiles);
            }
            else if (status === 404)
            {
                callbackFn(null);
            }
            else
            {
                var errorCallback = errorCallbackFn || that.errorCallbackFn;
                errorCallback("GameProfileManager.getList failed with status " + status + ": " + jsonResponse.msg,
                              status,
                              that.getList,
                              [callbackFn]);
            }
        }

        var dataSpec = {};
        dataSpec.gameSessionId = that.gameSessionId;
        dataSpec.usernames = JSON.stringify(usernames);

        this.service.request({
            url: '/api/v1/game-profile/read',
            method: 'GET',
            data: dataSpec,
            callback: getCallbackFn,
            requestHandler: this.requestHandler
        });

        return true;
    }
};

// Constructor function
GameProfileManager.create = function gameProfileManagerCreateFn(requestHandler, gameSession, errorCallbackFn)
{
    if (!TurbulenzServices.available())
    {
        return null;
    }

    var gameProfileManager = new GameProfileManager();
    gameProfileManager.requestHandler = requestHandler;
    gameProfileManager.errorCallbackFn = errorCallbackFn || TurbulenzServices.defaultErrorCallback;
    gameProfileManager.gameSessionId = gameSession.gameSessionId;

    gameProfileManager.service = TurbulenzServices.getService('gameProfile');

    return gameProfileManager;
};
