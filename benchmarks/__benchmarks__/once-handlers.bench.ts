import { bench, describe } from 'vitest'
import { emitters, TEST_PAYLOAD } from './__fixtures__/setup'

describe('Once Handlers', () => {
  bench('@lokiverse/emitter - once registration and trigger', () => {
    emitters.lokiverse.once('start', () => {})
    emitters.lokiverse.emit('start', TEST_PAYLOAD)
  })

  bench('NodeJS EventEmitter - once registration and trigger', () => {
    emitters.nodejs.once('start', () => {})
    emitters.nodejs.emit('start', TEST_PAYLOAD)
  })

  bench('EventEmitter3 - once registration and trigger', () => {
    emitters.eventemitter3.once('start', () => {})
    emitters.eventemitter3.emit('start', TEST_PAYLOAD)
  })

  // Note: mitt doesn't have built-in 'once' functionality
})
