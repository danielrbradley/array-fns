import { ofIterable } from '../src/array-fns'

it('constructs an array', () => {
  const iterator = function* () {
    yield 1
    yield 2
  }
  expect(ofIterable(iterator())).toEqual([1, 2])
})
