const { compose, flip, head, curry } = require("ramda")
const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: `Box(${x})`,
})

const nextCharForNumberString = str =>
  Box(str)
    .map(str => str.trim())
    .map(trimmed => parseInt(trimmed))
    .map(number => Number(number + 1))
    .fold(String.fromCharCode)
const result = nextCharForNumberString("65")

const Functor = x => ({
  map: f => Functor(f(x)),
  fold: f => f(x),
})

const getFirsWord = str =>
  Functor(str)
    .map(str => str.split(" "))
    .map(xs => xs.map(x => x.toUpperCase()))
    .fold(xs => xs.join(" "))
const r = getFirsWord("hello world")

console.log(r)