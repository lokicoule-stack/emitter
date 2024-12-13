// benchmark/multiple-handlers.bench.js
import { bench, describe } from 'vitest'
import { emitters, HANDLERS_COUNT } from './__fixtures__/setup'

describe('Multiple Handlers (100 handlers)', () => {
  bench('@lokiverse/emitter - multiple registration', () => {
    for (let i = 0; i < HANDLERS_COUNT; i++) {
      emitters.lokiverse.$on('start', () => {})
    }
  })

  bench('NodeJS EventEmitter - multiple registration', () => {
    for (let i = 0; i < HANDLERS_COUNT; i++) {
      emitters.nodejs.on('start', () => {})
    }
  })

  bench('EventEmitter3 - multiple registration', () => {
    for (let i = 0; i < HANDLERS_COUNT; i++) {
      emitters.eventemitter3.on('start', () => {})
    }
  })

  bench('mitt - multiple registration', () => {
    for (let i = 0; i < HANDLERS_COUNT; i++) {
      emitters.mitt.on('start', () => {})
    }
  })
})
