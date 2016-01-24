module.exports = function (grunt) {
	'use strict';

	var extend = require('util')._extend,
		_ = require('lodash'), 
		isWindowsOS = /^win/.test(process.platform),
		userServerOption = grunt.option('page'),
		gruntServerTasks = ['webcomponents', 'ecommerce'],
		debugGruntConfig = function () {
			grunt.log.writeln(JSON.stringify(grunt.config(), null, 2));
		},
		executeNodeServer = function (task) {
				grunt.option('page', task);
				// debugGruntConfig();
				grunt.task.run(['shell:openProject', 'shell:runServer']);
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
				runServer: {
					command: 'node <%= project.server.relativePathServer %>/http <%= grunt.option(\'page\') %>',
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
	grunt.registerTask('default', executeNodeServer.bind(grunt, 'webcomponents'));
	grunt.registerTask('server', executeNodeServer.bind(grunt, userServerOption));
};