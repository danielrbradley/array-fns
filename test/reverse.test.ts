import { reverse, init, chain } from '../src/array-fns'

test('empty iterable', () => {
  expect(reverse([])).toEqual([])
})

test('reversal', () => {
  expect(reverse([8, 3, 5])).toEqual([5, 3, 8])
})

test('chaining', () => {
  expect(chain([8, 3, 5]).reverse().toArray()).toEqual([5, 3, 8])
})
