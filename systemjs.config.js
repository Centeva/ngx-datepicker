(function (global) {
	System.config({
		paths: {
			// paths serve as alias
		},
		// map tells the System loader where to look for things
		map: {
			// our app is within the app folder
			app: 'app',
			// angular bundles
			'@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
			'@angular/core/testing': 'node_modules/@angular/core/bundles/core-testing.umd.js',
			'@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
			'@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
			'@angular/compiler/testing': 'node_modules/@angular/compiler/bundles/compiler-testing.umd.js',
			'@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
			'@angular/platform-browser/testing': 'node_modules/@angular/platform-browser/bundles/platform-browser-testing.umd.js',
			'@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
			'@angular/platform-browser-dynamic/testing': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
			'@angular/http': 'node_modules/@angular/http/bundles/http.umd.js',
			'@angular/router': 'node_modules/@angular/router/bundles/router.umd.js',
			'@angular/forms': 'node_modules/@angular/forms/bundles/forms.umd.js',

			// other libraries
			'rxjs': 'node_modules/rxjs',
			'lodash': 'node_modules/lodash/lodash.js',
			'moment': 'node_modules/moment/min/moment.min.js',
			'$': 'node_modules/jquery/dist/jquery.js',

			// testing libraries
			'systemjs': 'node_modules/systemjs',
			'traceur': 'node_modules/traceur/bin/traceur.js'
		},
		// packages tells the System loader how to load when no filename and/or no extension
		packages: {
			rxjs: {
				defaultExtension: 'js'
			},
			lodash: {
				defaultExtension: 'js'
			},
			// our stuff
			'app': { main: 'index.js' },
		}
	});
})(this);
