module.exports = function (grunt) {
	
	var extend = require('util')._extend, 
		isWindowsOS = /^win/.test(process.platform),
		gruntConfig = {
			project: require('./server/projectConfig'),
			winShell: {
				openProject: {
					command: [
						'start chrome \"<%= project.dev.getPath() %>\"',
						'exit'
					].join('&&')
				}
			},
			unixShell: {
				openProject: {
					command: [
						'googlePath=$(which google-chrome)',
						'${googlePath} \"<%= project.dev.getPath() %>\"',
						'exit'
					].join(' && ')
				},
			},
			shell: {
				options: {
					async: true,
				},
				runExampleComponents: {
					command: 'node server/exampleComponents',
					options: {
						async: false,
					}
				}
			}
		};

	extend(gruntConfig.shell, isWindowsOS ? gruntConfig.winShell : gruntConfig.unixShell);
	grunt.initConfig(gruntConfig);
	grunt.loadNpmTasks('grunt-shell-spawn');
	grunt.registerTask('start', ['shell:openProject', 'shell:runExampleComponents']); // --example
};