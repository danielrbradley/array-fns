import { count, init, map, filter, initChain } from '../src/array-fns'

function a() {
  const range = init({ from: 1, to: 100 })
  const mapped = map(range, (x) => ({
    x,
    factors: filter(init({ from: 1, to: x }), (y) => x % y === 0),
  }))
  const filtered = filter(mapped, (num) => count(num.factors) === 2)
  const primes = map(filtered, (num) => num.x)
  return primes
}

function b() {
  const primes = initChain({ from: 1, to: 100 })
    .map((x) => ({
      x,
      factors: initChain({ from: 1, to: x }).filter((y) => x % y === 0),
    }))
    .filter((num) => num.factors.count() === 2)
    .map((num) => num.x)
    .toArray()

  for (const prime of primes) {
    console.log(prime)
  }
}

const oddAndEven = initChain({ from: 1, to: 25 })
  .groupBy((i) => (i % 2 === 0 ? 'even' : 'odd'))
  .toArray()
