'use strict'
/* eslint-disable */
const daggy = require('daggy')


const Maybe = daggy.taggedSum('Maybe', { Nothing: [], Just: ['a'] })


const Either = daggy.taggedSum('Either', { Left: ['a'], Right: ['b'] })


const lefty = Either.Left([1, 2, 3])
lefty.cata({
  Left: x => x,
  Right: () => {}
})


const righto = Either.Right([1, 2, 3])
righto.cata({
  Left: x => x,
  Right: y => y.includes(1)
})


// Type Class: Functor


Maybe.prototype.map = function(f) {
  return this.cata({
    Nothing: () => this,
    Just: x => Maybe.Just(f(x))
  })
}


Maybe.Just(4).map(x => x ** 2).toString()
Maybe.Nothing.map(x => x ** 2).toString()


Either.prototype.map = function(f) {
  return this.cata({
    Left: () => this,
    Right: x => Either.Right(f(x))
  })
}


const mappedLeft = lefty.map(x => x.slice(1))
mappedLeft.toString()


const mappedRight = righto.map(x => x.slice(1))
mappedRight.toString()
