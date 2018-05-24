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


// The mighty Monad


Maybe.prototype.chain = function(f) {
  return this.cata({
    Nothing: () => this,
    Just: x => f(x)
  })
}


// prop :: (String | Integer) -> (Object | Array) -> Maybe a
const prop = p => obj => obj && obj[p] ? Maybe.Just(obj[p]) : Maybe.Nothing


Maybe.Just({ foo: 'bar' }).map(prop('foo')).toString()
Maybe.Just({ foo: 'bar' }).chain(prop('foo')).toString()
Maybe.Just({ foo: 'bar' }).chain(prop('oof'))
Maybe.Just([1, 2, 3]).chain(prop(0)).toString()
