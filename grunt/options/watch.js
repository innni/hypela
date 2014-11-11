/**
 * Watching for changes
 */
'use strict';

var config = require('../config');

module.exports = {
	scss: {
		files: config.sass.files,
		tasks: 'sass:dev',
		options: {
			livereload: true
		}
	},

	html: {
		files: [config.htmlFiles],
		tasks: 'pages:dev',
		options: {
			livereload: true
        	}
	},

	js: {
		files: [config.jsHintFiles, config.tests.src],
		tasks: ['jshint', 'karma:unit']
	}
};
