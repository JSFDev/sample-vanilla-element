var path = require('path'),
		projectConfig = require('./projectConfig'),
		nameClient = process.argv[2],
		serverPort = projectConfig.dev.port,
    express = require('express'),
    app = express(),
    server = require('http').createServer(app);

server.listen(serverPort, function () {
	console.log('Node running in ' + projectConfig.dev.getPath());
});

// Middlewares
app.use(express.static(projectConfig.server.relativePathVendors));
app.use(express.static(projectConfig.server.relativePathElements));

// Routes
app.get('/',function(req, res){
	try	{
    res.sendFile(projectConfig.server.getClientPaths(nameClient));

	} catch (err) {
		console.error(err.msg);
		process.exit(1);
	}
});

app.get('*',function(req, res){
    res.sendFile(projectConfig.server.getClientPaths('404'));
});

process.on('SIGTERM', function () {
  app.close();
});

app.on('close', function () {
  app.close();
});
