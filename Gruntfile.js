'use strict';

module.exports = function (grunt) {
    var webpackConfig = require("./webpack.config.js");
    var webpackDevConfig = require("./config/webpack.dev.js");
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        clean: {
            preDev: ['dist/*', 'demo/temp/build/*', 'demo/app/**/*.js*', '!demo/app/router.config.js', 'demo/app/**/*.css', 'src/**/*.css', '.tscache'],
            preDist: ['dist/*'],
        },
        less: {
            dev: {
                options: {
                    compress: true,
                    sourceMap: true,
                    sourceMapFileInline: true,
                },
                files: [
                    { //Demo app main
                        expand: true,
                        cwd: "",
                        src: ["demo/main.less"],
                        dest: '',
                        ext: '.css',
                        extDot: 'last'
                    },
                    {
						expand: true,
						cwd: "demo/app",
						src: ["**/*.less", "!style/**/*.less"],
						dest: 'demo/app',
						ext: '.css',
						extDot: 'last'
					},
                    {
                        expand: true,
                        cwd: "src/",
                        src: ["**/*.less"],
                        dest: 'src/',
                        ext: '.css',
                        extDot: 'last'
                    }
                ]
            },
            dist: {
                options: {
                    compress: true,
                    sourceMap: false,
                },
                files: [
                    {
                        expand: true,
                        cwd: "src/",
                        src: ["**/*.less"],
                        dest: 'src/',
                        ext: '.css',
                        extDot: 'last'
                    }
                ]
            }
        },
        concat: {
            options: {
                separator: ';\n',
                sourceMap: true
            }
        },
        watch: {
            options: {
                livereload: true,
                atBegin: false,
                event: ['changed', 'added', 'deleted'],
                interrupt: true,
                interval: 200
            },
            html: {
                files: ['demo/app/**/*.html', 'demo/index.html'],
                tasks: []
            },
            less: {
                files: ['demo/app/**/*.less', 'demo/main.less', 'demo/style/*.less', 'src/**/*.less'],
                tasks: ['less:dev']
            }
        },
        karma: {
            unit: { configFile: 'karma.conf.js' },
            single: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        connect: {
            default: {
                options: {
                    port: 9001,
                    base: ''
                }
            }
        },
         "webpack-dev-server": {
            options: {
                webpack: webpackDevConfig,
            },
            start: {
                webpack: webpackDevConfig
            }
        }
    });

    grunt.registerTask('build', [
        'less:dev'
    ]);
    grunt.registerTask('rebuild', ['clean:preDev', 'build']);
    grunt.registerTask('w', ['build', 'watch']);
    grunt.registerTask('test', ['build', 'karma:unit']);
    grunt.registerTask('serve', ['connect', 'webpack-dev-server', 'w']);
    grunt.registerTask('dist', [
        'clean:preDist',
        'ts:lib',
        'less:dist'
    ]);
};
