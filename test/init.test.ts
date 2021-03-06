import { init, initChain } from '../src/array-fns'

test('empty', () => {
  expect(init(0)).toEqual([])
})

test('just count', () => {
  expect(init(5)).toEqual([0, 1, 2, 3, 4])
})

test('with mapping', () => {
  expect(init(5, (x) => x * x)).toEqual([0, 1, 4, 9, 16])
})

test('from-to', () => {
  expect(init({ from: 1, to: 3 })).toEqual([1, 2, 3])
})

test('from-to-same', () => {
  expect(init({ from: 1, to: 1 })).toEqual([1])
})

test('from-to fractional-increment', () => {
  expect(init({ from: 1, to: 2, increment: 0.5 })).toEqual([1, 1.5, 2])
})

test('from-to overshooting-increment', () => {
  expect(init({ from: 1, to: 2, increment: 5 })).toEqual([1])
})

test('from positive to negative', () => {
  expect(init({ from: 1, to: -1 })).toEqual([1, 0, -1])
})

test('from negative to positive', () => {
  expect(init({ from: -1, to: 1 })).toEqual([-1, 0, 1])
})

test('from positive to negative with fractional increment', () => {
  expect(init({ from: 1, to: -1, increment: -0.5 })).toEqual([1, 0.5, 0, -0.5, -1])
})

test('from-to zero increment fails', () => {
  expect(() => init({ from: 1, to: 2, increment: 0 })).toThrow(
    'Requested array is of infinite size.'
  )
})

test('from-to negative fails', () => {
  expect(() => init({ from: 1, to: 2, increment: -0.1 })).toThrow(
    'Requested array is of infinite size.'
  )
})

test('from-to negative crossing zero fails', () => {
  expect(() => init({ from: -1, to: 1, increment: -1 })).toThrow(
    'Requested array is of infinite size.'
  )
})

test('from-to reversed fails', () => {
  expect(() => init({ from: 2, to: 1, increment: 1 })).toThrow(
    'Requested array is of infinite size.'
  )
})

test('from-to reversed crossing zero fails', () => {
  expect(() => init({ from: 1, to: -1, increment: 0.1 })).toThrow(
    'Requested array is of infinite size.'
  )
})

test('count prop', () => {
  expect(init({ count: 5 })).toEqual([0, 1, 2, 3, 4])
})

test('start-count', () => {
  expect(init({ start: 3, count: 5 })).toEqual([3, 4, 5, 6, 7])
})

test('count-increment', () => {
  expect(init({ count: 5, increment: 3 })).toEqual([0, 3, 6, 9, 12])
})

test('chaining', () => {
  expect(initChain({ from: 1, to: -1, increment: -0.5 }).toArray()).toEqual([1, 0.5, 0, -0.5, -1])
})
