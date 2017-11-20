
// Variables
// ============
// Define paths used within this gulp file

var paths = {
	tmp: '.tmp',
	dev: '_dev',
	prod: '_prod'
};


// Reqs
// ============
// Load plugins in packages.json automatically

var gulp = require('gulp'),
	fs = require('fs'),
	wiredep = require('wiredep').stream,
	notifier = require('node-notifier'),
	argv = require('yargs').argv,
	gulpsync = require('gulp-sync')(gulp),
	spawn = require('child_process').spawn,
	plugins = require('gulp-load-plugins')({
		pattern: ['*'],
		replaceString: /\bgulp[\-.]/,
		lazy: true,
		camelize: true
	});


// Linting
// ============
// Get lint reports in browser

var browserReports = false;


// Inject deps
// ============
// Inject SASS and JS modules

gulp.task('inject-JSdeps', () => {
	// Auto inject JS
	return gulp.src(paths.dev + '/html/includes/_under.pug')
		.pipe(plugins.inject(gulp.src('**/*.js', { read: false, cwd: paths.tmp + '/script/' }), {
			relative: true,
			ignorePath: '../../../.tmp/',
			starttag: '<!-- inject:imports -->',
			endtag: '<!-- endinject -->',
			transform: filepath => {
				return '<script src="' + filepath + '"></script>';
			}
		}))
		.pipe(gulp.dest(paths.dev + '/html/includes/'));
});


// JS
// ============
// Changes dependent on framework version

const babelConfig = {
	exclude: 'node_modules/**',
	"presets": [['es2015', { modules: false }], 'react'],
	"plugins": ["external-helpers", "transform-remove-strict-mode"],
	babelrc: false
};

const rollupJS = (inputFile, options) => {
	return () => {
		return plugins.rollupStream({
			input: options.basePath + inputFile,
			format: options.format,
			sourcemap: options.sourcemap,
			plugins: [
				plugins.rollupPluginBabel(babelConfig),
				plugins.rollupPluginReplace({'process.env.NODE_ENV': JSON.stringify( 'production' )}),
				plugins.rollupPluginCommonjs({}),			
				plugins.rollupPluginNodeResolve({ jsnext: true, main: true })
			]
		})
		.on('error', e => {
			console.error(e.stack);

			notifier.notify({
				title: 'Rollup error',
				message: e.stack
			});
		})
		.pipe(plugins.plumber())
		.pipe(plugins.vinylSourceStream(inputFile, options.basePath))
		.pipe(plugins.vinylBuffer())
		.pipe(plugins.sourcemaps.init({ loadMaps: true }))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.tmp + '/script/'))
		.pipe(plugins.browserSync.stream());
	};
}

gulp.task('js', rollupJS('app.js', {
	basePath: paths.dev + '/script/',
	sourcemap: true,
	format: 'iife'
}));

// Copy scripts
// ============
// In this framework version runs eslint, updates browser stream

gulp.task('copy:scripts', () => {

	// eslint
	return gulp.src([paths.dev + '/script/**/*.js', paths.dev + '/components/**/*.js'])
		.pipe(plugins.eslint({
			"plugins": [
				"react"
			]
		}))
		.pipe(plugins.eslint.result(result => {

			if (result.errorCount) {
				console.log('');
				console.log('JS Error: ' + result.messages[0].message);
				console.log(result.filePath);
				console.log('Line: ' + result.messages[0].line);
				console.log('_____________________');

				notifier.notify({
					title: result.messages[0].message,
					subtitle: result.filePath,
					message: 'Line: ' + result.messages[0].line,
					sound: 'Bottle',
				});
			}
		}));
});

