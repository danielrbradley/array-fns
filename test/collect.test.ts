import { collect, chain } from '../src/array-fns'

test('collect iterables', () => {
  expect(collect([1, 2], (x) => [x, x])).toEqual([1, 1, 2, 2])
})

test('with index', () => {
  expect(collect([1, 2], (x, i) => [x, x + i])).toEqual([1, 1, 2, 3])
})

test('chaining', () => {
  expect(
    chain([1, 2])
      .collect((x) => [x, x])
      .toArray()
  ).toEqual([1, 1, 2, 2])
})
