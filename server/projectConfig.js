module.exports = {
	server: {
		relativeRootServer: 'server',
		relativeRootApp: 'app',
		getClientPaths: function (index) {
			// LISTA DE RUTAS DE CLIENTE
			// utilizamos el nombre de los archivos de servidor JS para asignar las rutas de cliente
			var paths = {
				exampleComponents: function () {
					return this.relativeRootApp + "index.html";
				},
				default: function () {
					return this.relativeRootApp + "404.html";
				} 
			};

			return paths[index]() || paths['default']();
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