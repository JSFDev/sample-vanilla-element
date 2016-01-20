module.exports = function (grunt) {
	
	var extend = require('util')._extend, 
		isWindowsOS = /^win/.test(process.platform),
		gruntConfig = {
			projectDevPath: 'http://localhost:9000/',
			winShell: {
				openProject: {
					command: [
						'start chrome \"<%= projectDevPath %>\"',
						'exit'
					].join('&&')
				}
			},
			unixShell: {
				openProject: {
					command: [
						'googlePath=$(which google-chrome)',
						'${googlePath} \"<%= projectDevPath %>\"',
						'exit'
					].join(' && ')
				},
			},
			shell: {
				options: {
					async: true,
				},
				runProject: {
					command: 'node server',
					options: {
						async: false,
					}
				}
			}
		};
	
	extend(gruntConfig.shell, isWindowsOS ? gruntConfig.winShell : gruntConfig.unixShell);
	grunt.initConfig(gruntConfig);
	grunt.loadNpmTasks('grunt-shell-spawn');
	grunt.registerTask('start', ['shell:openProject', 'shell:runProject']);
};