import { sum } from '../src/array-fns'

test('numbers', () => {
  expect(sum([21, 2, 18])).toEqual(41)
})
