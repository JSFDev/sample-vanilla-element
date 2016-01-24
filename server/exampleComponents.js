var path = require('path'),
		projectConfig = require('./projectConfig'),
		nameClient = path.basename(module.filename, '.js'),
		serverPort = projectConfig.dev.port,
    express = require('express'),
    app = express(),
    server = require('http').createServer(app);

server.listen(serverPort, function () {
	console.log('Node running in ' + projectConfig.dev.getPath());
});

// Middlewares
app.use(express.static(projectConfig.server.relativeRootVendors));
app.use(express.static(projectConfig.server.relativeRootElements));

// Routes
app.get('/',function(req, res){
    res.sendFile(projectConfig.server.getClientPaths(nameClient));
});

app.get('*',function(req, res){
    res.sendFile(projectConfig.server.getClientPaths('error'));
});

process.on('SIGTERM', function () {
  app.close();
});

app.on('close', function () {
  app.close();
});
