import { pairwise, chain } from '../src/array-fns'

test('empty', () => {
  expect(pairwise([])).toEqual([])
})

test('single item', () => {
  expect(pairwise([1])).toEqual([])
})

test('multiple items', () => {
  expect(pairwise([1, 2, 3])).toEqual([
    [1, 2],
    [2, 3],
  ])
})

test('chaining', () => {
  expect(chain([1, 2, 3]).pairwise().toArray()).toEqual([
    [1, 2],
    [2, 3],
  ])
})
