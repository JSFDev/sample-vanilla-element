var path = require('path'),
		projectConfig = require('./projectConfig'),
		nameClient = path.basename(module.filename, '.js'),
		pathClient = projectConfig.server.getClientPaths(nameClient),
		serverPort = projectConfig.dev.port,
    express = require('express'),
    app = express(),
    server = require('http').createServer(app);

server.listen(serverPort, function () {
	console.log('Node running in ' + projectConfig.dev.getPath());
});

// Middlewares
app.use(express.static(__dirname + '/vendors'));
app.use(express.static(__dirname + '/elements'));

// Routes
app.get('/',function(req, res){
    res.sendFile(pathClient);
});

process.on('SIGTERM', function () {
  app.close();
});

app.on('close', function () {
  app.close();
});
