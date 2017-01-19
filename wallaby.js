var wallabyWebpack = require('wallaby-webpack');
var webpackConfig = require('./config/webpack.test.js');
var typescriptConfig = require('./tsconfig.json');

webpackConfig.resolve.extensions = ['', '.js', '.json'];
webpackConfig.module.loaders = webpackConfig.module.loaders.filter(function(l){
    return l.loader !== 'awesome-typescript-loader';
  });

delete webpackConfig.devtool;

var wallabyPostprocessor = wallabyWebpack(webpackConfig);

module.exports = function (wallaby) {
    return {
        files: [
            // Polyfills
            { pattern: 'node_modules/core-js/client/shim.min.js', instrument: false},
            { pattern: 'node_modules/reflect-metadata/Reflect.js', instrument: false},

            // zone.js
            { pattern: 'node_modules/zone.js/dist/zone.js', instrument: false},
            { pattern: 'node_modules/zone.js/dist/long-stack-trace-zone.js', instrument: false},
            { pattern: 'node_modules/zone.js/dist/proxy.js', instrument: false},
            { pattern: 'node_modules/zone.js/dist/sync-test.js', instrument: false},
            { pattern: 'node_modules/zone.js/dist/jasmine-patch.js', instrument: false},
            { pattern: 'node_modules/zone.js/dist/async-test.js', instrument: false},
            { pattern: 'node_modules/zone.js/dist/fake-async-test.js', instrument: false},

            { pattern: 'src/**/*.spec.ts', ignore: true },
            { pattern: 'src/**/*.ts', load: false },

            // { pattern: 'testing/**/*+(ts|html|css)', load: false},
        ],
        tests: [
            { pattern: 'src/**/*.spec.ts', load: false }
        ],

        postprocessor: wallabyPostprocessor,

        bootstrap: function() {
            window.__moduleBundler.loadTests();
        }
    };
};