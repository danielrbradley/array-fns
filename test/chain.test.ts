import { chain } from '../src/array-fns'

test('chains are iterable', () => {
  for (const item of chain([1])) {
    expect(item).toEqual(1)
    return
  }
  throw new Error('Not iterable')
})
