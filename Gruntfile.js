module.exports = function(grunt) {

  var sourceFiles = ['client/**/*.js'];
  var eslintConfig = 'eslint/eslint.config.json';

  grunt.initConfig({
    eslint: {
        src: sourceFiles,
        options: {
          configFile: eslintConfig
        }
    }
  });

  grunt.loadNpmTasks("gruntify-eslint");
  grunt.registerTask('default', ['eslint']);
};
