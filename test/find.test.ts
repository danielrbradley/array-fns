import { find, chain } from '../src/array-fns'

test('finds match', () => {
  expect(
    find(
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

test('returns undefined when not found', () => {
  expect(
    find(
      [
        { name: 'amy', id: 1 },
        { name: 'bob', id: 2 },
      ],
      (x) => x.name === 'cat'
    )
  ).toBeUndefined()
})

test('finds by index', () => {
  expect(
    find(
      [
        { name: 'amy', id: 1 },
        { name: 'bob', id: 2 },
      ],
      (x, index) => index === 1
    )
  ).toEqual({ name: 'bob', id: 2 })
})

test('chaining', () => {
  expect(
    chain([
      { name: 'amy', id: 1 },
      { name: 'bob', id: 2 },
    ]).find((x) => x.name === 'bob')
  ).toEqual({ name: 'bob', id: 2 })
})
