
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var path = require('path');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    pkgMeta: grunt.file.readJSON('config/meta.json'),
    dest: grunt.option('target') || 'dist',
    basePath: path.join('<%= dest %>', 'App_Plugins', '<%= pkgMeta.name %>'),

    watch: {
      options: {
        spawn: false,
        atBegin: true
      },
      dll: {
        files: ['DocTypeInspection/Umbraco/DocTypeInspection/**/*.cs'] ,
        tasks: ['msbuild:dist', 'copy:dll']
      },
      js: {
        files: ['DocTypeInspection/**/*.js'],
        tasks: ['concat:dist']
      },
      html: {
        files: ['DocTypeInspection/**/*.html'],
        tasks: ['copy:html']
      },
	  sass: {
		files: ['DocTypeInspection/**/*.scss'],
		tasks: ['sass', 'copy:css']
	  },
	  css: {
		files: ['DocTypeInspection/**/*.css'],
		tasks: ['copy:css']
	  },
	  manifest: {
		files: ['DocTypeInspection/package.manifest'],
		tasks: ['copy:manifest']
	  }
    },

    concat: {
      options: {
        stripBanners: false
      },
      dist: {
        src: [
            'DocTypeInspection/controllers/context.menu.controller.js'
        ],
        dest: '<%= basePath %>/js/docTypeInspection.js'
      }
    },

    copy: {
        dll: {
            cwd: 'DocTypeInspection/Umbraco/DocTypeInspection/bin/debug/',
            src: 'DocTypeInspection.dll',
            dest: '<%= dest %>/bin/',
            expand: true
        },
        html: {
            cwd: 'DocTypeInspection/views/',
            src: [
                'ContextMenuView.html'
            ],
            dest: '<%= basePath %>/views/',
            expand: true,
            rename: function(dest, src) {
                return dest + src;
              }
        },
		css: {
			cwd: 'DocTypeInspection/css/',
			src: [
				//'textOverImage.css'
			],
			dest: '<%= basePath %>/css/',
			expand: true,
			rename: function(dest, src) {
				return dest + src;
			}
		},
        manifest: {
            cwd: 'DocTypeInspection/',
            src: [
                'package.manifest'
            ],
            dest: '<%= basePath %>/',
            expand: true,
            rename: function(dest, src) {
                return dest + src;
            }
        },
       umbraco: {
        cwd: '<%= dest %>',
        src: '**/*',
        dest: 'tmp/umbraco',
        expand: true
      }
    },

    umbracoPackage: {
      options: {
        name: "<%= pkgMeta.name %>",
        version: '<%= pkgMeta.version %>',
        url: '<%= pkgMeta.url %>',
        license: '<%= pkgMeta.license %>',
        licenseUrl: '<%= pkgMeta.licenseUrl %>',
        author: '<%= pkgMeta.author %>',
        authorUrl: '<%= pkgMeta.authorUrl %>',
        manifest: 'config/package.xml',
        readme: 'config/readme.txt',
        sourceDir: 'tmp/umbraco',
        outputDir: 'pkg',
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: {
        src: ['app/**/*.js', 'lib/**/*.js']
      }
  },

  sass: {
		dist: {
			options: {
				style: 'compressed'
			},
			files: {
				//'DocTypeInspection/css/docTypeInspection.css': //'DocTypeInspection/sass/docTypeInspection.scss'
			}
		}
	},

  clean: {
      build: '<%= grunt.config("basePath").substring(0, 4) == "dist" ? "dist/**/*" : "null" %>',
      tmp: ['tmp'],
      html: [
        'DocTypeInspection/views/*.html',
        '!DocTypeInspection/views/ContextMenuView.html'
        ],
      js: [
        'DocTypeInspection/controllers/*.js',
		'DocTypeInspection/models/*.js',
        'DocTypeInspection/directives/*.js',
		'!DocTypeInspection/controllers/context.menu.controller.js',
      ],
      css: [
        'DocTypeInspection/css/*.css',
        '!DocTypeInspection/css/docTypeInspection.css'
      ],
	  sass: [
		'DocTypeInspection/sass/*.scss',
		'!DocTypeInspection/sass/docTypeInspection.scss'
	  ]
  },
  msbuild: {
      options: {
        stdout: true,
        verbosity: 'quiet',
        maxCpuCount: 4,
        version: 4.0,
        buildParameters: {
          WarningLevel: 2,
          NoWarn: 1607
        }
    },
    dist: {
        src: ['DocTypeInspection/Umbraco/DocTypeInspection/DocTypeInspection.csproj'],
        options: {
            projectConfiguration: 'Debug',
            targets: ['Clean', 'Rebuild'],
        }
    }
  }

  });

  grunt.registerTask('default', ['concat', 'sass:dist', 'copy:html', 'copy:manifest', 'copy:css', 'msbuild:dist', 'copy:dll', 'clean:html', 'clean:js', 'clean:sass', 'clean:css']);
  grunt.registerTask('umbraco', ['clean:tmp', 'default', 'copy:umbraco', 'umbracoPackage', 'clean:tmp']);
};
