import { bench, describe } from 'vitest'
import { emitters, ITERATIONS } from './__fixtures__/setup'

describe('Memory Management', () => {
  bench('@lokiverse/emitter - add/remove cycle', () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const handler = () => {}
      emitters.lokiverse.on('start', handler)
      emitters.lokiverse.off('start', handler)
    }
  })

  bench('NodeJS EventEmitter - add/remove cycle', () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const handler = () => {}
      emitters.nodejs.on('start', handler)
      emitters.nodejs.removeListener('start', handler)
    }
  })

  bench('EventEmitter3 - add/remove cycle', () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const handler = () => {}
      emitters.eventemitter3.on('start', handler)
      emitters.eventemitter3.removeListener('start', handler)
    }
  })

  bench('mitt - add/remove cycle', () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const handler = () => {}
      emitters.mitt.on('start', handler)
      emitters.mitt.off('start', handler)
    }
  })
})
