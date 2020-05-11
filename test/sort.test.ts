import { sort, chain } from '../src/array-fns'

test('numbers', () => {
  expect(sort([21, 2, 18])).toEqual([2, 18, 21])
})

test('strings', () => {
  expect(sort(['cat', 'amy', 'bob'])).toEqual(['amy', 'bob', 'cat'])
})

test('with key selector', () => {
  expect(
    sort(
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
  expect(chain(['cat', 'amy', 'bob']).sort().toArray()).toEqual(['amy', 'bob', 'cat'])
})
