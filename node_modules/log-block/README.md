[![Build Status](https://travis-ci.org/tandrewnichols/log-block.png)](https://travis-ci.org/tandrewnichols/log-block) [![downloads](http://img.shields.io/npm/dm/log-block.svg)](https://npmjs.org/package/log-block) [![npm](http://img.shields.io/npm/v/log-block.svg)](https://npmjs.org/package/log-block) [![Code Climate](https://codeclimate.com/github/tandrewnichols/log-block/badges/gpa.svg)](https://codeclimate.com/github/tandrewnichols/log-block) [![Test Coverage](https://codeclimate.com/github/tandrewnichols/log-block/badges/coverage.svg)](https://codeclimate.com/github/tandrewnichols/log-block) [![dependencies](https://david-dm.org/tandrewnichols/log-block.png)](https://david-dm.org/tandrewnichols/log-block) ![Size](https://img.shields.io/badge/size-368b-brightgreen.svg)

# log-block

Logging utility to generate nice looking log blocks

## Installation

`npm install --save log-block`

## Summary

A wrapper around console.log to add a blank line before and after and indent the items being logged.

![Demo](demo.gif)

## Usage

```js
var block = require('log-block');
block('foo', 'bar'); // Multiple strings are logged on the same line
block(['foo', 'bar'], ['baz', 'quux']); // Each array will be logged on it's own line
block(['foo', 'bar'], { baz: 'quux' }); // Objects will be stringified
```

Also works nicely in combination with [chalk](https://github.com/chalk/chalk). E.g.

```js
block(
  [chalk.green('Something good happened')],
  [chalk.red('Oh no! Something bad happened')]
);
```

### Browser

Serve `dist/log-block.js` or `dist/log-block.min.js` and then access `log-block` via `window.logBlock`.

## Contributing

Please see [the contribution guidelines](CONTRIBUTING.md).
