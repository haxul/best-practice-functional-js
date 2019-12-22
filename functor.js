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

const getHalfOfLargeNumber = xs =>
  Box(xs)
    .map(xs => Math.max(...xs))
    .map(x => x / 2)
    .fold(x => x)

const r2 = getHalfOfLargeNumber([100, 1, 2, 3, 4, 5])

const percentToFloat = x =>
  typeof x === "string"
    ? Box(x)
        .map(x => x.replace(/\%/), "")
        .map(x => parseFloat(x))
        .fold(x => x * 0.01)
    : null

const result2 = percentToFloat("20%")

const parseMoney = x =>
  Box(x)
    .map(x => parseFloat(x))
    .fold(x => x)

const applyDiscount = (price, discount) =>
  Box(parseMoney(price)).fold(() =>
    Box(percentToFloat(discount))
      .map(_ => price + discount)
      .fold(x => x),
  )

console.log(applyDiscount(10, "20%"))
