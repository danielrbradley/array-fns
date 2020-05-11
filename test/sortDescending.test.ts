import { sortDescending, chain } from '../src/array-fns'

test('numbers', () => {
  expect(sortDescending([21, 2, 18])).toEqual([21, 18, 2])
})

test('strings', () => {
  expect(sortDescending(['cat', 'amy', 'bob'])).toEqual(['cat', 'bob', 'amy'])
})

test('with key selector', () => {
  expect(
    sortDescending(
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
  expect(chain(['cat', 'amy', 'bob']).sortDescending().toArray()).toEqual(['cat', 'bob', 'amy'])
})
