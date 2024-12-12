import { bench, describe } from 'vitest'
import { emitters, ITERATIONS, TEST_PAYLOAD } from './__fixtures__/setup'

describe('Stress Testing', () => {
  bench('@lokiverse/emitter - high frequency emissions', () => {
    emitters.lokiverse.on('start', () => {})
    for (let i = 0; i < ITERATIONS * 10; i++) {
      emitters.lokiverse.emit('start', TEST_PAYLOAD)
    }
  })

  bench('NodeJS EventEmitter - high frequency emissions', () => {
    emitters.nodejs.on('start', () => {})
    for (let i = 0; i < ITERATIONS * 10; i++) {
      emitters.nodejs.emit('start', TEST_PAYLOAD)
    }
  })

  bench('EventEmitter3 - high frequency emissions', () => {
    emitters.eventemitter3.on('start', () => {})
    for (let i = 0; i < ITERATIONS * 10; i++) {
      emitters.eventemitter3.emit('start', TEST_PAYLOAD)
    }
  })

  bench('mitt - high frequency emissions', () => {
    emitters.mitt.on('start', () => {})
    for (let i = 0; i < ITERATIONS * 10; i++) {
      emitters.mitt.emit('start', TEST_PAYLOAD)
    }
  })
})
