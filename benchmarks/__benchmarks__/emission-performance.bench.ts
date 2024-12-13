// benchmark/emission-performance.bench.js
import { bench, describe } from 'vitest'
import { emitters, HANDLERS_COUNT, TEST_PAYLOAD } from './__fixtures__/setup'

describe('Emission Performance', () => {
  describe('Single Handler Emission', () => {
    bench('@lokiverse/emitter - single handler emission', () => {
      emitters.lokiverse.$on('start', () => {})
      emitters.lokiverse.$emit('start', TEST_PAYLOAD)
    })

    bench('NodeJS EventEmitter - single handler emission', () => {
      emitters.nodejs.on('start', () => {})
      emitters.nodejs.emit('start', TEST_PAYLOAD)
    })

    bench('EventEmitter3 - single handler emission', () => {
      emitters.eventemitter3.on('start', () => {})
      emitters.eventemitter3.emit('start', TEST_PAYLOAD)
    })

    bench('mitt - single handler emission', () => {
      emitters.mitt.on('start', () => {})
      emitters.mitt.emit('start', TEST_PAYLOAD)
    })
  })

  describe('Multiple Handlers (100 handlers)', () => {
    bench('@lokiverse/emitter - multiple handlers emission', () => {
      for (let i = 0; i < HANDLERS_COUNT; i++) {
        emitters.lokiverse.$on('start', () => {})
      }
      emitters.lokiverse.$emit('start', TEST_PAYLOAD)
    })

    bench('NodeJS EventEmitter - multiple handlers emission', () => {
      for (let i = 0; i < HANDLERS_COUNT; i++) {
        emitters.nodejs.on('start', () => {})
      }
      emitters.nodejs.emit('start', TEST_PAYLOAD)
    })

    bench('EventEmitter3 - multiple handlers emission', () => {
      for (let i = 0; i < HANDLERS_COUNT; i++) {
        emitters.eventemitter3.on('start', () => {})
      }
      emitters.eventemitter3.emit('start', TEST_PAYLOAD)
    })

    bench('mitt - multiple handlers emission', () => {
      for (let i = 0; i < HANDLERS_COUNT; i++) {
        emitters.mitt.on('start', () => {})
      }
      emitters.mitt.emit('start', TEST_PAYLOAD)
    })
  })
})
