import { min } from '../src/array-fns'

test('finds min', () => {
  expect(min([21, 2, 18])).toEqual(2)
})

test('fails on empty collection', () => {
  expect(() => min([])).toThrow(`Can't find min of an empty collection`)
})
