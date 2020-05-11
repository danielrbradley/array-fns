import { mean } from '../src/array-fns'

test('finds mean', () => {
  expect(mean([21, 2, 18, 39])).toEqual(20)
})

test('fails on empty collection', () => {
  expect(() => mean([])).toThrow(`Can't find mean of an empty collection`)
})
