import { count, length, initChain } from '../src/array-fns'

test('zero length', () => {
  expect(count([])).toEqual(0)
})

test('non-zero length', () => {
  expect(count([1, 2, 3, 4, 5])).toEqual(5)
})

test('chaining', () => {
  expect(initChain({ count: 5 }).count()).toEqual(5)
})

describe('length alias', () => {
  test('zero length', () => {
    expect(length([])).toEqual(0)
  })

  test('non-zero length', () => {
    expect(length([1, 2, 3, 4, 5])).toEqual(5)
  })

  test('chaining', () => {
    expect(initChain({ count: 5 }).length()).toEqual(5)
  })
})
