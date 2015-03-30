module.exports = function(grunt) { 

    var sass    = grunt.config('sass') || {};
    var watch   = grunt.config('watch') || {};
    var notify  = grunt.config('notify') || {};
    var root    = grunt.option('root') + '/taoDataUri/views/';

    sass.taodatauri = { };
    sass.taodatauri.files = { };
    sass.taodatauri.files[root + 'css/base64.css'] = root + 'scss/base64.scss';

    watch.taodataurisass = {
        files : [root + 'views/scss/**/*.scss'],
        tasks : ['sass:taodatauri', 'notify:taodataurisass'],
        options : {
            debounceDelay : 1000
        }
    };

    notify.taodataurisass = {
        options: {
            title: 'Grunt SASS', 
            message: 'SASS files compiled to CSS'
        }
    };

    grunt.config('sass', sass);
    grunt.config('watch', watch);
    grunt.config('notify', notify);

    //register an alias for main build
    grunt.registerTask('taodataurisass', ['sass:taodatauri']);
};
