'use strict';
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    var vendor = grunt.file.readJSON("demo/vendor.json");

    // Project configuration.
    grunt.initConfig({
        ts: {
            options: {
                options: { fast: "always" }
            },
            lib: {
                tsconfig: 'tsconfig.json'
            },
            demo: {
                tsconfig: 'demo/tsconfig.json'
            }
        },
        copy: {
            ieshim: {
                files: [
                    { expand: true, cwd: "node_modules/es6-shim/", src: "es6-shim.min.js", dest: 'temp/build/' },
                    { expand: true, cwd: "node_modules/systemjs/dist/", src: "system-polyfills.js", dest: 'temp/build/' }
                ]
            }
        },
        clean: {
            preDev: ['temp/build/*', 'app/**/*.js*', '!app/router.config.js', 'app/**/*.css', '.tscache'],
        },
        less: {
            dev: {
                options: {
                    compress: true,
                    sourceMap: true,
                    sourceMapFileInline: true,
                },
                files: [
                    {
                        expand: true,
                        cwd: "",
                        src: ["demo/main.less"],
                        dest: '',
                        ext: '.css',
                        extDot: 'last'
                    },
                    {
                        expand: true,
                        cwd: "app",
                        src: ["**/*.less", "!style/**/*.less"],
                        dest: 'app',
                        ext: '.css',
                        extDot: 'last'
                    }
                ]
            }
        },
        webpack: {
            default: require("webpack.config.js")
        },
        "webpack-dev-server": {
            options: {
                webpack: {
                    entry: './demo/main.js',
                    output: {
                        filename: 'bundle.js',
                        path: '/demo/temp',
                        publicPath: '/',
                    }
                },
            },
            default: {
                webpack: {
                    devtool: "eval"
                },
                inline: true
            }
        },
        // concat: {
        //     options: {
        //         separator: ';\n',
        //         sourceMap: true
        //     },
        //     vendorDev: {
        //         src: vendor.vendor,
        //         dest: 'temp/build/vendor.js'
        //     }
        // },
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
            ts: {
                files: ['demo/app/**/*.ts', 'demo/main.ts', 'src/**/*ts'],
                tasks: ['ts']
            },
            less: {
                files: ['demo/app/**/*.less', 'demo/main.less', 'demo/style/*.less'],
                tasks: ['less:dev']
            }
        },
        karma: {
            unit: { configFile: 'karma.conf.js' },
            single: {
                configFile: 'karma.conf.js',
                singleRun: true
            },
            teamcity: {
                configFile: 'config/karma.teamcity.conf.js',
                singleRun: true
            }
        },
        concurrent: {
        },
        connect: {
            default: {
                options: {
                    port: 9001,
                    base: 'demo'
                }
            }
        }
    });

    grunt.registerTask('build', ['ts', 'less:dev'])
    grunt.registerTask('w', ['build', 'webpack-dev-server:default', 'watch']);
    grunt.registerTask('serve', ['connect', 'w']);
};
