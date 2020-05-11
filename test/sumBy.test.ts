import { sumBy, chain } from '../src/array-fns'

test('with value selector', () => {
  expect(
    sumBy(
      [
        { name: 'amy', age: 21 },
        { name: 'bob', age: 2 },
        { name: 'cat', age: 18 },
      ],
      (x) => x.age
    )
  ).toEqual(41)
})

test('chaining', () => {
  expect(
    chain([
      { name: 'amy', age: 21 },
      { name: 'bob', age: 2 },
      { name: 'cat', age: 18 },
    ]).sumBy((x) => x.age)
  ).toEqual(41)
})
