const { compose, flip, head, curry } = require("ramda")
const toUpper = str => str.toUpperCase()
const exclaim = str => str + "!"
const first = xs => xs[0]
const concat = curry((x, y) => x + y)
// const compose = (f, g) => x => f(g(x))
const log = curry((tag, x) => (console.log(tag, x), x))
const shout = compose(toUpper, concat("!!"), first, log("here"))
const result = shout("tears")
console.log(result)
