'use strict';
var webpackMerge = require('webpack-merge');

module.exports = function (grunt) {
    var webpackDevConfig = require("./config/webpack.dev.js");
    var webpackProdConfig = require("./config/webpack.prod.js");

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks("grunt-webpack");

    // Project configuration.
    grunt.initConfig({
        clean: {
            default: ['dist/*'],
            dist: ['dist/*', '!dist/app.umd.js']
        },
        karma: {
            options: { configFile: './karma.conf.js' },
            default: {},
            phantom: { browsers: ['PhantomJS'] },
            teamcity: { reporters: ['teamcity'], browsers: ['PhantomJS'] }

        },
        webpack: {
            dev: webpackDevConfig,
            devw: webpackMerge(webpackDevConfig, { keepalive: true, watch: true }),
            dist: webpackProdConfig
        },
        "webpack-dev-server": {
            start: {
                keepAlive: true,
                webpack: webpackDevConfig
            }
        }
    });

    grunt.registerTask('build', [
        'clean',
        'webpack:dev'
    ]);
    grunt.registerTask('watch', ['clean', 'webpack:devw']);
    grunt.registerTask('test',  ['build', 'karma:default']);
    grunt.registerTask('serve', ['clean', 'webpack-dev-server:start']);
    grunt.registerTask('dist', [
        'clean',
        'webpack:dist'
    ]);
};
