var path = require('path');

module.exports = {
	server: {
		relativeRootServer: path.resolve('server'),
		relativeRootApp: path.resolve('app'),
		relativeRootVendors: path.resolve('vendors'),
		relativeRootElements: path.resolve('app/elements'),
		getClientPaths: function (index) {
			// LISTA DE RUTAS DE CLIENTE
			// utilizamos el nombre de los archivos de servidor JS para asignar las rutas de cliente
			var paths = {
				exampleComponents: function () {
					return this.relativeRootApp + "/index.html";
				}.bind(this),
				
				error: function () {
					return this.relativeRootApp + "/404.html";
				}.bind(this) 
			};

			return paths[index]() || paths['error']();
		}
	},
	dev: {
		protocol: 'http',
		host: 'localhost',
		port: 9090,
		path: '/',
		getPath: function () {
			return this.protocol + '://' + this.host + ':' + this.port + this.path;
		} 
	}
};