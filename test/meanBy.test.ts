import { meanBy, chain } from '../src/array-fns'

test('finds mean age', () => {
  expect(
    meanBy(
      [
        { name: 'amy', age: 21 },
        { name: 'bob', age: 2 },
        { name: 'cat', age: 18 },
        { name: 'dot', age: 39 },
      ],
      (x) => x.age
    )
  ).toEqual(20)
})

test('fails on empty collection', () => {
  expect(() => meanBy([], (x) => x)).toThrow(`Can't find mean of an empty array`)
})

test('chaining', () => {
  expect(
    chain([
      { name: 'amy', age: 21 },
      { name: 'bob', age: 2 },
      { name: 'cat', age: 18 },
      { name: 'dot', age: 39 },
    ]).meanBy((x) => x.age)
  ).toEqual(20)
})
