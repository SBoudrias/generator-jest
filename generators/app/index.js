'use strict';
const yeoman = require('yeoman-generator');
const extend = require('deep-extend');
const rootPkg = require('../../package.json');

const JEST_ENV = ['jsdom', 'node'];

module.exports = class JestGenerator extends yeoman.Base {
  constructor() {
    super(...arguments);

    this.option('testEnvironment', {
      type: String,
      description: 'Test environment (jsdom or node)'
    });
  }

  prompting() {
    var prompts = [{
      type: 'list',
      name: 'testEnvironment',
      message: 'What environment do you want to use',
      choices: JEST_ENV,
      default: this.options.testEnvironment,
      when: !JEST_ENV.includes(this.options.testEnvironment)
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = extend({}, this.options, props);
    }.bind(this));
  }

  writing() {
    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    pkg = extend(pkg, {
      scripts: {},
      devDependencies: {
        jest: rootPkg.devDependencies.jest,
        'jest-cli': rootPkg.devDependencies['jest-cli']
      }
    });

    // TODO: Add coverage support
    // Add jest to the npm test script in a non-destructive way
    var testScripts = pkg.scripts.test || '';
    testScripts = testScripts.split('&&').map(str => str.trim()).filter(Boolean);
    if (!testScripts.find(script => script.startsWith('jest'))) {
      testScripts.push('jest');
      pkg.scripts.test = testScripts.join(' && ');
    }

    if (this.props.testEnvironment !== 'jsdom') {
      pkg.jest = {};
      pkg.jest.testEnvironment = this.props.testEnvironment;
    }

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  install() {
    this.installDependencies({bower: false, npm: true});
  }
};
