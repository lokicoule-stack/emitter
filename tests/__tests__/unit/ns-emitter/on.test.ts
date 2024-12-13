import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('NSEmitter.on()', () => {
  it('should register and call namespaced event handler', () => {
    const emitter = createTestEmitter('cache')
    const handler = vi.fn()

    emitter.$on('hit', handler)
    emitter.$emit('hit', mockPayloads.cacheHit)

    expect(handler).toHaveBeenCalledWith(mockPayloads.cacheHit)
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should handle wildcard listeners within namespace', () => {
    const emitter = createTestEmitter('cache')
    const handler = vi.fn()

    emitter.$on('*', handler)
    emitter.$emit('hit', mockPayloads.cacheHit)
    emitter.$emit('miss', mockPayloads.cacheMiss)

    expect(handler).toHaveBeenCalledTimes(2)
    expect(handler).toHaveBeenCalledWith('cache:hit', mockPayloads.cacheHit)
    expect(handler).toHaveBeenCalledWith('cache:miss', mockPayloads.cacheMiss)
  })

  it('should return unsubscribe function', () => {
    const emitter = createTestEmitter('build')
    const handler = vi.fn()

    const unsubscribe = emitter.$on('success', handler)
    unsubscribe()
    emitter.$emit('success', mockPayloads.buildSuccess)

    expect(handler).not.toHaveBeenCalled()
  })
})
