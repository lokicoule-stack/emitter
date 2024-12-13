// benchmark/single-handler-operations.bench.js
import { bench, describe } from 'vitest'
import { emitters } from './__fixtures__/setup'

describe('Single Handler Operations', () => {
  bench('@lokiverse/emitter - registration', () => {
    emitters.lokiverse.$on('start', () => {})
  })

  bench('NodeJS EventEmitter - registration', () => {
    emitters.nodejs.on('start', () => {})
  })

  bench('EventEmitter3 - registration', () => {
    emitters.eventemitter3.on('start', () => {})
  })

  bench('mitt - registration', () => {
    emitters.mitt.on('start', () => {})
  })
})
