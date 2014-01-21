'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');


var SomaGenerator = module.exports = function SomaGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    // setup the test-framework property, Gruntfile template will need this
    this.testFramework = options['test-framework'] || 'mocha';

    // for hooks to resolve on mocha by default
    options['test-framework'] = this.testFramework;

    // resolved to mocha by default (could be switched to jasmine for instance)
    this.hookFor('test-framework', {
        as: 'app',
        options: {
            options: {
                'skip-install': options['skip-install-message'],
                'skip-message': options['skip-install']
            }
        }
    });

    this.options = options;

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SomaGenerator, yeoman.generators.Base);

SomaGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);


    var prompts = [{
        type: 'input',
        name: 'applicationName',
        message: 'What is the application name?',
        default: "Soma"
    }, {
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like?',
        choices: [{
            name: 'Sass with Compass',
            value: 'includeCompass',
            checked: true
        }, {
            name: 'Modernizr',
            value: 'includeModernizr',
            checked: true
        }, {
            name: 'Director',
            value: 'includeDirector',
            checked: true
        }]
    }];

    this.prompt(prompts, function(props) {
        this.applicationName = props.applicationName;

        var features = props.features;

        function hasFeature(feat) {
            return features.indexOf(feat) !== -1;
        }

        this.includeCompass = hasFeature('includeCompass');
        this.includeModernizr = hasFeature('includeModernizr');
        this.includeDirector = hasFeature('includeDirector');

        cb();
    }.bind(this));
};

SomaGenerator.prototype.gruntfile = function gruntfile() {
    this.template('Gruntfile.js');
};

SomaGenerator.prototype.packageJSON = function packageJSON() {
    this.template('_package.json', 'package.json');
};

SomaGenerator.prototype.git = function git() {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
};

SomaGenerator.prototype.bower = function bower() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
};

SomaGenerator.prototype.jshint = function jshint() {
    this.copy('jshintrc', '.jshintrc');
};

SomaGenerator.prototype.editorConfig = function editorConfig() {
    this.copy('editorconfig', '.editorconfig');
};

SomaGenerator.prototype.h5bp = function h5bp() {
    this.copy('robots.txt', 'app/robots.txt');
    this.copy('htaccess', 'app/.htaccess');
};

SomaGenerator.prototype.app = function app() {

    this.mkdir('app');
    this.mkdir('app/images');
    this.mkdir('dist');
};

SomaGenerator.prototype.styles = function styles() {

    this.mkdir('app/styles');
    this.mkdir('app/styles/fonts');
    this.directory('styles', 'app/styles');

};

SomaGenerator.prototype.scripts = function scripts() {
    this.mkdir('app/scripts');
    this.mkdir('app/scripts/src/commands');
    this.mkdir('app/scripts/src/mediators');
    this.mkdir('app/scripts/src/models');
    this.mkdir('app/scripts/src/views');
    this.mkdir('app/scripts/src');
    this.write('app/scripts/src/application.js', 'console.log(\'\\\'Allo \\\'Allo!\');');
};

SomaGenerator.prototype.index = function index() {

    this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
    this.indexFile = this.engine(this.indexFile, this);


    this.indexFile = this.appendFiles({
        html: this.indexFile,
        fileType: 'js',
        optimizedPath: 'scripts/' + this.applicationName + '.js',
        sourceFileList: ['scripts/' + this.applicationName + '.js'],
        searchPath: '{app,.tmp}'
    });

    this.write('app/index.html', this.indexFile);
};

SomaGenerator.prototype.install = function() {
    if (this.options['skip-install']) {
        return;
    }

    var done = this.async();
    this.installDependencies({
        skipMessage: this.options['skip-install-message'],
        skipInstall: this.options['skip-install'],
        callback: done
    });
};