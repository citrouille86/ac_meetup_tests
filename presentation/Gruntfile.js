/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8080;
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner:
				'/*!\n' +
				' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
				' * http://lab.hakim.se/reveal-js\n' +
				' * MIT licensed\n' +
				' *\n' +
				' * Copyright (C) 2015 Hakim El Hattab, http://hakim.se\n' +
				' */'
		},

		qunit: {
			files: [ 'reveal/test/*.html' ]
		},

		uglify: {
			options: {
				banner: '<%= meta.banner %>\n'
			},
			build: {
				src: 'reveal/js/reveal.js',
				dest: 'build/js/reveal.min.js'
			}
		},

		sass: {
			core: {
				files: {
					'reveal/css/reveal.css': 'reveal/css/reveal.scss',
				}
			},
			themes: {
				files: {
					'reveal/css/theme/black.css': 'reveal/css/theme/source/black.scss',
					'reveal/css/theme/white.css': 'reveal/css/theme/source/white.scss',
					'reveal/css/theme/league.css': 'reveal/css/theme/source/league.scss',
					'reveal/css/theme/beige.css': 'reveal/css/theme/source/beige.scss',
					'reveal/css/theme/night.css': 'reveal/css/theme/source/night.scss',
					'reveal/css/theme/serif.css': 'reveal/css/theme/source/serif.scss',
					'reveal/css/theme/simple.css': 'reveal/css/theme/source/simple.scss',
					'reveal/css/theme/sky.css': 'reveal/css/theme/source/sky.scss',
					'reveal/css/theme/moon.css': 'reveal/css/theme/source/moon.scss',
					'reveal/css/theme/solarized.css': 'reveal/css/theme/source/solarized.scss',
					'reveal/css/theme/blood.css': 'reveal/css/theme/source/blood.scss'
				}
			},
			theme_apside: {
				files: {
					'apside/css/theme/apside.css': 'apside/css/theme/source/apside.scss'
				}
			},
			slide_style: {
				files: [{
					expand: true,
					cwd: 'slides/css',
					src: [ '**/*.scss' ],
					dest: 'slides/css/',
					ext: '.css'
				}]
			}
		},

		autoprefixer: {
			dist: {
				src: 'reveal/css/reveal.css'
			}
		},

		cssmin: {
			main: {
				files: {
					'build/css/reveal.min.css': [ 'reveal/css/reveal.css' ]
				}
			},
			theme: {
				files: [{
					expand: true,
					cwd: 'reveal/css/theme',
					src: ['*.css', '!*.min.css'],
					dest: 'build/css/theme/',
					ext: '.min.css'
				}]
			},
			theme_apside: {
				files: [{
					expand: true,
					cwd: 'apside/css/theme',
					src: ['*.css', '!*.min.css'],
					dest: 'build/css/theme',
					ext: '.min.css'
				}]
			},
			slide_style: {
				files: [{
					expand: true,
					cwd: 'slides/css',
					src: ['*.css', '!*.min.css'],
					dest: 'build/css',
					ext: '.min.css'
				}]
			}
		},

		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
				globals: {
					head: false,
					module: false,
					console: false,
					unescape: false,
					define: false,
					exports: false
				}
			},
			files: [ 'Gruntfile.js', 'reveal/js/reveal.js' ]
		},

		connect: {
			server: {
				options: {
					port: port,
					base: 'build/',
                    livereload: true,
                    open: true
				}
			}
		},

		zip: {
			'reveal-js-presentation.zip': [
				'index.html',
				'css/**',
				'js/**',
				'lib/**',
				'images/**',
				'plugin/**'
			]
		},

		watch: {
      options: {
          livereload: 12345
      },
			js: {
				files: [ 'Gruntfile.js' ],
				tasks: 'jshint:files'
			},
			js_core: {
				files: [ 'reveal/js/reveal.js' ],
				tasks: [ 'js', 'copy:reveal_core' ]
			},
			theme: {
				files: [ 'reveal/css/theme/source/*.scss', 'reveal/css/theme/template/*.scss' ],
				tasks: [ 'css-themes' ]
			},
			theme_apside: {
				files: [ 'apside/css/theme/source/*.scss', 'apside/css/theme/template/*.scss' ],
				tasks: [ 'sass:theme_apside', 'cssmin:theme_apside', 'clean:slide_style', 'sass:slide_style', 'cssmin:slide_style' ]
			},
			css: {
				files: [ 'reveal/css/reveal.scss' ],
				tasks: [ 'css-core' ]
			},
			images_theme_apside: {
				files: [ 'apside/images/**' ],
				tasks: [ 'copy:apside_theme_images' ]
			},
      html: {
          files: [ 'reveal/index.html' ],
					tasks: [ 'includes:index' ]
      },
			slides_configuration_files: {
				files: [ 'slides/reveal.initialization.json' ],
				tasks: [ 'copy:configuration' ]
			},
			slides_html_main: {
				files: [ 'slides/**/*.html' ],
				tasks: [ 'buildIndex' ]
			},
			slide_md: {
				files: [ 'slides/**/*.md' ],
				tasks: [ 'copy:slide_md' ]
			},
			slide_image: {
				files: [ 'slides/images/**/*.*' ],
				tasks: [ 'copy:slide_images' ]
			},
			slide_style_images: {
				files: [ 'slides/css/images/**/*.*' ],
				tasks: [ 'copy:slide_style_images' ]
			},
			slide_style: {
				files: [ 'slides/css/**/*.scss' ],
				tasks: [ 'clean:slide_style', 'sass:slide_style', 'cssmin:slide_style' ]
			}
		},
		// Copy folder without change, compile or concat anything
		copy: {
			lib: { expand: true, flatten: false, cwd: 'reveal/lib/', src: '**', dest: 'build/lib' },
			print: { expand: true, cwd: 'reveal/css/print', src: '**/*.css', dest: 'build/css/print' },
			plugin: { expand: true, flatten: false, cwd: 'reveal/plugin/', src: '**', dest: 'build/plugin' },
			reveal_core: { expand: false, src: 'reveal/js/reveal.js', dest: 'build/js/reveal.js' },
			configuration: { expand: false, src: 'slides/reveal.initialization.json', dest: 'build/configuration/reveal.initialization.json' },
			apside_theme_images: { expand: true, flatten: true, cwd: 'apside/images/', src: '**', dest: 'build/css/images' },
			slide_md: { expand: true, flatten: false, cwd: 'slides/', src: '**/*.md', dest: 'build', force: true },
			slide_style_images: { expand: true, flatten: false, cwd: 'slides/css/images/', src: [ '**/*.*' ], dest: 'build/css/images' },
			slide_images: { expand: true, flatten: false, cwd: 'slides/images/', src: '**/*.*', dest: 'build/images' },
			font_apside: { expand: true, flatten: false, cwd: 'apside/font', src: '**/*.*', dest: 'build/font' }
		},
		// build including
		includes: {
			slide: {
				cwd: 'slides',
				src: [ 'slides.html' ],
				dest: 'build/temp/',
				options: {
					flatten: true,
					includePath: 'slides'
				}
			},
			index: {
				cwd: 'reveal',
				src: [ 'index.html' ],
				dest: 'build/',
				options: {
					flatten: true,
					includePath: 'build/temp'
				}
			}
		},

		// Clean
		clean: {
			temp: [ 'build/temp/' ],
			build: [ 'build/' ],
			slide_style: [ 'slide/css/**/*.css' ]
		}

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-autoprefixer' );
	grunt.loadNpmTasks( 'grunt-zip' );
	grunt.loadNpmTasks( 'grunt-includes' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );

	// Default task
	grunt.registerTask( 'default', [ 'css', 'js' ] );

	// JS task
	grunt.registerTask( 'js', [ 'jshint', 'uglify', 'qunit' ] );

	// Theme CSS
	grunt.registerTask( 'css-themes', [ 'sass:themes', 'sass:theme_apside', 'cssmin:theme', 'cssmin:theme_apside' ] );

	// Core framework CSS
	grunt.registerTask( 'css-core', [ 'sass:core', 'autoprefixer', 'cssmin:main' ] );

	// All CSS
	grunt.registerTask( 'css', [ 'sass', 'autoprefixer', 'cssmin' ] );

	// Package presentation to archive
	grunt.registerTask( 'package', [ 'default', 'zip' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'build', 'connect', 'watch' ] );

	// Run tests
	grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );

	grunt.registerTask( 'buildIndex', [ 'includes:slide', 'includes:index', 'clean:temp' ] );

	// Build task - template processing
	grunt.registerTask( 'build', [ 'clean', 'uglify', 'css', 'copy', 'buildIndex' ] );

	grunt.option('force', true); // pour eviter un stop sur warning

};
