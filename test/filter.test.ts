import { filter, chain } from '../src/array-fns'

test('can filter empty collection', () => {
  expect(filter([], (x) => true)).toEqual([])
})

test('can filter out everything', () => {
  expect(filter([1, 2], (x) => false)).toEqual([])
})

test('can filters based on criteria', () => {
  expect(filter([1, 2], (x) => x % 2 === 0)).toEqual([2])
})

test('can filters based on index', () => {
  expect(filter([1, 2, 15, 7], (x, index) => index % 2 === 0)).toEqual([1, 15])
})

test('chaining', () => {
  expect(
    chain([1, 2])
      .filter((x) => x % 2 === 0)
      .toArray()
  ).toEqual([2])
})
