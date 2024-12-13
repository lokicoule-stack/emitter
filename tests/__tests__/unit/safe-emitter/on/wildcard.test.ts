import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from '../__fixtures__/setup'

describe('SafeEmitter.on() - Wildcard Events', () => {
  it('should handle wildcard listeners', () => {
    const emitter = createTestEmitter()
    const handler = vi.fn()

    emitter.$on('*', handler)
    emitter.$emit('build', mockPayloads.build)
    emitter.$emit('cache:hit', mockPayloads.cacheHit)

    expect(handler).toHaveBeenCalledTimes(2)
    expect(handler).toHaveBeenNthCalledWith(1, 'build', mockPayloads.build)
    expect(handler).toHaveBeenNthCalledWith(2, 'cache:hit', mockPayloads.cacheHit)
  })

  it('should handle wildcard listeners within namespace', () => {
    const emitter = createTestEmitter().$ns('cache')
    const handler = vi.fn()

    emitter.$on('*', handler)
    emitter.$emit('hit', mockPayloads.cacheHit)
    emitter.$emit('miss', mockPayloads.cacheMiss)

    expect(handler).toHaveBeenNthCalledWith(1, 'cache:hit', mockPayloads.cacheHit)
    expect(handler).toHaveBeenNthCalledWith(2, 'cache:miss', mockPayloads.cacheMiss)
  })

  it('should not mismatch wildcard listeners with namespaced events', () => {
    const emitter = createTestEmitter()
    const cacheEmitter = emitter.$ns('cache')
    const handler = vi.fn()

    cacheEmitter.$on('*', handler)
    emitter.$emit('build:fail', mockPayloads.buildFail)
    emitter.$emit('run:fail', mockPayloads.runFail)
    cacheEmitter.$emit('hit', mockPayloads.cacheHit)

    expect(handler).toHaveBeenNthCalledWith(1, 'cache:hit', mockPayloads.cacheHit)
  })
})
