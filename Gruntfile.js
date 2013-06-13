module.exports = function (grunt) {
	grunt.initConfig({
		typescript: {
			main: { // --declarations --sourcemap --target ES5 --out client/scripts/main.js client/scripts/main.ts
				src: ['src/main/typescript/Ignite.ts'],
				dest: 'src/main/webapp/scripts/',
				options: {
					target: 'es5',
					base_path: 'src/main/typescript',
					sourcemap: false,
					declaration_file: false
				}
			},
			test: {
				src: ['src/test/typescript/MainSpec.ts'],
				dest: 'src/test/typescript/main-spec.js',
				options: {
					target: 'es5',
					sourcemap: false,
					declaration_file: false
				}
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: 'src/main/scss',
					cssDir: 'src/main/webapp/css',
					imagesDir: 'src/main/webapp/images',
					javascriptsDir: 'src/main/webapp/scripts',
					noLineComments: false,
					debugInfo: true,
					relativeAssets: true
				}
			},
			prod: {
				options: {
					environment: 'production',
					sassDir: 'src/main/scss',
					cssDir: 'src/main/webapp/css',
					imagesDir: 'src/main/webapp/images',
					javascriptsDir: 'src/main/webapp/scripts',
					noLineComments: true,
					debugInfo: false,
					relativeAssets: true
				}
			}
		},
		watch: {
			"typescript-main": {
				files: ['src/main/typescript/**/*.ts'],
				tasks: ['typescript:main']
			},
			"typescript-test": {
				files: [ 'src/test/typescript/**/*.ts'],
				tasks: ['typescript']
			},
			compass: {
				files: ['src/main/scss/**/*.scss'],
				tasks: ['compass:dev']
			},
			// mvn appengine:devserver と組み合わせた時用
			devserver: {
				files: ['src/main/webapp/**/*'],
				// tasks: ['devserver'] // なぜかtypescript周りがエラー出すので
				tasks: ['compass:dev', 'copy:devserver']
			}
		},
		concat: {
			dist: {
				src: [
					'src/test/resources/typescript/testdata-header.js.template',
					'src/test/resources/typescript/data/*.js',
					'src/test/resources/typescript/testdata-footer.js.template'
				],
				dest: 'src/test/typescript/testdata.js'
			}
		},
		copy: {
			bower: {
				files: [
					{expand: true, flatten: true, cwd: 'components/', src: ['angular/angular.js'], dest: 'src/main/webapp/scripts/libs/angular/'},
					{expand: true, flatten: true, cwd: 'components/', src: ['jquery/jquery.js'], dest: 'src/main/webapp/scripts/libs/jquery/'},

					{expand: true, flatten: true, cwd: 'components/', src: ['jasmine/lib/jasmine-core/jasmine.js'], dest: 'src/test/typescript/libs/jasmine/'},
					{expand: true, flatten: true, cwd: 'components/', src: ['jasmine/lib/jasmine-core/jasmine-html.js'], dest: 'src/test/typescript/libs/jasmine/'},
					{expand: true, flatten: true, cwd: 'components/', src: ['jasmine/lib/jasmine-core/jasmine.css'], dest: 'src/test/typescript/libs/jasmine/'},
					{expand: true, flatten: true, cwd: 'components/', src: ['angular-mocks/angular-mocks.js'], dest: 'src/test/typescript/libs/angular-mocks/'}
				]
			},
			tsd: {
				files: [
					{expand: true, cwd: 'd.ts/DefinitelyTyped/', src: ['*/*.d.ts'], dest: 'src/main/typescript/libs/DefinitelyTyped/'},
					{expand: true, cwd: 'd.ts/DefinitelyTyped/', src: ['*/*.d.ts'], dest: 'src/test/typescript/libs/DefinitelyTyped/'}
				]
			},
			// mvn appengine:devserver と組み合わせた時用
			devserver: {
				files: [
					{expand: true, cwd: 'src/main/webapp/', src: ['**/*'], dest: 'target/gae-standards-1.0-SNAPSHOT/'}
				]
			}
		},
		uglify: {
			dev: {
				options: {
					report: 'min',
					// 変数名の圧縮類は作業コストが大きすぎるのでやらない
					mangle: false,
					preserveComments: 'some',

					sourceMap: 'src/main/webapp/scripts/source.js.map',
					sourceMapRoot: '',
					sourceMappingURL: 'source.js.map'
				},
				files: {
					'src/main/webapp/scripts/main.min.js': [
						'src/main/webapp/scripts/libs/jquery/jquery.js',
						'src/main/webapp/scripts/libs/angular/angular.js',
						'src/main/webapp/scripts/controller/*.js',
						'src/main/webapp/scripts/service/*.js',
						'src/main/webapp/scripts/*.js'
					]
				}
			},
			prod: {
				options: {
					report: 'gzip',
					// 変数名の圧縮類は作業コストが大きすぎるのでやらない
					mangle: false,
					preserveComments: 'some'
				},
				files: {
					'src/main/webapp/scripts/main.min.js': [
						'src/main/webapp/scripts/libs/jquery/jquery.js',
						'src/main/webapp/scripts/libs/angular/angular.js',
						'src/main/webapp/scripts/controller/*.js',
						'src/main/webapp/scripts/service/*.js',
						'src/main/webapp/scripts/*.js'
					]
				}
			}
		},
		replace: {
			sourceMap: {
				src: ['src/main/webapp/scripts/source.js.map'],
				overwrite: true,
				replacements: [
					{
						from: "src/main/webapp/scripts/",
						to: ""
					}
				]
			},
			adhocFix: {
				src: ['src/test/typescript/libs/DefinitelyTyped/angularjs/angular-mocks.d.ts'],
				overwrite: true,
				replacements: [
					{ // 本体コード側の定義と重複読み込みして困るので
						from: '/// <reference path="angular.d.ts" />',
						to: ""
					}
				]
			}
		},
		clean: {
			clientCss: {
				src: [
					'src/main/webapp/css/*.css'
				]
			},
			clientScript: {
				src: [
					// client
					'src/main/webapp/scripts/*.js',
					'src/main/webapp/scripts/*.d.ts',
					'src/main/webapp/scripts/*.js.map',
					'src/main/webapp/scripts/service',
					'src/main/webapp/scripts/controller',
					// client test
					'src/test/typescript/*.js',
					'src/test/typescript/*.js.map',
					'src/test/typescript/*.d.ts',
					// minified
					'src/main/webapp/scripts/main.min.js',
					'src/main/webapp/scripts/source.js.map'
				]
			},
			tsd: {
				src: [
					// tsd installed
					'src/main/typescript/libs/DefinitelyTyped',
					'd.ts'
				]
			},
			bower: {
				src: [
					// bower installed
					'src/main/webapp/scripts/libs',
					'components'
				]
			}
		},
		jasmine: {
			all: {
				src: ['src/test/typescript/SpecRunner.html'],
				errorReporting: true
			}
		},
		karma: {
			unit: {
				options: {
					configFile: 'karma.conf.js',
					autoWatch: false,
					browsers: ['PhantomJS'],
					reporters: ['progress', 'junit'],
					singleRun: true,
					keepalive: true
				}
			}
		},
		exec: {
			tsd: {
				cmd: function () {
					return "tsd install jquery angular jasmine angular-mocks";
				}
			},
			bower: {
				cmd: function () {
					return "bower install";
				}
			},
			"open-jasmine": {
				cmd: function () {
					return "open src/test/typescript/SpecRunner.html";
				}
			}
		}
	});

	grunt.registerTask(
		'setup',
		"プロジェクトの初期セットアップを行う。",
		['clean', 'exec:bower', 'exec:tsd', 'copy', 'replace:adhocFix']);

	grunt.registerTask(
		'default',
		"必要なコンパイルを行い画面表示できるようにする。",
		['clean:clientCss', 'clean:clientScript', 'typescript:main', 'compass:dev', 'uglify:dev', 'replace:sourceMap']);

	grunt.registerTask(
		'devserver',
		"mvn appengine:devserver を実行するための前処理を行う",
		['default', 'copy:devserver']);

	grunt.registerTask(
		'prod',
		"デプロイ用の環境を整える",
		['clean:clientCss', 'clean:clientScript', 'typescript:main', 'compass:dev', 'uglify:prod']);

	grunt.registerTask(
		'test',
		"必要なコンパイルを行いkarma(旧testacular)でテストを実行する。",
		['clean:clientScript', 'concat', 'typescript:test', 'karma']);
	grunt.registerTask(
		'test-jasmine',
		"必要なコンパイルを行いブラウザ上でテストを実行する。",
		['clean:clientScript', 'concat', 'typescript', 'uglify:dev', 'exec:open-jasmine']);

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
