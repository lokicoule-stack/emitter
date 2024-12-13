import { bench, describe } from 'vitest'
import { createPayload, emitters } from './__fixtures__/setup'

describe('Payload Size Impact', () => {
  const largePayload = createPayload(10000) // 10KB
  const smallPayload = createPayload(100) // 100B

  describe('Large Payload', () => {
    bench('@lokiverse/emitter - large payload', () => {
      emitters.lokiverse.$on('data', () => {})
      emitters.lokiverse.$emit('data', largePayload)
    })

    bench('NodeJS EventEmitter - large payload', () => {
      emitters.nodejs.on('data', () => {})
      emitters.nodejs.emit('data', largePayload)
    })

    bench('EventEmitter3 - large payload', () => {
      emitters.eventemitter3.on('data', () => {})
      emitters.eventemitter3.emit('data', largePayload)
    })

    bench('mitt - large payload', () => {
      emitters.mitt.on('data', () => {})
      emitters.mitt.emit('data', largePayload)
    })
  })

  describe('Small Payload', () => {
    bench('@lokiverse/emitter - small payload', () => {
      emitters.lokiverse.$on('data', () => {})
      emitters.lokiverse.$emit('data', smallPayload)
    })

    bench('NodeJS EventEmitter - small payload', () => {
      emitters.nodejs.on('data', () => {})
      emitters.nodejs.emit('data', smallPayload)
    })

    bench('EventEmitter3 - small payload', () => {
      emitters.eventemitter3.on('data', () => {})
      emitters.eventemitter3.emit('data', smallPayload)
    })

    bench('mitt - small payload', () => {
      emitters.mitt.on('data', () => {})
      emitters.mitt.emit('data', smallPayload)
    })
  })
})
