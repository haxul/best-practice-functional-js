const fs = require("fs")
const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
})

const Wrong = x => ({
  chain: f => Wrong(x),
  map: f => Wrong(x),
  fold: (f, g) => f(x),
  toString: x,
})

const findColor = name => {
  const found = {
    red: "#rrrrr",
    green: "#gggg",
    white: "#wwwwww",
  }[name]
  return found ? Right(found) : Wrong("missing")
}

const result = findColor("red")
  .map(x => x.toUpperCase())
  .fold(
    () => "wrong",
    x => x,
  )
