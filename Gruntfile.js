// tom-weatherhead/thaw-reversi-web-service/Gruntfile.js

'use strict';

module.exports = require('thaw-config').grunt({
	eslint: true,
	mocha: true
});

/*
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		eslint: {
			target: [
				'*.js',
				'src/*.js',
				'test/*.js'
			]
		},
		mochaTest: {
			options: {
				reporter: 'spec'
			},
			test: {
				src: ['test/*_spec.js']
			}
		},
		nsp: {
			package: grunt.file.readJSON('package.json')
		}
	});

	// Tasks
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-nsp');

	// Aliases
	grunt.registerTask('test', ['eslint', 'mochaTest', 'nsp']);
	grunt.registerTask('default', ['test']);
};
 */
