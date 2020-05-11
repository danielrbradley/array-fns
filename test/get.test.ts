import { get, chain } from '../src/array-fns'

test('finds match', () => {
  expect(
    get(
      [
        { name: 'amy', id: 1 },
        { name: 'bob', id: 2 },
      ],
      (x) => x.name === 'bob'
    )
  ).toEqual({
    name: 'bob',
    id: 2,
  })
})

test('throws when not found', () => {
  expect(() =>
    get(
      [
        { name: 'amy', id: 1 },
        { name: 'bob', id: 2 },
      ],
      (x) => x.name === 'cat'
    )
  ).toThrow('Element not found matching criteria')
})

test('finds by index', () => {
  expect(
    get(
      [
        { name: 'amy', id: 1 },
        { name: 'bob', id: 2 },
      ],
      (x, index) => index === 1
    )
  ).toEqual({
    name: 'bob',
    id: 2,
  })
})

test('chaining', () => {
  expect(
    chain([
      { name: 'amy', id: 1 },
      { name: 'bob', id: 2 },
    ]).get((x) => x.name === 'bob')
  ).toEqual({ name: 'bob', id: 2 })
})
