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
const fromNullable = x => (x ? Right(x) : Wrong(null))

const tryCatch = f => {
  try {
    return Right(f())
  } catch (error) {
    return Wrong(error)
  }
}

const getPort = () =>
  tryCatch(() => fs.readFileSync("config.json"))
    .map(string => JSON.parse(string))
    .map(config => config.port)
    .fold(
      () => 3000,
      x => x,
    )

const street = user =>
  fromNullable(user.address).fold(
    () => "no street",
    address => address.street,
  )

const streetName = user =>
  fromNullable(user.address)
    .map(address => address.street)
    .chain(street => fromNullable(street.name))
    .fold(
      () => "no street",
      x => x,
    )

const parseDbUrl = c =>
  tryCatch(() => JSON.parse(c)).fold(
    () => null,
    c => c.url.match(""),
  )

const startApp = cng =>
  tryCatch(() => fs.readFileSync(cng))
    .chain(parsed => fromNullable(parsed))
    .map(cng => JSON.parse(cng))
    .fold(
      () => "cannot get config",
      ([_, user, password, db]) => ` ${user} ${password} ${db}`,
    )
