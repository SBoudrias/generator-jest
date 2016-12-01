# generator-jest [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Add jest support to any projects

## Installation

First, install [Yeoman](http://yeoman.io) and generator-jest using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo generator-jest
```

Then generate your new project:

```bash
yo jest
```

Once done, you can run tests using `npm test`.

## Include generator-jest in your own generator

`generator-jest` is built to create as minimum overhead as possible when including in your own generators.

First, install `generator-jest` as a dependency of your own generator.

```bash
npm install --save generator-jest
```

Then call it from your generator.

```js
this.composeWith('jest', {
  testEnvironment: 'jsdom' // (optional) pass one of jsdom or node
}, {local: require.resolve('generator-jest')});
```

## License

MIT © [Simon Boudrias](https://github.com/SBoudrias)


[npm-image]: https://badge.fury.io/js/generator-jest.svg
[npm-url]: https://npmjs.org/package/generator-jest
[travis-image]: https://travis-ci.org/SBoudrias/generator-jest.svg?branch=master
[travis-url]: https://travis-ci.org/SBoudrias/generator-jest
[daviddm-image]: https://david-dm.org/SBoudrias/generator-jest.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/SBoudrias/generator-jest
[coveralls-image]: https://coveralls.io/repos/SBoudrias/generator-jest/badge.svg
[coveralls-url]: https://coveralls.io/r/SBoudrias/generator-jest
