import { max } from '../src/array-fns'

test('finds max', () => {
  expect(max([2, 21, 18])).toEqual(21)
})

test('fails on empty collection', () => {
  expect(() => max([])).toThrow(`Can't find max of an empty collection`)
})
