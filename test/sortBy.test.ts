import { sortBy, chain } from '../src/array-fns'

test('sorts by selected key', () => {
  expect(
    sortBy(
      [
        { name: 'amy', age: 21 },
        { name: 'bob', age: 2 },
        { name: 'cat', age: 18 },
      ],
      (x) => x.age
    )
  ).toEqual([
    { name: 'bob', age: 2 },
    { name: 'cat', age: 18 },
    { name: 'amy', age: 21 },
  ])
})

test('chaining', () => {
  expect(
    chain([
      { name: 'amy', age: 21 },
      { name: 'bob', age: 2 },
      { name: 'cat', age: 18 },
    ])
      .sortBy((x) => x.age)
      .toArray()
  ).toEqual([
    { name: 'bob', age: 2 },
    { name: 'cat', age: 18 },
    { name: 'amy', age: 21 },
  ])
})
