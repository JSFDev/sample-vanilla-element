var path = require('path'),
	_ = require('lodash');

module.exports = {
	server: {
		relativePathServer: path.resolve('server'),
		relativePathApp: path.resolve('app'),
		relativePathVendors: path.resolve('vendors'),
		getClientPaths: function (app) {
			// CLIENT ROUTES
			// we use the name o the grunt --server option to run the client route
			var appName = _.isString(app) && _.indexOf(['0', 'true', 'false'], app) === -1 ? app : 'error',
				paths = {
					ecommerce: function () {
						return this.relativePathApp + "/ecommerce.html";
					}.bind(this),

					webcomponents: function () {
						return this.relativePathApp + "/webcomponents.html";
					}.bind(this),

					'404': function () {
						return this.relativePathApp + "/404.html";
					}.bind(this),
					
					error: function () {
						throw {msg : 'Aviable servers : $grunt server --page=[' + Object.keys(paths) + ']'};
					}.bind(this) 
				};

			return (paths[appName] || paths.error)();
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