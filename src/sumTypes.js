'use strict'
/* eslint-disable */
const daggy = require('daggy')


const Maybe = daggy.taggedSum('Maybe', { Nothing: [], Just: ['a'] })


const nada = Maybe.Nothing
nada.cata({
  Nothing: () => 'Move on',
  Just: x => 'Inconceivable'
})


const something = Maybe.Just(2)
something.cata({
  Nothing: () => {},
  Just: x => x ** 2
})


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
