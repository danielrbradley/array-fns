import { map, chain } from '../src/array-fns'

test('maps empty collection', () => {
  expect(map([], (x) => x)).toEqual([])
})

test('maps items', () => {
  expect(map([1, 2], (x) => x * 2)).toEqual([2, 4])
})

test('can map with index', () => {
  expect(map([1, 2], (x, index) => index)).toEqual([0, 1])
})

test('chaining', () => {
  expect(
    chain([1, 2])
      .map((x) => x * 2)
      .toArray()
  ).toEqual([2, 4])
})
