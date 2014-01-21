'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	var splitted = this.name.split('.');

	this.packageName = '';
	this.className = '';

	if (splitted.length > 1) {

		this.packageName = splitted[0];
		this.className = this._.capitalize(splitted[1]) + 'View';
	}

	console.log('Created view: ' + this.packageName + '.' + this.className);
};

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.files = function files() {
	this.template('somefile.js', 'app/scripts/src/views/' + this.className + '.js');
};