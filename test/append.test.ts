import { append, chain } from '../src/array-fns'

test('appends two iterators', () => {
  expect(append([1], [2])).toEqual([1, 2])
})

test('chaining', () => {
  expect(chain([1]).append([2]).toArray()).toEqual([1, 2])
})
