/**
 * Creates an array from the source iterable object.
 * @param source An Iterable objext to convert to an array.
 * @example
 * ofIterable((function*() {
 *    yield 1
 *    yield 2
 *  })()) // [1, 2]
 */
export function ofIterable<T>(source: Iterable<T>): T[] {
  return Array.from(source)
}

/**
 * Creates a new array whose elements are the results of applying the specified mapping to each of the elements of the source collection.
 * @param source The input collection.
 * @param mapping A function to transform items from the input collection.
 * @example
 * map([1, 2], x => x * 2) // [2, 4]
 */
export function map<T, U>(source: ReadonlyArray<T>, mapping: (item: T, index: number) => U): U[] {
  return source.map(mapping)
}

/**
 * Returns a new array containing only the elements of the collection for which the given predicate returns true.
 * @param source The input collection.
 * @param predicate A function to test whether each item in the input collection should be included in the output.
 * @example
 * filter([1, 2, 3, 4], x => x % 2 === 0) // [2, 4]
 */
export function filter<T>(
  source: ReadonlyArray<T>,
  predicate: (item: T, index: number) => boolean
): T[] {
  return source.filter(predicate)
}

/**
 * Applies the given function to each element of the array and returns a new array comprised of the results for each element where the function returns a value.
 * @param source The input collection.
 * @param chooser A function to transform items from the input collection to a new value to be included, or undefined to be excluded.
 * @example
 * choose(
 *  [1, 2, 3],
 *  x => (x % 2 === 1 ? x * 2 : undefined)
 * ) // [2, 6]
 */
export function choose<T, U>(
  source: ReadonlyArray<T>,
  chooser: (item: T, index: number) => U | undefined
): U[] {
  const target = []
  let index = 0
  for (const item of source) {
    const chosen = chooser(item, index)
    if (chosen !== undefined) {
      target.push(chosen)
    }
    index++
  }
  return target
}

/**
 * Applies the given function to each element of the source array and concatenates all the results.
 * @param source The input collection.
 * @param mapping A function to transform elements of the input collection into collections that are concatenated.
 * @example
 * collect([1, 2], x => [x, x]) // [1, 1, 2, 2]
 */
export function collect<T, U>(
  source: ReadonlyArray<T>,
  mapping: (item: T, index: number) => Iterable<U>
): U[] {
  const target = []
  let index = 0
  for (const item of source) {
    const children = mapping(item, index)
    for (const child of children) {
      target.push(child)
    }
    index++
  }
  return target
}

/**
 * Wraps the two given arrays as a single concatenated array.
 * @param first The first array.
 * @param second The second array.
 * @example
 * append([1], [2]) // [1, 2]
 */
export function append<T>(first: ReadonlyArray<T>, second: ReadonlyArray<T>): T[] {
  return ([] as T[]).concat(first).concat(second)
}

/**
 * Combines the given collection-of-arrays as a single concatenated array.
 * @param sources The input collection.
 * @example
 * concat([[1, 2], [3, 4], [5]]) // [1, 2, 3, 4, 5]
 */
export function concat<T>(sources: Iterable<ReadonlyArray<T>>): T[] {
  const target = []
  for (const source of sources) {
    for (const item of source) {
      target.push(item)
    }
  }
  return target
}

/**
 * Returns an array that contains no duplicate entries according to the equality comparisons on
 * the elements. If an element occurs multiple times in the sequence then the later occurrences are
 * discarded.
 * @param source The input collection.
 * @example
 * distinct(['amy', 'bob', 'bob', 'cat']) // ['amy', 'bob', 'cat']
 */
export function distinct<T>(source: ReadonlyArray<T>): T[] {
  const asSet = new Set<T>(source)
  return Array.from(asSet)
}

/**
 * Returns an array that contains no duplicate entries according to the equality comparisons on
 * the keys returned by the given key-generating function. If an element occurs multiple times in
 * the sequence then the later occurrences are discarded.
 * @param source The input collection.
 * @param selector A function that transforms the array items into comparable keys.
 * @example
 * distinctBy([
 *   { name: 'amy', id: 1 },
 *   { name: 'bob', id: 2 },
 *   { name: 'bob', id: 3 },
 *   { name: 'cat', id: 3 }
 *  ],
 *  x => x.name
 * ) // [{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }, { name: 'cat', id: 3 }]
 */
export function distinctBy<T, Key>(
  source: ReadonlyArray<T>,
  selector: (item: T, index: number) => Key
): T[] {
  const seen = new Map<Key, T>()
  let index = 0
  for (const item of source) {
    const key = selector(item, index)
    if (!seen.has(key)) {
      seen.set(key, item)
    }
    index++
  }
  return Array.from(seen.values())
}

/**
 * Tests if any element of the array satisfies the given predicate.
 * @param source The input collection.
 * @param predicate A function to test each item of the input collection.
 * @example
 * exists([1, 2], x => x === 1) // true
 */
export function exists<T>(
  source: ReadonlyArray<T>,
  predicate: (item: T, index: number) => boolean
): boolean {
  return source.some(predicate)
}

/**
 * Tests if every element of the array satisfies the given predicate.
 * @param source The input collection.
 * @param predicate A function to test against each item of the input collection.
 * @example
 * every([1, 2], x => x === 1) // false
 */
export function every<T>(
  source: ReadonlyArray<T>,
  predicate: (item: T, index: number) => boolean
): boolean {
  return source.every(predicate)
}

/**
 * Returns the first element for which the given function returns true or throws if not found.
 * If you don't want exceptions, use `find` instead.
 * @param source The input collection.
 * @param predicate A function to test whether an item in the collection should be returned.
 * @throws If no item is found matching the criteria of the predicate.
 * @example
 * get([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }], x => x.name === 'bob') // { name: 'bob', id: 2 }
 */
export function get<T>(
  source: ReadonlyArray<T>,
  predicate: (item: T, index: number) => boolean
): T {
  let index = 0
  for (const item of source) {
    if (predicate(item, index)) {
      return item
    }
    index++
  }
  throw new Error('Element not found matching criteria')
}

/**
 * Returns the first element for which the given function returns true, otherwise undefined.
 * @param source The input collection.
 * @param predicate A function to test whether an item in the collection should be returned.
 * @example
 * find([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }], x => x.name === 'bob') // { name: 'bob', id: 2 }
 */
export function find<T>(
  source: ReadonlyArray<T>,
  predicate: (item: T, index: number) => boolean
): T | undefined {
  let index = 0
  for (const item of source) {
    if (predicate(item, index)) {
      return item
    }
    index++
  }
  return undefined
}

/**
 * Applies a key-generating function to each element of an array and yields an array of unique
 * keys and an array of all elements that have each key.
 * @param source The input collection.
 * @param selector A function that transforms an element of the collection into a comparable key.
 * @example
 * groupBy(
 *  [{ name: 'amy', age: 1 }, { name: 'bob', age: 2 }, { name: 'cat', age: 2 }],
 *  x => x.age
 * ) // [[1, [{ name: 'amy', age: 1 }]], [2, [{ name: 'bob', age: 2 }, { name: 'cat', age: 2 }]]]
 */
export function groupBy<T, Key>(
  source: ReadonlyArray<T>,
  selector: (item: T, index: number) => Key
): [Key, T[]][] {
  const groups = new Map<Key, T[]>()
  let index = 0
  for (const item of source) {
    const key = selector(item, index)
    const group = groups.get(key)
    if (group === undefined) {
      groups.set(key, [item])
    } else {
      group.push(item)
    }
    index++
  }
  return Array.from(groups.entries())
}

export interface InitRange {
  from: number
  to: number
  increment?: number
}

export interface InitCount {
  start?: number
  count: number
  increment?: number
}

/**
 * Generates a new array containing the specified number sequence.
 * @param options The sequence of numbers to generate.
 * @throws When the options would result in an iterable that would not complete. If this is the
 * desired behaviour, use initInfinite.
 * @example
 * init(3) // [0, 1, 2]
 * init(3, x => x * x) // [0, 1, 4]
 * init({ from: 1, to: 3 }) // [1, 2, 3]
 * init({ from: 1, to: 2, increment: 0.5 }) // [1, 1.5, 2]
 * init({ from: 1, to: -1 }) // [1, 0, -1]
 * init({ start: 3, count: 3 }) // [3, 4, 5]
 * init({ count: 3, increment: 2 }) // [0, 2, 4]
 * init({ start: 3, count: 5, increment: 2 }) // [3, 5, 7, 9, 11]
 */
export function init(options: InitRange | InitCount): number[]
/**
 * Generates a new array containing the specified number sequence.
 * @param count The number of sequential numbers to generate.
 * @throws When the options would result in an iterable that would not complete. If this is the
 * desired behaviour, use initInfinite.
 * @example
 * init(3) // [0, 1, 2]
 * init(3, x => x * x) // [0, 1, 4]
 * init({ from: 1, to: 3 }) // [1, 2, 3]
 * init({ from: 1, to: 2, increment: 0.5 }) // [1, 1.5, 2]
 * init({ from: 1, to: -1 }) // [1, 0, -1]
 * init({ start: 3, count: 3 }) // [3, 4, 5]
 * init({ count: 3, increment: 2 }) // [0, 2, 4]
 * init({ start: 3, count: 5, increment: 2 }) // [3, 5, 7, 9, 11]
 */
// tslint:disable-next-line:unified-signatures
export function init(count: number): number[]
/**
 * Generates a new array containing elements generated by the initializer funciton.
 * @param options The sequence of numbers to generate.
 * @param initializer A function that generates an item in the array from a given number.
 * @throws When the options would result in an array of infinite size.
 * @example
 * init(3) // [0, 1, 2]
 * init(3, x => x * x) // [0, 1, 4]
 * init({ from: 1, to: 3 }) // [1, 2, 3]
 * init({ from: 1, to: 2, increment: 0.5 }) // [1, 1.5, 2]
 * init({ from: 1, to: -1 }) // [1, 0, -1]
 * init({ start: 3, count: 3 }) // [3, 4, 5]
 * init({ count: 3, increment: 2 }) // [0, 2, 4]
 * init({ start: 3, count: 5, increment: 2 }) // [3, 5, 7, 9, 11]
 */
export function init<T>(options: InitRange | InitCount, initializer: (index: number) => T): T[]
/**
 * Generates a new array containing elements generated by the initializer funciton.
 * @param count The number of sequential numbers to generate.
 * @param initializer A function that generates an item in the array from a given number.
 * @throws When the options would result in an array of infinite size.
 * @example
 * init(3) // [0, 1, 2]
 * init(3, x => x * x) // [0, 1, 4]
 * init({ from: 1, to: 3 }) // [1, 2, 3]
 * init({ from: 1, to: 2, increment: 0.5 }) // [1, 1.5, 2]
 * init({ from: 1, to: -1 }) // [1, 0, -1]
 * init({ start: 3, count: 3 }) // [3, 4, 5]
 * init({ count: 3, increment: 2 }) // [0, 2, 4]
 * init({ start: 3, count: 5, increment: 2 }) // [3, 5, 7, 9, 11]
 */
export function init<T>(
  // tslint:disable-next-line:unified-signatures
  count: number,
  initializer: (index: number) => T
): T[]
export function init<T>(
  options: number | InitRange | InitCount,
  initializer?: (index: number) => T
): any[] {
  function normaliseOptions() {
    if (typeof options === 'number') {
      return {
        start: 0,
        count: options,
        increment: 1,
      }
    }
    if ('from' in options) {
      const sign = options.to < options.from ? -1 : 1
      if (
        options.increment !== undefined &&
        (options.increment === 0 || options.increment / sign < 0)
      ) {
        throw new Error('Requested array is of infinite size.')
      }
      const increment = options.increment ? options.increment : sign
      return {
        start: options.from,
        count: Math.floor((options.to - options.from) / increment + 1),
        increment: increment,
      }
    }
    const start = options.start === undefined ? 0 : options.start
    return {
      start,
      count: options.count,
      increment: options.increment === undefined ? 1 : options.increment,
    }
  }
  const { start, count, increment } = normaliseOptions()
  const map = initializer === undefined ? (x: number) => x : initializer
  const target = []
  let current = start
  for (let index = 0; index < count; index++) {
    target.push(map(current))
    current += increment
  }
  return target
}

/**
 * Returns the number of items in the array.
 * @param source The input collection.
 * @example
 * length([1, 2, 3, 4, 5] // 5
 */
export function length<T>(source: ReadonlyArray<T>): number {
  return source.length
}

/**
 * Returns the number of items in the array.
 * @param source The input collection.
 * @example
 * count([1, 2, 3, 4, 5] // 5
 */
export function count<T>(source: ReadonlyArray<T>): number {
  return source.length
}

/**
 * Returns a new array ordered by the selected key.
 * If no selector is specified, the elements will be compared directly.
 * @param source The input collection.
 * @param selector An optional function to transform items of the input sequence into comparable keys.
 * @example
 * sort([21, 2, 18]) // [2, 18, 21]
 *
 * // with selector
 * sort(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // [{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }]
 */
export function sort<T, Key>(source: ReadonlyArray<T>, selector?: (item: T) => Key): T[] {
  const theSelector = selector === undefined ? (x: T) => x : selector
  const copy = Array.from(source)
  copy.sort((a: T, b: T) => {
    return theSelector(a) > theSelector(b) ? 1 : -1
  })
  return copy
}

/**
 * Yields an iterable ordered by the selected key descending.
 * If no selector is specified, the elements will be compared directly.
 * @param source The input collection.
 * @param selector An optional function to transform items of the input sequence into comparable keys.
 * @example
 * sortDescending([21, 2, 18]) // [21, 18, 2]
 *
 * // with selector
 * sortDescending(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // [{ name: 'amy', age: 21 }, { name: 'cat', age: 18 }, { name: 'bob', age: 2 }]
 */
export function sortDescending<T, Key>(source: ReadonlyArray<T>, selector?: (item: T) => Key): T[] {
  const theSelector = selector === undefined ? (x: T) => x : selector
  const copy = Array.from(source)
  copy.sort((a: T, b: T) => {
    return theSelector(a) < theSelector(b) ? 1 : -1
  })
  return copy
}

/**
 * Applies a key-generating function to each element of the array and returns a new array ordered by the keys.
 * @param source The input collection.
 * @param selector A function to transform items of the input sequence into comparable keys.
 * @example
 * sortBy(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // [{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }]
 */
export function sortBy<T, Key>(source: ReadonlyArray<T>, selector: (item: T) => Key): T[] {
  const copy = Array.from(source)
  copy.sort((a: T, b: T) => {
    return selector(a) > selector(b) ? 1 : -1
  })
  return copy
}

/**
 * Applies a key-generating function to each element of the array and returns a new array ordered by the keys, descending.
 * @param source The input collection.
 * @param selector A function to transform items of the input sequence into comparable keys.
 * @example
 * // with selector
 * sortByDescending(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // [{ name: 'amy', age: 21 }, { name: 'cat', age: 18 }, { name: 'bob', age: 2 }]
 */
export function sortByDescending<T, Key>(
  source: ReadonlyArray<T>,
  selector: (item: T) => Key
): T[] {
  const copy = Array.from(source)
  copy.sort((a: T, b: T) => {
    return selector(a) > selector(b) ? -1 : 1
  })
  return copy
}

/**
 * Returns a new array with the order of elements reversed.
 * @param source The input collection.
 * @example
 * reverse([8, 3, 5]) // [5, 3, 8]
 */
export function reverse<T>(source: ReadonlyArray<T>): T[] {
  return Array.from(source).reverse()
}

/**
 * Returns an array of each element in the input collection and its predecessor,
 * with the exception of the first element which is only returned as the predecessor of the second element.
 * @param source The input collection
 * @example
 * pairwise([1, 2, 3]) // [[1, 2], [2, 3]]
 */
export function pairwise<T>(source: ReadonlyArray<T>): [T, T][] {
  const pairs: [T, T][] = []
  for (let index = 1; index < source.length; index++) {
    pairs.push([source[index - 1], source[index]])
  }
  return pairs
}

/**
 * Returns the sum of the values in the collection.
 * @param source The input collection.
 * @example
 * sum([21, 2, 18]) // 41
 */
export function sum(source: ReadonlyArray<number>): number {
  let sum = 0
  for (const item of source) {
    sum += item
  }
  return sum
}

/**
 * Returns the sum of the values returned by the selector for each element in the array.
 * @param source The input collection.
 * @param selector A function to transform each element into a summable value.
 * @example
 * sumBy(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // 41
 */
export function sumBy<T>(source: ReadonlyArray<T>, selector: (item: T) => number): number {
  let sum = 0
  for (const item of source) {
    sum += selector(item)
  }
  return sum
}

/**
 * Returns the maximum of the values in the collection.
 * @param source The input collection.
 * @throws If the collection is empty.
 * @example
 * max([21, 2, 18]) // 21
 */
export function max(source: ReadonlyArray<number>): number {
  let max: number | null = null
  for (const item of source) {
    if (max === null || item > max) {
      max = item
    }
  }
  if (max === null) {
    throw new Error(`Can't find max of an empty collection`)
  }
  return max
}

/**
 * Returns the maximum of the values returned by the selector for each element in the array.
 * @param source The input collection.
 * @param selector A function to transform each element into a comparable value.
 * @throws If the collection is empty.
 * @example
 * maxBy(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // 21
 */
export function maxBy<T>(source: ReadonlyArray<T>, selector: (item: T) => number): number {
  let max: number | null = null
  for (const item of source) {
    const value = selector(item)
    if (max === null || value > max) {
      max = value
    }
  }
  if (max === null) {
    throw new Error(`Can't find max of an empty array`)
  }
  return max
}

/**
 * Returns the minimum of the values in the collection.
 * @param source The input collection.
 * @throws If the collection is empty.
 * @example
 * min([21, 2, 18]) // 2
 */
export function min(source: ReadonlyArray<number>): number {
  let min: number | null = null
  for (const item of source) {
    if (min === null || item < min) {
      min = item
    }
  }
  if (min === null) {
    throw new Error(`Can't find min of an empty collection`)
  }
  return min
}

/**
 * Returns the minimum of the values returned by the selector for each element in the array.
 * @param source The input collection.
 * @param selector A function to transform each element into a comparable value.
 * @throws If the collection is empty.
 * @example
 * minBy(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // 2
 */
export function minBy<T>(source: ReadonlyArray<T>, selector: (item: T) => number): number {
  let min: number | null = null
  for (const item of source) {
    const value = selector(item)
    if (min === null || value < min) {
      min = value
    }
  }
  if (min === null) {
    throw new Error(`Can't find min of an empty array`)
  }
  return min
}

/**
 * Returns the mean (average) of the values in the collection.
 * @param source The input collection.
 * @throws If the collection is empty.
 * @example
 * mean([21, 2, 18, 39]) // 20
 */
export function mean(source: ReadonlyArray<number>): number {
  let sum = 0
  let count = 0
  for (const item of source) {
    sum += item
    count++
  }
  if (count === 0) {
    throw new Error(`Can't find mean of an empty collection`)
  }
  return sum / count
}

/**
 * Returns the mean (average) of the values returned by the selector for each element in the array.
 * @param source The input collection.
 * @param selector A function to transform each element into a summable value.
 * @throws If the collection is empty.
 * @example
 * meanBy(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 3 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // 14
 */
export function meanBy<T>(source: ReadonlyArray<T>, selector: (item: T) => number): number {
  let sum = 0
  let count = 0
  for (const item of source) {
    sum += selector(item)
    count++
  }
  if (count === 0) {
    throw new Error(`Can't find mean of an empty array`)
  }
  return sum / count
}

export class ChainableArray<T> implements Iterable<T> {
  private source: T[]

  constructor(source: T[]) {
    this.source = source
  }

  [Symbol.iterator](): Iterator<T, any, undefined> {
    return this.source[Symbol.iterator]()
  }

  /**
   * Creates a new array whose elements are the results of applying the specified mapping to each of the elements of the source collection.
   * @param mapping A function to transform items from the input collection.
   * @example
   * chain([1, 2]).map(x => x * 2).toArray() // [2, 4]
   */
  map<U>(mapping: (item: T, index: number) => U): ChainableArray<U> {
    return new ChainableArray(map(this.source, mapping))
  }

  /**
   * Returns a new array containing only the elements of the collection for which the given predicate returns true.
   * @param predicate A function to test whether each item in the input collection should be included in the output.
   * @example
   * chain([1, 2, 3, 4]).filter(x => x % 2 === 0).toArray() // [2, 4]
   */
  filter(predicate: (item: T, index: number) => boolean): ChainableArray<T> {
    return new ChainableArray(filter(this.source, predicate))
  }

  /**
   * Applies the given function to each element of the array and returns a new array comprised of the results for each element where the function returns a value.
   * @param chooser A function to transform items from the input collection to a new value to be included, or undefined to be excluded.
   * @example
   * chain([1, 2, 3])
   *   .choose(x => (x % 2 === 1 ? x * 2 : undefined)
   *   .toArray() // [2, 6]
   */
  choose<U>(chooser: (item: T, index: number) => U | undefined): ChainableArray<U> {
    return new ChainableArray(choose(this.source, chooser))
  }

  /**
   * Applies the given function to each element of the source array and concatenates all the results.
   * @param mapping A function to transform elements of the input collection into collections that are concatenated.
   * @example
   * chain([1, 2]).collect(x => [x, x]).toArray() // [1, 1, 2, 2]
   */
  collect<U>(mapping: (item: T, index: number) => Iterable<U>): ChainableArray<U> {
    return new ChainableArray(collect(this.source, mapping))
  }

  /**
   * Wraps the two given arrays as a single concatenated array.
   * @param second The second array.
   * @example
   * chain([1]).append([2]).toArray() // [1, 2]
   */
  append(second: ReadonlyArray<T>): ChainableArray<T> {
    return new ChainableArray(append(this.source, second))
  }

  /**
   * Returns an array that contains no duplicate entries according to the equality comparisons on
   * the elements. If an element occurs multiple times in the sequence then the later occurrences are
   * discarded.
   * @example
   * chain(['amy', 'bob', 'bob', 'cat']).distinct().toArray() // ['amy', 'bob', 'cat']
   */
  distinct(): ChainableArray<T> {
    return new ChainableArray(distinct(this.source))
  }

  /**
   * Returns an array that contains no duplicate entries according to the equality comparisons on
   * the keys returned by the given key-generating function. If an element occurs multiple times in
   * the sequence then the later occurrences are discarded.
   * @param selector A function that transforms the array items into comparable keys.
   * @example
   * chain([
   *   { name: 'amy', id: 1 },
   *   { name: 'bob', id: 2 },
   *   { name: 'bob', id: 3 },
   *   { name: 'cat', id: 3 }
   *  ])
   *   .distinctBy(x => x.name)
   *   .toArray() // [{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }, { name: 'cat', id: 3 }]
   */
  distinctBy<Key>(selector: (item: T, index: number) => Key): ChainableArray<T> {
    return new ChainableArray(distinctBy(this.source, selector))
  }

  /**
   * Tests if any element of the array satisfies the given predicate.
   * @param predicate A function to test each item of the input collection.
   * @example
   * chain([1, 2]).exists(x => x === 1).toArray() // true
   */
  exists(predicate: (item: T, index: number) => boolean): boolean {
    return exists(this.source, predicate)
  }

  /**
   * Tests if every element of the array satisfies the given predicate.
   * @param predicate A function to test against each item of the input collection.
   * @example
   * chain([1, 2]).every(x => x >= 1).toArray() // true
   */
  every(predicate: (item: T, index: number) => boolean): boolean {
    return every(this.source, predicate)
  }

  /**
   * Returns the first element for which the given function returns true or throws if not found.
   * If you don't want exceptions, use `find` instead.
   * @param predicate A function to test whether an item in the collection should be returned.
   * @throws If no item is found matching the criteria of the predicate.
   * @example
   * chain([
   *   { name: 'amy', id: 1 },
   *   { name: 'bob', id: 2 }
   * ])
   *   .get(x => x.name === 'bob')
   *   .toArray() // { name: 'bob', id: 2 }
   */
  get(predicate: (item: T, index: number) => boolean): T {
    return get(this.source, predicate)
  }

  /**
   * Returns the first element for which the given function returns true, otherwise undefined.
   * @param predicate A function to test whether an item in the collection should be returned.
   * @example
   * chain([
   *   { name: 'amy', id: 1 },
   *   { name: 'bob', id: 2 }
   * ])
   *   .find(x => x.name === 'bob')
   *   .toArray() // { name: 'bob', id: 2 }
   */
  find(predicate: (item: T, index: number) => boolean): T | undefined {
    return find(this.source, predicate)
  }

  /**
   * Applies a key-generating function to each element of an array and yields an array of unique
   * keys and an array of all elements that have each key.
   * @param selector A function that transforms an element of the collection into a comparable key.
   * @example
   * chain([{ name: 'amy', age: 1 }, { name: 'bob', age: 2 }, { name: 'cat', age: 2 }])
   *   .groupBy(x => x.age)
   *   .toArray() // [[1, [{ name: 'amy', age: 1 }]], [2, [{ name: 'bob', age: 2 }, { name: 'cat', age: 2 }]]]
   */
  groupBy<Key>(selector: (item: T, index: number) => Key): ChainableArray<[Key, T[]]> {
    return new ChainableArray(groupBy(this.source, selector))
  }

  /**
   * Returns the number of items in the array.
   * @example
   * chain([1, 2, 3, 4, 5]).length() // 5
   */
  length(): number {
    return this.source.length
  }

  /**
   * Returns the number of items in the array.
   * @example
   * chain([1, 2, 3, 4, 5]).count() // 5
   */
  count(): number {
    return this.source.length
  }

  /**
   * Returns a new array ordered by the selected key.
   * If no selector is specified, the elements will be compared directly.
   * @param selector An optional function to transform items of the input sequence into comparable keys.
   * @example
   * chain([{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }])
   *   .sort(x => x.age)
   *   .toArray() // [{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }]
   */
  sort<Key>(selector?: (item: T) => Key): ChainableArray<T> {
    return new ChainableArray(sort(this.source, selector))
  }

  /**
   * Yields an iterable ordered by the selected key descending.
   * If no selector is specified, the elements will be compared directly.
   * @param selector An optional function to transform items of the input sequence into comparable keys.
   * @example
   * chain([{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }])
   *   .sortDescending(x => x.age)
   *   .toArray() // [{ name: 'amy', age: 21 }, { name: 'cat', age: 18 }, { name: 'bob', age: 2 }]
   */
  sortDescending<Key>(selector?: (item: T) => Key): ChainableArray<T> {
    return new ChainableArray(sortDescending(this.source, selector))
  }

  /**
   * Applies a key-generating function to each element of the array and returns a new array ordered by the keys.
   * @param selector A function to transform items of the input sequence into comparable keys.
   * @example
   * chain([{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }])
   *   .sortBy(x => x.age)
   *   .toArray() // [{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }]
   */
  sortBy<Key>(selector: (item: T) => Key): ChainableArray<T> {
    return new ChainableArray(sortBy(this.source, selector))
  }

  /**
   * Applies a key-generating function to each element of the array and returns a new array ordered by the keys, descending.
   * @param selector A function to transform items of the input sequence into comparable keys.
   * @example
   * chain([{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }])
   *   .sortByDescending(x => x.age)
   *   .toArray() // [{ name: 'amy', age: 21 }, { name: 'cat', age: 18 }, { name: 'bob', age: 2 }]
   */
  sortByDescending<Key>(selector: (item: T) => Key): ChainableArray<T> {
    return new ChainableArray(sortByDescending(this.source, selector))
  }

  /**
   * Returns a new array with the order of elements reversed.
   * @example
   * chain([8, 3, 5]).reverse().toArray() // [5, 3, 8]
   */
  reverse(): ChainableArray<T> {
    return new ChainableArray(reverse(this.source))
  }

  /**
   * Returns an array of each element in the input collection and its predecessor,
   * with the exception of the first element which is only returned as the predecessor of the second element.
   * @example
   * chain([1, 2, 3]).pairwise().toArray() // [[1, 2], [2, 3]]
   */
  pairwise(): ChainableArray<[T, T]> {
    return new ChainableArray(pairwise(this.source))
  }

  /**
   * Returns the sum of the values returned by the selector for each element in the array.
   * @param selector A function to transform each element into a summable value.
   * @example
   * chain([{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }])
   *   .sumBy(x => x.age)
   *   .toArray() // 41
   */
  sumBy(selector: (item: T) => number): number {
    return sumBy(this.source, selector)
  }

  /**
   * Returns the maximum of the values returned by the selector for each element in the array.
   * @param selector A function to transform each element into a comparable value.
   * @throws If the collection is empty.
   * @example
   * chain([{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }])
   *   .maxBy(x => x.age)
   *   .toArray() // 21
   */
  maxBy(selector: (item: T) => number): number {
    return maxBy(this.source, selector)
  }

  /**
   * Returns the minimum of the values returned by the selector for each element in the array.
   * @param selector A function to transform each element into a comparable value.
   * @throws If the collection is empty.
   * @example
   * chain([{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }])
   *   .minBy(x => x.age)
   *   .toArray() // 2
   */
  minBy(selector: (item: T) => number): number {
    return minBy(this.source, selector)
  }

  /**
   * Returns the mean (average) of the values returned by the selector for each element in the array.
   * @param selector A function to transform each element into a summable value.
   * @throws If the collection is empty.
   * @example
   * chain([{ name: 'amy', age: 21 }, { name: 'bob', age: 3 }, { name: 'cat', age: 18 }])
   *   .meanBy(x => x.age)
   *   .toArray() // 14
   */
  meanBy(selector: (item: T) => number): number {
    return meanBy(this.source, selector)
  }

  /**
   * Returns a native array of the current value.
   */
  toArray(): T[] {
    return this.source
  }
}

/**
 * Creates a new chainable sequence of operations on an array.
 * This can be helpful when doing a number of sequential operations on an array.
 * The final result can be accessed by calling `.toArray()`.
 * @param source Initial array of values to act on
 */
export function chain<T>(source: T[]): ChainableArray<T> {
  return new ChainableArray(source)
}

/**
 * Generates a new chainable array containing the specified number sequence.
 * @param options The sequence of numbers to generate.
 * @throws When the options would result in an array of infinite length.
 * @example
 * init(3) // [0, 1, 2]
 * init(3, x => x * x) // [0, 1, 4]
 * init({ from: 1, to: 3 }) // [1, 2, 3]
 * init({ from: 1, to: 2, increment: 0.5 }) // [1, 1.5, 2]
 * init({ from: 1, to: -1 }) // [1, 0, -1]
 * init({ start: 3, count: 3 }) // [3, 4, 5]
 * init({ count: 3, increment: 2 }) // [0, 2, 4]
 * init({ start: 3, count: 5, increment: 2 }) // [3, 5, 7, 9, 11]
 */
export function initChain(options: InitRange | InitCount): ChainableArray<number>
/**
 * Generates a new chainable array containing the specified number sequence.
 * @param count The number of sequential numbers to generate.
 * @throws When the options would result in an array of infinite length.
 * @example
 * init(3) // [0, 1, 2]
 * init(3, x => x * x) // [0, 1, 4]
 * init({ from: 1, to: 3 }) // [1, 2, 3]
 * init({ from: 1, to: 2, increment: 0.5 }) // [1, 1.5, 2]
 * init({ from: 1, to: -1 }) // [1, 0, -1]
 * init({ start: 3, count: 3 }) // [3, 4, 5]
 * init({ count: 3, increment: 2 }) // [0, 2, 4]
 * init({ start: 3, count: 5, increment: 2 }) // [3, 5, 7, 9, 11]
 */
// tslint:disable-next-line:unified-signatures
export function initChain(count: number): ChainableArray<number>
/**
 * Generates a new chainable array containing the specified number sequence.
 * @param options The sequence of numbers to generate.
 * @param initializer A function that generates an item in the array from a given number.
 * @throws When the options would result in an array of infinite length.
 * @example
 * init(3) // [0, 1, 2]
 * init(3, x => x * x) // [0, 1, 4]
 * init({ from: 1, to: 3 }) // [1, 2, 3]
 * init({ from: 1, to: 2, increment: 0.5 }) // [1, 1.5, 2]
 * init({ from: 1, to: -1 }) // [1, 0, -1]
 * init({ start: 3, count: 3 }) // [3, 4, 5]
 * init({ count: 3, increment: 2 }) // [0, 2, 4]
 * init({ start: 3, count: 5, increment: 2 }) // [3, 5, 7, 9, 11]
 */
export function initChain<T>(
  options: InitRange | InitCount,
  initializer: (index: number) => T
): ChainableArray<T>
/**
 * Generates a new chainable array containing the specified number sequence.
 * @param count The number of sequential numbers to generate.
 * @param initializer A function that generates an item in the array from a given number.
 * @throws When the options would result in an array of infinite length.
 * @example
 * init(3) // [0, 1, 2]
 * init(3, x => x * x) // [0, 1, 4]
 * init({ from: 1, to: 3 }) // [1, 2, 3]
 * init({ from: 1, to: 2, increment: 0.5 }) // [1, 1.5, 2]
 * init({ from: 1, to: -1 }) // [1, 0, -1]
 * init({ start: 3, count: 3 }) // [3, 4, 5]
 * init({ count: 3, increment: 2 }) // [0, 2, 4]
 * init({ start: 3, count: 5, increment: 2 }) // [3, 5, 7, 9, 11]
 */
export function initChain<T>(count: any, initializer?: any): ChainableArray<T> {
  return new ChainableArray(init(count, initializer))
}
