module.exports = function(grunt) { 

    var requirejs   = grunt.config('requirejs') || {};
    var clean       = grunt.config('clean') || {};
    var copy        = grunt.config('copy') || {};

    var root        = grunt.option('root');
    var libs        = grunt.option('mainlibs');
    var ext         = require(root + '/tao/views/build/tasks/helpers/extensions')(grunt, root);
    var out         = 'output';


    /**
     * Remove bundled and bundling files
     */
    clean.taodatauribundle = [out];
    
    /**
     * Compile tao files into a bundle 
     */
    requirejs.taodatauribundle = {
        options: {
            baseUrl : '../js',
            dir : out,
            mainConfigFile : './config/requirejs.build.js',
            paths : { 'taoDataUri' : root + '/taoDataUri/views/js' },
            modules : [{
                name: 'taoDataUri/controller/routes',
                include : ext.getExtensionsControllers(['taoDataUri']),
                exclude : ['mathJax', 'mediaElement'].concat(libs)
            }]
        }
    };

    /**
     * copy the bundles to the right place
     */
    copy.taodatauribundle = {
        files: [
            { src: [out + '/taoDataUri/controller/routes.js'],  dest: root + '/taoDataUri/views/js/controllers.min.js' },
            { src: [out + '/taoDataUri/controller/routes.js.map'],  dest: root + '/taoDataUri/views/js/controllers.min.js.map' }
        ]
    };

    grunt.config('clean', clean);
    grunt.config('requirejs', requirejs);
    grunt.config('copy', copy);

    // bundle task
    grunt.registerTask('taodatauribundle', ['clean:taodatauribundle', 'requirejs:taodatauribundle', 'copy:taodatauribundle']);
};
