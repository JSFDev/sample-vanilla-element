module.exports = function (grunt) {
	
	var extend = require('util')._extend,
		_ = require('lodash'), 
		isWindowsOS = /^win/.test(process.platform),
		userServerOption = grunt.option('server'),
		// Possible servers (1/2)
		gruntServerTasks = {
			webcomponents: ['shell:openProject', 'shell:runExampleComponents'],
			elements: ['shell:openProject', 'shell:runExampleComponents']
		},
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
				// Possible servers (2/2)
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

	// TASKS
	grunt.registerTask('default', gruntServerTasks.webcomponents);
	grunt.registerTask('start', function () {
		var tasks = !_.isUndefined(userServerOption) ? userServerOption : 'webcomponents';

		try {
			grunt.task.run(gruntServerTasks[tasks]);
		
		} catch (err) {
			grunt.fail.fatal('Aviable servers : $grunt start --server=[' + _.keys(gruntServerTasks) + ']', 5);
		}
	});
};