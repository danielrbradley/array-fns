# Iterable Functions

[![npm version](https://badge.fury.io/js/array-fns.svg)](https://badge.fury.io/js/array-fns)
[![GitHub issues](https://img.shields.io/github/issues/danielrbradley/array-fns.svg)](https://github.com/danielrbradley/array-fns/issues)
[![TypeDoc docs](https://img.shields.io/badge/TypeDoc-docs-lightgrey.svg)](https://www.danielbradley.net/array-fns/)
[![Travis](https://img.shields.io/travis/danielrbradley/array-fns.svg)](https://travis-ci.org/danielrbradley/array-fns)
[![Coveralls](https://img.shields.io/coveralls/danielrbradley/array-fns.svg)](https://coveralls.io/github/danielrbradley/array-fns)
[![Dev Dependencies](https://david-dm.org/danielrbradley/array-fns/dev-status.svg)](https://david-dm.org/danielrbradley/array-fns?type=dev)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Really simple functions for working with native array types, inspired by F#'s Array module design.

## Features

- Full type-safety with TypeScript
- Zero dependency
- Pure functions
- Non-primative poluting
- Chainable functions

## Installation

Add package using NPM or yarn

```bash
npm i --save array-fns
```

```bash
yarn add array-fns
```

You can import the top level modules directly:

```javascript
import { groupBy } from 'array-fns'
```

## Examples

Calculating primes lazily with iterators can either be done by calling each of the basic functions:

```javascript
import { count, init, map, filter } from '../src/array-fns'

const range = init({ from: 1, to: 100 })
const mapped = map(range, (x) => ({
  x,
  factors: filter(init({ from: 1, to: x }), (y) => x % y === 0),
}))
const filtered = filter(mapped, (num) => count(num.factors) === 2)
const primes = map(filtered, (num) => num.x)
```

You can also utilise the `chain` methods to unwrap nested function calls:

```javascript
import { initChain } from 'array-fns'

const primes = initChain({ from: 1, to: 100 })
  .map((x) => ({
    x,
    factors: initChain({ from: 1, to: x }).filter((y) => x % y === 0),
  }))
  .filter((num) => num.factors.count() === 2)
  .map((num) => num.x)
  .toArray()

for (const prime of primes) {
  console.log(prime)
}
```

Grouping numbers into odd and even buckets

```javascript
import { initChain } from 'array-fns'

const oddAndEven = initChain({ from: 1, to: 25 })
  .groupBy((i) => (i % 2 === 0 ? 'even' : 'odd'))
  .toArray()
```

## NPM scripts

- `yarn test`: Run test suite
- `yarn start`: Run `yarn build` in watch mode
- `yarn test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
- `yarn test:prod`: Run linting and generate coverage
- `yarn build`: Generate bundles and typings, create docs
- `yarn lint`: Lints code
- `yarn commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)
