import { bench, describe } from 'vitest'
import { emitters, ITERATIONS, TEST_PAYLOAD } from './__fixtures__/setup'

describe('Concurrency Handling', () => {
  bench('@lokiverse/emitter - concurrent emissions', () => {
    emitters.lokiverse.$on('start', () => {})
    for (let i = 0; i < ITERATIONS; i++) {
      setTimeout(() => emitters.lokiverse.$emit('start', TEST_PAYLOAD), 0)
    }
  })

  bench('NodeJS EventEmitter - concurrent emissions', () => {
    emitters.nodejs.on('start', () => {})
    for (let i = 0; i < ITERATIONS; i++) {
      setTimeout(() => emitters.nodejs.emit('start', TEST_PAYLOAD), 0)
    }
  })

  bench('EventEmitter3 - concurrent emissions', () => {
    emitters.eventemitter3.on('start', () => {})
    for (let i = 0; i < ITERATIONS; i++) {
      setTimeout(() => emitters.eventemitter3.emit('start', TEST_PAYLOAD), 0)
    }
  })

  bench('mitt - concurrent emissions', () => {
    emitters.mitt.on('start', () => {})
    for (let i = 0; i < ITERATIONS; i++) {
      setTimeout(() => emitters.mitt.emit('start', TEST_PAYLOAD), 0)
    }
  })
})
