import { distinct, chain } from '../src/array-fns'

test('duplicates', () => {
  expect(distinct(['bob', 'cat', 'bob', 'amy'])).toEqual(['bob', 'cat', 'amy'])
})

test('chaining', () => {
  expect(chain(['bob', 'cat', 'bob', 'amy']).distinct().toArray()).toEqual(['bob', 'cat', 'amy'])
})
