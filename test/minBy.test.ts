import { minBy, chain } from '../src/array-fns'

test('finds min age', () => {
  expect(
    minBy(
      [
        { name: 'amy', age: 21 },
        { name: 'bob', age: 2 },
        { name: 'cat', age: 18 },
      ],
      (x) => x.age
    )
  ).toEqual(2)
})

test('fails on empty collection', () => {
  expect(() => minBy([], (x) => x)).toThrow(`Can't find min of an empty array`)
})

test('chaining', () => {
  expect(
    chain([
      { name: 'amy', age: 21 },
      { name: 'bob', age: 2 },
      { name: 'cat', age: 18 },
    ]).minBy((x) => x.age)
  ).toEqual(2)
})
