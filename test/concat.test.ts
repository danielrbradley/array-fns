import { concat } from '../src/array-fns'

test('nested iterators', () => {
  expect(concat([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5])
})
