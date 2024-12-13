import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from '../__fixtures__/setup'

describe('SafeEmitter.on() - Namespaced Events', () => {
  it('should register and call flat namespaced event handler', () => {
    const emitter = createTestEmitter()
    const handler = vi.fn()

    emitter.$on('cache:hit', handler)
    emitter.$emit('cache:hit', mockPayloads.cacheHit)

    expect(handler).toHaveBeenNthCalledWith(1, mockPayloads.cacheHit)
  })

  it('should register and call namespaced event handler', () => {
    const emitter = createTestEmitter()
    const handler = vi.fn()

    const cacheEmitter = emitter.$ns('cache')
    cacheEmitter.$on('hit', handler)
    cacheEmitter.$emit('hit', mockPayloads.cacheHit)

    expect(handler).toHaveBeenNthCalledWith(1, mockPayloads.cacheHit)
  })
})
