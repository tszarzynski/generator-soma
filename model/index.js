'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	var splitted = this.name.split('.');

	this.packageName = '';
	this.className = '';

	if (splitted.length > 1) {

		this.packageName = splitted[0].toLowerCase();
		this.className = this._.capitalize(splitted[1]) + 'Model';
	} else {
		this.className = this._.capitalize(this.name) + 'Model';
	}

	console.log('Created command: ' + this.packageName + '.' + this.className);
};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.files = function files() {
	this.template('somefile.js', 'app/scripts/src/models/' + this.className + '.js');
};