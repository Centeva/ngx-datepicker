'use strict';

module.exports = function (grunt) {
    var webpackConfig = require("./webpack.config.js");
    var vendor = grunt.file.readJSON("demo/vendor.json");

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        ts: {
            options: {
            },
            demo: {
                options: { fast: "always" },
                tsconfig: 'demo/tsconfig.json'
            },
            lib: {
                options: { fast: "always" },
                tsconfig: 'tsconfig.json'
            }
        },
        copy: {
            ieshim: {
                files: [
                    { expand: true, cwd: "node_modules/es6-shim/", src: "es6-shim.min.js", dest: 'temp/build/' },
                    { expand: true, cwd: "node_modules/systemjs/dist/", src: "system-polyfills.js", dest: 'temp/build/' }
                ]
            }, htmlDist2: {
                files: [
                    { expand: true, cwd: 'src', src: ['**/*.html'], dest: 'dist/' },
                ]
            }
        },
        clean: {
            preDev: ['dist/*', 'demo/temp/build/*', 'demo/app/**/*.js*', '!demo/app/router.config.js', 'demo/app/**/*.css', '.tscache'],
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
            },
            vendor: {
                src: vendor.vendor,
                dest: 'demo/temp/build/vendor.js'
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
            html2: {
                files: ['src/**/*.html'],
                tasks: ['copy:htmlDist2']
            },
            ts: {
                files: ['demo/app/**/*.ts', 'demo/system-config.ts', 'demo/main.ts', 'src/**/*.ts'],
                tasks: ['ts']
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
        webpack: {
            options: webpackConfig,
            build: {

            }
        }
    });

    grunt.registerTask('build', [
        'ts:demo',
        'ts:lib',
        'concat:vendor',
        'less:dev',
        'copy:htmlDist2',
    ]);
    grunt.registerTask('rebuild', ['clean:preDev', 'build']);
    grunt.registerTask('w', ['build', 'watch']);
    grunt.registerTask('test', ['build', 'karma:unit']);
    grunt.registerTask('serve', ['connect', 'w']);
    grunt.registerTask('dist', [
        'clean:preDist',
        'ts:lib',
        'copy:htmlDist2',
        'less:dist'
    ]);
};
