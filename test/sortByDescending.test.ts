import { sortByDescending, chain } from '../src/array-fns'

test('by selected key', () => {
  expect(
    sortByDescending(
      [
        { name: 'amy', age: 21 },
        { name: 'bob', age: 2 },
        { name: 'cat', age: 18 },
      ],
      (x) => x.age
    )
  ).toEqual([
    { name: 'amy', age: 21 },
    { name: 'cat', age: 18 },
    { name: 'bob', age: 2 },
  ])
})

test('chaining', () => {
  expect(
    chain([
      { name: 'amy', age: 21 },
      { name: 'bob', age: 2 },
      { name: 'cat', age: 18 },
    ])
      .sortByDescending((x) => x.age)
      .toArray()
  ).toEqual([
    { name: 'amy', age: 21 },
    { name: 'cat', age: 18 },
    { name: 'bob', age: 2 },
  ])
})
