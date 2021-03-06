'use strict';

var websocket = impress.require('websocket');

if (websocket) {

  impress.websocket = websocket;

  impress.websocket.upgradeServer = function(server) {

    server.webSocketServer = new websocket.server({
      httpServer: server,
      autoAcceptConnections: false
    });

    server.webSocketServer.on('request', function(request) {
      var req = request.httpRequest,
          res = request.socket;
      res.websocket = {};
      res.websocket.request = request;
      impress.dispatcher(req, res);
    });

  };

  impress.websocket.mixinApplication = function(application) {

    application.websocket = {};

    application.websocket.initialize = function(client) {
      client.websocket = client.res.websocket;
      client.websocket.accept = function() {
        client.websocket.isAccepted = true;
        return client.websocket.request.accept('', client.websocket.request.origin);
      };
    };

    application.websocket.finalize = function(client) {
      var ws = client.websocket;
      if (ws && !ws.isAccepted) ws.request.reject();
    };

  };

}
