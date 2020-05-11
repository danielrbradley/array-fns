import { exists, chain } from '../src/array-fns'

test('matches non-existance', () => {
  expect(exists([1, 2], (x) => x === 3)).toEqual(false)
})

test('matches existance', () => {
  expect(exists([1, 2], (x) => x === 1)).toEqual(true)
})

test('passes index', () => {
  expect(exists([1, 2], (x, index) => x === 2 && index === 1)).toEqual(true)
})

test('chaining', () => {
  expect(chain([1, 2]).exists((x) => x === 3)).toEqual(false)
})
