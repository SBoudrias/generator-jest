'use strict';
const path = require('path');
const fs = require('fs');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const rootPkg = require('../package.json');

const jestGenerator = path.join(__dirname, '../generators/app');

describe('generator-jest:app', () => {
  it('generates for jsdom', () => {
    return helpers
      .run(jestGenerator)
      .withPrompts({ testEnvironment: 'jsdom' })
      .then(() => {
        assert.jsonFileContent('package.json', {
          scripts: {
            test: 'jest'
          },
          devDependencies: {
            jest: rootPkg.devDependencies.jest,
            'jest-cli': rootPkg.devDependencies['jest-cli']
          }
        });
      });
  });

  it('generates for node', () => {
    return helpers
      .run(jestGenerator)
      .withPrompts({ testEnvironment: 'node', coveralls: false })
      .then(() => {
        assert.jsonFileContent('package.json', {
          scripts: {
            test: 'jest'
          },
          devDependencies: {
            jest: rootPkg.devDependencies.jest,
            'jest-cli': rootPkg.devDependencies['jest-cli']
          },
          jest: {
            testEnvironment: 'node'
          }
        });
      });
  });

  it('allows selecting environment through options', () => {
    return helpers
      .run(jestGenerator)
      .withOptions({ testEnvironment: 'node' })
      .then(() => {
        assert.jsonFileContent('package.json', {
          jest: {
            testEnvironment: 'node'
          }
        });
      });
  });

  it('is non-destructive of current scripts', () => {
    return helpers
      .run(jestGenerator)
      .withPrompts({ testEnvironment: 'node', coveralls: false })
      .inTmpDir(() => {
        fs.writeFileSync(
          'package.json',
          JSON.stringify({
            scripts: {
              test: 'eslint'
            }
          })
        );
      })
      .then(() => {
        assert.jsonFileContent('package.json', {
          scripts: {
            test: 'eslint && jest'
          }
        });
      });
  });

  it('does not duplicates pre-existing jest commands', () => {
    return helpers
      .run(jestGenerator)
      .withPrompts({ testEnvironment: 'node' })
      .inTmpDir(() => {
        fs.writeFileSync(
          'package.json',
          JSON.stringify({
            scripts: {
              test: 'eslint && jest --coverage'
            }
          })
        );
      })
      .then(() => {
        assert.jsonFileContent('package.json', {
          scripts: {
            test: 'eslint && jest --coverage'
          }
        });
      });
  });

  it('send coverage reports to coveralls', () => {
    return helpers
      .run(jestGenerator)
      .withPrompts({ coveralls: true })
      .then(() => {
        assert.jsonFileContent('package.json', {
          scripts: {
            posttest: 'cat ./coverage/lcov.info | coveralls'
          }
        });
      });
  });

  it('skip coverage reports to coveralls', () => {
    return helpers
      .run(jestGenerator)
      .withOptions({ coveralls: false })
      .then(() => {
        assert.noJsonFileContent('package.json', {
          scripts: {
            posttest: 'cat ./coverage/lcov.info | coveralls'
          }
        });
      });
  });

  it('adds --coverage parameter for non-jsdom environments', () => {
    return helpers
      .run(jestGenerator)
      .withPrompts({ coveralls: true, testEnvironment: 'node' })
      .then(() => {
        assert.jsonFileContent('package.json', {
          scripts: {
            test: 'jest --coverage'
          }
        });
      });
  });

  it('doesnt add --coverage parameter for non-jsdom environments', () => {
    return helpers
      .run(jestGenerator)
      .withPrompts({ coveralls: false, testEnvironment: 'node' })
      .then(() => {
        assert.noJsonFileContent('package.json', {
          scripts: {
            test: 'jest --coverage'
          }
        });
      });
  });
});
