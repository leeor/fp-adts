'use strict'
/* eslint-disable */
const daggy = require('daggy')


const Maybe = daggy.taggedSum('Maybe', { Nothing: [], Just: ['a'] })


const Either = daggy.taggedSum('Either', { Left: ['a'], Right: ['b'] })


// Type Class: Functor


Maybe.prototype.map = function(f) {
  return this.cata({
    Nothing: () => this,
    Just: x => Maybe.Just(f(x))
  })
}


Either.prototype.map = function(f) {
  return this.cata({
    Left: () => this,
    Right: x => Either.Right(f(x))
  })
}


// Applicative


Maybe.prototype.ap = function(x) {
  return this.cata({
    Nothing: () => this,
    Just: f => x.map(f)
  })
}


Maybe.prototype.of = function(x) {
  return Maybe.Just(x)
}


Either.prototype.ap = function(x) {
  return this.cata({
    Left: () => this,
    Right: f => x.map(f)
  })
}


Either.prototype.of = function(x) {
  return Either.Right(x)
}


Maybe.Just(x => x ** 2).ap(Either.Right(3))


Either.Right(x => x ** 2).ap(Maybe.Just(3))


Either.Left(x => x ** 2).ap(Maybe.Just(3))


Either.Right(x => x ** 2).ap(Maybe.Nothing)


// Power lifting
const pow = x => y => y ** x
const liftA = f => x => x.map(f)
liftA(pow(2))(Maybe.Just(5))


const add = x => y => x + y
const liftA2 = f => x => y => x.map(f).ap(y)
liftA2(add)(Maybe.Just(3))(Either.Right(5))

Maybe.Just(3).map(val1 => {
  return Either.Right(5).map(val2 => {
    return add(val1)(val2)
  })
})
