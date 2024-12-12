import EventEmitter3 from 'eventemitter3'
import EventEmitter from 'events'
import mitt from 'mitt'
import { bench, describe } from 'vitest'
import { createEmitter } from '../../../src/index.js'

const TEST_PAYLOAD = { port: 3000 }
const ITERATIONS = 10000
const HANDLERS_COUNT = 10

const createPayload = (size: number) => ({
  data: 'x'.repeat(size),
  timestamp: Date.now(),
})

describe('Event Emitter Benchmarks', () => {
  describe('Single Handler Operations', () => {
    bench('@lokiverse/emitter - registration', () => {
      const emitter = createEmitter()
      emitter.on('start', () => {})
    })

    bench('NodeJS EventEmitter - registration', () => {
      const emitter = new EventEmitter()
      emitter.on('start', () => {})
    })

    bench('EventEmitter3 - registration', () => {
      const emitter = new EventEmitter3()
      emitter.on('start', () => {})
    })

    bench('mitt - registration', () => {
      const emitter = mitt()
      emitter.on('start', () => {})
    })
  })

  describe('Multiple Handlers (10 handlers)', () => {
    bench('@lokiverse/emitter - multiple registration', () => {
      const emitter = createEmitter()
      for (let i = 0; i < HANDLERS_COUNT; i++) {
        emitter.on('start', () => {})
      }
    })

    bench('NodeJS EventEmitter - multiple registration', () => {
      const emitter = new EventEmitter()
      for (let i = 0; i < HANDLERS_COUNT; i++) {
        emitter.on('start', () => {})
      }
    })

    bench('EventEmitter3 - multiple registration', () => {
      const emitter = new EventEmitter3()
      for (let i = 0; i < HANDLERS_COUNT; i++) {
        emitter.on('start', () => {})
      }
    })

    bench('mitt - multiple registration', () => {
      const emitter = mitt()
      for (let i = 0; i < HANDLERS_COUNT; i++) {
        emitter.on('start', () => {})
      }
    })
  })

  describe('Emission Performance', () => {
    bench('@lokiverse/emitter - single handler emission', () => {
      const emitter = createEmitter()
      emitter.on('start', () => {})
      emitter.emit('start', TEST_PAYLOAD)
    })

    bench('NodeJS EventEmitter - single handler emission', () => {
      const emitter = new EventEmitter()
      emitter.on('start', () => {})
      emitter.emit('start', TEST_PAYLOAD)
    })

    bench('EventEmitter3 - single handler emission', () => {
      const emitter = new EventEmitter3()
      emitter.on('start', () => {})
      emitter.emit('start', TEST_PAYLOAD)
    })

    bench('mitt - single handler emission', () => {
      const emitter = mitt()
      emitter.on('start', () => {})
      emitter.emit('start', TEST_PAYLOAD)
    })
  })

  describe('Payload Size Impact', () => {
    const largePayload = createPayload(10000) // 10KB

    bench('@lokiverse/emitter - large payload', () => {
      const emitter = createEmitter()
      emitter.on('data', () => {})
      emitter.emit('data', largePayload)
    })

    bench('NodeJS EventEmitter - large payload', () => {
      const emitter = new EventEmitter()
      emitter.on('data', () => {})
      emitter.emit('data', largePayload)
    })

    bench('EventEmitter3 - large payload', () => {
      const emitter = new EventEmitter3()
      emitter.on('data', () => {})
      emitter.emit('data', largePayload)
    })

    bench('mitt - large payload', () => {
      const emitter = mitt()
      emitter.on('data', () => {})
      emitter.emit('data', largePayload)
    })
  })

  describe('Memory Management', () => {
    bench('@lokiverse/emitter - add/remove cycle', () => {
      const emitter = createEmitter()
      for (let i = 0; i < ITERATIONS; i++) {
        const handler = () => {}
        emitter.on('start', handler)
        emitter.off('start', handler)
      }
    })

    bench('NodeJS EventEmitter - add/remove cycle', () => {
      const emitter = new EventEmitter()
      for (let i = 0; i < ITERATIONS; i++) {
        const handler = () => {}
        emitter.on('start', handler)
        emitter.removeListener('start', handler)
      }
    })

    bench('EventEmitter3 - add/remove cycle', () => {
      const emitter = new EventEmitter3()
      for (let i = 0; i < ITERATIONS; i++) {
        const handler = () => {}
        emitter.on('start', handler)
        emitter.removeListener('start', handler)
      }
    })

    bench('mitt - add/remove cycle', () => {
      const emitter = mitt()
      for (let i = 0; i < ITERATIONS; i++) {
        const handler = () => {}
        emitter.on('start', handler)
        emitter.off('start', handler)
      }
    })
  })

  describe('Once Handlers', () => {
    bench('@lokiverse/emitter - once registration and trigger', () => {
      const emitter = createEmitter()
      emitter.once('start', () => {})
      emitter.emit('start', TEST_PAYLOAD)
    })

    bench('NodeJS EventEmitter - once registration and trigger', () => {
      const emitter = new EventEmitter()
      emitter.once('start', () => {})
      emitter.emit('start', TEST_PAYLOAD)
    })

    bench('EventEmitter3 - once registration and trigger', () => {
      const emitter = new EventEmitter3()
      emitter.once('start', () => {})
      emitter.emit('start', TEST_PAYLOAD)
    })

    // Note: mitt doesn't have built-in 'once' functionality
  })
})
