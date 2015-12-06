module.exports = function(grunt) {

  var sourceFiles = ['client/**/*.js'];
  var appEntry = 'client/app.js';
  var stylesMain = 'client/styles/main.less';
  var eslintConfig = 'eslint.config.json';

  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'dist/dist.js': [appEntry]
        },
        options: {
          transform: [['babelify', {presets: ["es2015", "react"]}]]
        }
      }
    },
    eslint: {
        src: sourceFiles,
        options: {
          configFile: eslintConfig
        }
    },
    less: {
      defaults: {
        files: {
          './dist/styles.css': './client/styles/main.less'
        }
      }
    },
    watch: {
      files: sourceFiles.concat([stylesMain]),
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks("gruntify-eslint");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['eslint', 'browserify:dist', 'less:defaults', 'watch']);
};
