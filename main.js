const { curry } = require("ramda")
const add = (a, y) => a + y
const devide = (x, y) => x / y
//curry function
const toPair = f => (x, y) => f(x, y)
const result = toPair(add)(1, 2)

//flip
const flip = f => (x, y) => f(y, x)
const result2 = flip(devide)(2, 1)

//curry
// const curry = f => a => b => f(a, b)
const result3 = curry(add)(2)(2)

const modulo = curry((x, y) => y % x)
const isOdd = modulo(2)
const result4 = isOdd(6)

const filter = curry((f, xs) => xs.filter(f))
const more3 = a => a > 3
const getMore3 = filter(more3)
const result5 = getMore3([1, 2, 3, 4, 5, 6, 7, 8])

const replace = curry((regex, replacement, str) =>
  str.replace(regex, replacement),
)
const replaceVowels = replace(/[hl]/gi, "!")
const result6 = replaceVowels("hello world")
console.log(result6)
