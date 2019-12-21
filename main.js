const add = (a, y) => a + y
const devide = (x, y) => x / y
//curry function
const toPair = f => (x,y) => f(x,y)
const result = toPair(add)(1,2)

//flip
const flip = f => (x,y) => f(y,x)
const result2 = flip(devide)(2,1)


  