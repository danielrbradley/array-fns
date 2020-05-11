import { distinctBy, chain } from '../src/array-fns'

test('ignores duplicates', () => {
  expect(
    distinctBy(
      [
        { name: 'amy', id: 1 },
        { name: 'bob', id: 2 },
        { name: 'bob', id: 3 },
        { name: 'cat', id: 3 },
      ],
      (x) => x.name
    )
  ).toEqual([
    { name: 'amy', id: 1 },
    { name: 'bob', id: 2 },
    { name: 'cat', id: 3 },
  ])
})

test('using index', () => {
  expect(
    distinctBy(
      [
        { name: 'amy', id: 1 },
        { name: 'bob', id: 2 },
        { name: 'bob', id: 3 },
        { name: 'cat', id: 3 },
      ],
      (x, index) => Math.floor(index / 2)
    )
  ).toEqual([
    { name: 'amy', id: 1 },
    { name: 'bob', id: 3 },
  ])
})

test('chaining', () => {
  expect(
    chain([
      { name: 'amy', id: 1 },
      { name: 'bob', id: 2 },
      { name: 'bob', id: 3 },
      { name: 'cat', id: 3 },
    ])
      .distinctBy((x) => x.name)
      .toArray()
  ).toEqual([
    { name: 'amy', id: 1 },
    { name: 'bob', id: 2 },
    { name: 'cat', id: 3 },
  ])
})
