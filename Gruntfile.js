module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		jshint: {
			files: ['src/js/*.js']
		},

		uglify: {
			dist: {
				files: {
					'js/anywhere.min.js': ['js/libs/*.js', 'js/anywhere.js']
				}
			}
		},

		cssmin: {
			combine: {
				files: {
					'css/style.min.css': ['css/bootstrap-switch.min.css', 'css/style.css']
				}
			}
		},

		compass: {                  // Task
			dist: {                   // Target
				options: {              // Target options
					sassDir: 'sass',
					cssDir: 'css',
					environment: 'production'
				}
			},
			dev: {                    // Another target
				options: {
					sassDir: 'src/_sass',
					cssDir: 'src/css'
				}
			}
		},

		watch: {
			js: {
				files: ['src/js/*.js'],
				tasks: ['jshint'],
				options: { spawn: false }
			}/*,
			/*sass: {
				files: ['src/_sass/*.scss'],
				tasks: ['compass:dev']
				// options: { spawn: false }
			}/*,
			css: {
				files: ['src/css/*.css', '!css/style.min.css'],
				// tasks: ['cssmin'],
				// options: { spawn: false }
				livereload: {
					files: ['src/css/*.css'],
					options: {livereload: true}
				}
			}*/
		},

		clean: {
			buildcache: [".build-cache"],
			windist: ["dist/TV Show Manager/win"],
			osxdist: ["dist/TV Show Manager/osx"],
			linuxdist: ["dist/TV Show Manager/linux"],
			alldist: ["dist"],
			srcbuildcache: [".build-cache/.bowerrc", ".build-cache/bower.json", ".build-cache/desktop.ini", ".build-cache/node_modules/**/src"]
		},

		copy: {
			build: {
				files: [
					{expand: true, cwd: 'src/', src: ['*'], dest: '.build-cache/', filter: 'isFile'},
					{expand: true, cwd: 'src/', src: ['css/**'], dest: '.build-cache/'},
					{expand: true, cwd: 'src/', src: ['js/*'], dest: '.build-cache/', filter: 'isFile'},
					{expand: true, cwd: 'src/', src: ['js/libs/**/*.min.*'], dest: '.build-cache/'},
					{expand: true, cwd: 'src/', src: ['js/libs/mustache/mustache.js'], dest: '.build-cache/'},
					{expand: true, cwd: 'src/', src: ['js/libs/fontawesome/fonts/**'], dest: '.build-cache/'},
					// {expand: true, src: 'node_modules/jquery/**', dest: '.build-cache/'},
					{expand: true, cwd: 'src/', src: ['locales/**'], dest: '.build-cache/'}

				]
			}
		},

		nodewebkit: {
			win: {
				options: {
					platforms: ['win'],
					buildDir: 'dist' // Where the build version of my node-webkit app is saved
				},
				src: ['.build-cache/**/*'] // Your node-webkit app
			},
			osx: {
				options: {
					platforms: ['osx'],
					buildDir: 'dist' // Where the build version of my node-webkit app is saved
				},
				src: ['.build-cache/**/*'] // Your node-webkit app
			},
			linux: {
				options: {
					platforms: ['linux'],
					buildDir: 'dist' // Where the build version of my node-webkit app is saved
				},
				src: ['.build-cache/**/*'] // Your node-webkit app
			},
			all: {
				options: {
					platforms: ['win', 'osx', 'linux'],
					buildDir: 'dist' // Where the build version of my node-webkit app is saved
				},
				src: ['.build-cache/**/*'] // Your node-webkit app
			}
		}

	});

/*	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
*/
	grunt.registerTask('default', ['uglify', 'jshint', 'cssmin']);
	grunt.registerTask('createbuildcache', ['clean:buildcache', 'copy:build', 'clean:srcbuildcache', 'update-json']);
	grunt.registerTask('buildapp', 'build nw app, platform in argument (buildapp:win).', function(pl) {
		if (arguments.length === 0) {
			grunt.log.write("Error, missing argument: platform");
		} else {
			grunt.task.run('clean:' + pl + 'dist');
			grunt.task.run('createbuildcache');
			grunt.task.run('nodewebkit:' + pl);
			grunt.task.run('clean:buildcache');
		}
	});
	grunt.registerTask('update-json', function(){
		var projectFile = ".build-cache/package.json";
				if (!grunt.file.exists(projectFile)) {
						grunt.log.error("file " + projectFile + " not found");
						return true;//return false to abort the execution
				}
				var project = grunt.file.readJSON(projectFile);//get file as json object
				project.window.toolbar = false;
				project.window.frame = false;
				grunt.file.write(projectFile, JSON.stringify(project, null, 2));//serialize it back to file
	});
}