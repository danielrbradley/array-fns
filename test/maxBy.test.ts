import { maxBy, chain } from '../src/array-fns'

test('finds max age', () => {
  expect(
    maxBy(
      [
        { name: 'amy', age: 21 },
        { name: 'bob', age: 2 },
        { name: 'cat', age: 18 },
      ],
      (x) => x.age
    )
  ).toEqual(21)
})

test('fails on empty collection', () => {
  expect(() => maxBy([], (x) => x)).toThrow(`Can't find max of an empty array`)
})

test('chaining', () => {
  expect(
    chain([
      { name: 'amy', age: 21 },
      { name: 'bob', age: 2 },
      { name: 'cat', age: 18 },
    ]).maxBy((x) => x.age)
  ).toEqual(21)
})
