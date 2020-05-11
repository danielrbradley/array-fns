import { groupBy, chain } from '../src/array-fns'

test('groups by key', () => {
  expect(
    groupBy(
      [
        { name: 'amy', age: 1 },
        { name: 'bob', age: 2 },
        { name: 'cat', age: 2 },
      ],
      (x) => x.age
    )
  ).toEqual([
    [1, [{ name: 'amy', age: 1 }]],
    [
      2,
      [
        { name: 'bob', age: 2 },
        { name: 'cat', age: 2 },
      ],
    ],
  ])
})

test('groups by index', () => {
  expect(
    groupBy(
      [
        { name: 'amy', age: 1 },
        { name: 'bob', age: 2 },
        { name: 'cat', age: 2 },
      ],
      (x, index) => index % 2
    )
  ).toEqual([
    [
      0,
      [
        { name: 'amy', age: 1 },
        { name: 'cat', age: 2 },
      ],
    ],
    [1, [{ name: 'bob', age: 2 }]],
  ])
})

test('chaining', () => {
  expect(
    chain([
      { name: 'amy', age: 1 },
      { name: 'bob', age: 2 },
      { name: 'cat', age: 2 },
    ])
      .groupBy((x) => x.age)
      .toArray()
  ).toEqual([
    [1, [{ name: 'amy', age: 1 }]],
    [
      2,
      [
        { name: 'bob', age: 2 },
        { name: 'cat', age: 2 },
      ],
    ],
  ])
})
