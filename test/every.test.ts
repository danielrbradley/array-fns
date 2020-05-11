import { every, chain } from '../src/array-fns'

test('matches existance', () => {
  expect(every([2, 4], (x) => x % 2 === 0)).toEqual(true)
})

test('matches non-existance', () => {
  expect(every([1, 2], (x) => x === 2)).toEqual(false)
})

test('passes index', () => {
  expect(every([1, 2], (x, index) => index < 2)).toEqual(true)
})

test('chaining', () => {
  expect(chain([2, 4]).every((x) => x % 2 === 0)).toEqual(true)
})
